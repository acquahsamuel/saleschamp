const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./utils/customErrors');
require('dotenv').config('.env');

//Connection db
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.post(bodyParser.raw({ type: 'application/json' }));

//Mongoose endpoint logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Check for content type
app.use('/api/', function (req, res, next) {
  var contype = req.headers['content-type'];
  if (!contype || contype.indexOf('application/json') !== 0)
    return res.send(415);
  next();
});

// Routing
const address = require('./routes/addressRoutes');

//Mount content
app.use('/api/v1/address', address);

// Error Handler
app.use(errorHandler);

//Main App Module
module.exports = app;
