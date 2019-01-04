import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

if ("serviceWorker" in navigator) {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              console.log(
                "New content is available and will be used when all " +
                "tabs for this page are closed. See http://bit.ly/CRA-PWA."
              );
            } else {
              console.log("Content is cached for offline use.");
            }
          }
        };
      };
    })
    .catch(error => {
      console.error("Error during service worker registration:", error);
    });
}

ReactDOM.render(<App />, document.getElementById("root"));
