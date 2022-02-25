const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./utils/customErrors');
require('dotenv').config('.env');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.post(bodyParser.raw({ type: 'application/json' }));

/**
 * Logger
 */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/**
 * Check for correct connect type
 */
app.use('/api/', (req, res, next) => {
  const contype = req.headers['content-type'];
  if (!contype || contype.indexOf('application/json') !== 0)
    return res.sendStatus(415);
  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, X_BPI_CONTEXT',
  );
  res.header('Content-Type', 'application/json');
  next();
});

// Routing
const address = require('./routes/addressRoutes');

// Mount content
app.use('/api/v1/address', address);

// Error Handler
app.use(errorHandler);

// Main App Module
module.exports = app;
