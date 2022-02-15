// const User = require('../models/User');
const Address = require("../models/Address");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc      Get all categories
// @route     GET /api/v1/categories
// @access    Private/Admin
exports.getAllAddress = asyncHandler(async (req, res, next) => {
  // res.status(200).json(res.advancedResults);
  const address = await Address.find();
  res.status(200).json({
    success: true,
    data: address
  });
});

// @desc      Create category
// @route     GET /api/v1/address
// @access    Public
exports.createAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.create(req.body);

  res.status(201).json({
    success: true,
    data: address
  });
});

// @desc      Get single user
// @route     GET /api/v1/address
// @access    Public
exports.getAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.findById(req.params.id);

  if (!address) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: address
  });
});

// @desc      Update user
// @route     PATCH /api/v1/address/:id
// @access   Public
exports.updateAddress = asyncHandler(async (req, res, next) => {
  let data = {
    status: req.body.status,
    name: req.body.name,
    email: req.body.email
  };

  const address = await Address.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  });

  if (!address) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: address
  });
});

// @desc      Delete user
// @route     DELETE  /api/v1/address/:id
// @access    Public
exports.deleteAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.findByIdAndDelete(req.params.id);

  if (!address) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
