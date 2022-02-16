const Address = require("../models/Address");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const COUNTRY_LOOKUP = require("../utils/countries");
const AVAILABLE_STATUS = require("../utils/constants");

/**
 * @description     Get all Address
 * @route           GET /api/v1/address
 * @Request         GET
 * @Access          Public
 */
exports.getAllAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.find();
  res.status(200).json({
    count: address.length,
    success: true,
    data: address
  });
});

/**
 * @description     Create all Address
 * @route           POST /api/v1/address
 * @Request         POST
 * @Access          Public - payload
 */
exports.createAddress = asyncHandler(async (req, res, next) => {
  const createNewAddress = {
    country: req.body.country,
    city: req.body.city,
    street: req.body.street,
    postalcode: req.body.postalcode,
    number: req.body.number,
    numberAddition: req.body.numberAddition
  };

  /*validate country code */
  if (!req.body.country) {
    return next(new ErrorResponse("Country code cannot be null", 400));
  }

  /* validate street */
  if (!req.body.street) {
    return next(new ErrorResponse("Street cannot be null", 400));
  }
  if (!req.body.street) {
    return next(new ErrorResponse("Street cannot be null", 400));
  }
  if (!COUNTRY_LOOKUP.has(req.body.country.toLowerCase())) {
    return next(new ErrorResponse("Address code is invalid", 400));
  }

  const address = await Address.create(createNewAddress);
  res.status(201).json({
    success: true,
    data: address
  });
});

/**
 * @description     Get single Address
 * @route           GET /api/v1/address/:id
 * @Request         GET
 * @Access          Public
 */
exports.getAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.findById(req.params.id);
  if (!address) {
    return next(
      new ErrorResponse(`Address not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: address
  });
});

/**
 * @description     Update single Address
 * @route           PATCH /api/v1/address/:id
 * @Request         PATCH
 * @Access          Public
 */
exports.updateAddress = asyncHandler(async (req, res, next) => {
  let data = {
    status: req.body.status,
    name: req.body.name,
    email: req.body.email
  };

  const address = await Address.findById(req.params.id);
  if (!address) {
    return next(
      new ErrorResponse(`Address not found with id of ${req.params.id}`, 404)
    );
  }

  if (
    address.status &&
    address.status.toUpperCase() !== AVAILABLE_STATUS.NOT_AT_HOME
  ) {
    return next(new ErrorResponse(`Status cannot be set`, 404));
  }

  const temp = await Address.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: temp
  });
});

/**
 * @description     DELETE single Address
 * @route           DELETE /api/v1/address/:id
 * @Request         Delete
 * @Access          Public
 */
exports.deleteAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.findByIdAndDelete(req.params.id);
  if (!address) {
    return next(
      new ErrorResponse(`Address not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: {}
  });
});
