const os = require("os");
const express = require("express");
const errorHandler = require("./middleware/error");
require("dotenv").config({ path: "config.env" });
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
 * Address Mount
 */
app.use("/api/v1/address", address);

/**
 * Error Handler
 */
app.use(errorHandler);

/**
 * Main App Module
 */
module.exports = app;
