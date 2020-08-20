"use strict";
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mcache = require('memory-cache');
const compression = require('compression');
require("dotenv").config();

const pingRoutes = require("./routes/pingRoutes");
const postsRoutes = require("./routes/postsRoutes");

// Set up Express
const app = express();

// HTTP request logger
app.use(morgan("tiny"));

// Body parser
app.use(bodyParser.json());

// Compression
app.use(compression());

// Caching
var cache = (duration) => {
    return (req, res, next) => {
      let key = '__express__' + req.originalUrl || req.url
      let cachedBody = mcache.get(key)
      if (cachedBody) {
        res.send(cachedBody)
        return
      } else {
        res.sendResponse = res.send
        res.send = (body) => {
          mcache.put(key, body, duration * 1000);
          res.sendResponse(body)
        }
        next()
      }
    }
  }

const PORT = process.env.PORT || 3000;

// API Routes - Will cache the post routes for 1 minute
app.use("/api", pingRoutes);
app.use("/api", cache(60), postsRoutes);

let server = app.listen(PORT, function () {
  console.log(`Server is starting at ${PORT}`);
});

module.exports = server;
