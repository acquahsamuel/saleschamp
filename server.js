const os = require("os");
const hpp = require("hpp");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/error");
const mongoSanitize = require("express-mongo-sanitize");
const keys = require("./config/keys");

// Mongodb connection
mongoose.connect(keys.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

const app = express();

// Body parser
app.use(express.json());

// Route files in
const address = require("./routes/address");

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (keys.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Mount routers
app.use("/api/v1/address", address);

app.use(errorHandler);

/**
 * @description server config
 */
console.log(os.platform());
console.log(os.version());
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`.yellow.underline);
});

// Handle unhandled Rejection
process.on("unhandledRejection", err => {
  console.log("UNHANDLED REJECTION Shutting down");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
