const express = require('express');
const addressController = require('../controllers/addressController');
const AddressRouter = express.Router();

/**
 * @description    Routes
 * @access         Public
 */

AddressRouter.route('/')
  .get(addressController.getAllAddress)
  .post(addressController.createAddress);

/**
 * @descriptoin    Routes
 * @access         Public
 * @requires      {"/:id"}
 */
AddressRouter.route('/:id')
  .get(addressController.getAddress)
  .patch(addressController.updateAddress)
  .delete(addressController.deleteAddress);

module.exports = AddressRouter;
