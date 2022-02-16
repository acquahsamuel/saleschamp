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
 **Access - Public
 */

router.route("/")
.get(getAllAddress)
.post(createAddress);


/**
 * *Access - Public
 * *Requires {id params}
 */
router.route("/:id")
.patch(updateAddress)
.delete(deleteAddress)
.get(getAddress);

module.exports = router;
