var express = require("express");
var router = express.Router();
var http = require("../utils/http");

router.get("/", function(_, res) {
  http
    .get("/listings/latest", {
      params: {
        start: 1,
        limit: 20,
      },
    })
    .then(response => {
      res.json(response.data.data);
    })
    .catch(error => {
      res.json({
        error: {
          status: 500,
          message: error.message || "Something went wrong.",
        },
      });
    });
});

module.exports = router;
