require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");

var indexRouter = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.json({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});

module.exports = app;
