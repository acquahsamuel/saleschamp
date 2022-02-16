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

const app = express();

// Route files in
const address = require("./routes/address");

// Body parser
app.use(express.json());

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

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
});

const PORT = keys.PORT || 5000;

mongoose
  .connect(keys.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to DB");
    app.listen(
      PORT,
      console.log(`Server running on port ${PORT}`.yellow.underline)
    );
  })
  .catch(err => {
    console.log("Error", err);
  });
