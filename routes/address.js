const express = require("express");
const {
  getAllAddress,
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress
} = require("../controllers/address");
const router = express.Router();

router.route("/")
.get(getAllAddress)
.post(createAddress);

router.route("/:id")
.put(updateAddress)
.delete(deleteAddress)
.get(getAddress);

module.exports = router;
