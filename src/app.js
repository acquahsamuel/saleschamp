const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./utils/customErrors');
require('dotenv').config('.env');

/**
 * Connection db
 */
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.post(bodyParser.raw({ type: 'application/json' }));

/**
 * Mongoose endpoint logger
 */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/**
 * Routing
 */
const address = require('./routes/addressRoutes');

/**
 * Mount
 */
app.use('/api/v1/address', address);
app.use('/', (req, res) => {
  response.json({
    message: `Hello -SalesChamp`,
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
