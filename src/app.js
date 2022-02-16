const os = require("os");
const express = require("express");
const errorHandler = require("./middleware/error");
require("dotenv").config();

/**
 * Connection db
 */
const app = express();
app.use(express.json());

/**
 * Routing
 */
const address = require("./routes/address");

/**
 * Mount
 */
app.use("/api/v1/address", address);
app.use("/", (request, response) => {
  response.json({
    message: `SalesChamp deployed - https://saleschampnlapi.herokuapp.com/api/v1/address`
  });
});

/**
 * Error Handler
 */
app.use(errorHandler);

/**
 * Main App Module
 */
module.exports = app;
