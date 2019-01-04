const DB_NAME = "crypto";
const CURRENCIES_STORE = "currencies";

if (typeof idb === "undefined") {
  self.importScripts("js/idb.js");
}

function cacheStaticAssets() {
  return fetch("/asset-manifest.json")
    .then(response => response.json())
    .then(manifest => {
      return caches.open("crypto-dash-static").then(cache => {
        let files = [
          "/",
          "js/idb.js",
          "manifest.json",
          "favicon.png",
          "favicon.ico"
        ];

        Object.keys(manifest)
          .filter(key => {
            return key !== "service-worker.js";
          })
          .forEach(key => {
            files.push(manifest[key]);
          });

        cache.addAll(files);
      });
    });
}

function createDb() {
  return idb.open(DB_NAME, 1, upgradeDb => {
    switch (upgradeDb.oldVersion) {
      case 0:
        upgradeDb.createObjectStore(CURRENCIES_STORE, {
          keyPath: "id",
        });
        break;

      default:
        break;
    }
  });
}

function saveToDb(data) {
  return idb.open(DB_NAME).then(db => {
    const tx = db.transaction(CURRENCIES_STORE, "readwrite");
    tx.objectStore(CURRENCIES_STORE).clear();
    tx.complete.then(() => {
      let txx = db.transaction(CURRENCIES_STORE, "readwrite");
      data.forEach(currency => {
        txx.objectStore(CURRENCIES_STORE).put(currency);
      });

      return txx.complete;
    });
  });
}

function downloadCurrencyData() {
  return createDb().then(db => {
    fetch("/api")
      .then(response => response.json())
      .then(saveToDb);
  });
}

function getLocalCurrencyData() {
  return idb.open(DB_NAME).then(db => {
    const tx = db.transaction(CURRENCIES_STORE, "readonly");
    const store = tx.objectStore(CURRENCIES_STORE);

    return store.getAll().then(data => {
      return tx.complete.then(() => data);
    });
  });
}

self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(Promise.all([cacheStaticAssets(), downloadCurrencyData()]));
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  if (url.pathname === "/api") {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          console.log("received response from server");

          if (!response.ok) {
            console.log("--bad response-- returning cached data");
            return getLocalCurrencyData().then(data => {
              return new Response(JSON.stringify(data));
            });
          } else {
            return response.json().then(data => {
              return saveToDb(data).then(() => {
                return new Response(JSON.stringify(data));
              });
            });
          }
        })
        .catch(error => {
          console.log("--bad network-- returning cached data");

          // network unavailable, we'll fallback to local data
          return getLocalCurrencyData().then(data => {
            return new Response(JSON.stringify(data));
          });
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
