const os = require("os");
const app = require("./app");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

/**
 * Connection mongoose db
 */
connectDB();

/**
 * Mongoose endpoint logger
 */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/**
 *  Connect to port
 */
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`.yellow.underline);
});

/**
 * Error Handler
 */
process.on("unhandledRejection", err => {
  console.log(os.platform() + "" + os.version());
  console.log(err.message);
  server.close(() => {
    process.exit(1);
  });
});
