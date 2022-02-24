require('colors');
const app = require('./app');
const connectDB = require('./config/db');

/**
 * Connection mongoose db
 */
connectDB();

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
process.on('unhandledRejection', (err) => {
  console.log(err.message);
  server.close(() => {
    process.exit(1);
  });
});
