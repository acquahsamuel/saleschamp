const express = require("express");
const {
  getAllAddress,
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress
} = require("../controllers/address");
const router = express.Router();

/**
 * @description    Routes
 * @access         Public
 */

router.route("/").get(getAllAddress).post(createAddress);

/**
 * @descriptoin    Routes 
 * @access         Public
 * @requires      {"/:id"}    
 */

router.route("/:id").patch(updateAddress).delete(deleteAddress).get(getAddress);

module.exports = router;
