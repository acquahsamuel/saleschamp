const ErrorResponse = require("../middleware/error");
const asyncHandler = require("../middleware/async");
const COUNTRY_LOOKUP = require("./countries");
const AVAILABLE_STATUS = require("./constants");

/**
 * @description     Get all Address
 * @route           GET /api/v1/address
 * @Request         GET
 * @Access          Public
 */
exports.getAll = Model =>
  asyncHandler(async (req, res, next) => {
    const docs = await Model.find();
    res.status(200).json({
      count: docs.length,
      success: true,
      data: docs
    });
  });

/**
 * @description     Create all Address
 * @route           POST /api/v1/address
 * @Request         POST
 * @Access          Public - payload
 */
exports.create = Model =>
  asyncHandler(async (req, res, next) => {
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

    if (!COUNTRY_LOOKUP.has(req.body.country.toLowerCase())) {
      return next(new ErrorResponse("Address code is invalid", 400));
    }

    const docs = await Model.create(createNewAddress);
    res.status(201).json({
      success: true,
      data: docs
    });
  });

/**
 * @description     Get single Address
 * @route           GET /api/v1/address/:id
 * @Request         GET
 * @Access          Public
 */
exports.getOne = Model =>
  asyncHandler(async (req, res, next) => {
    const docs = await Model.findById(req.params.id);
    if (!docs) {
      return next(
        new ErrorResponse(`Address not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      data: docs
    });
  });

/**
 * @description     Update single Address
 * @route           PATCH /api/v1/address/:id
 * @Request         PATCH
 * @Access          Public
 */
exports.updateOne = Model =>
  asyncHandler(async (req, res, next) => {
    let data = {
      status: req.body.status,
      name: req.body.name,
      email: req.body.email
    };

    const address = await Model.findById(req.params.id);
    if (!address) {
      return next(
        new ErrorResponse(`Document not found with id of ${req.params.id}`, 404)
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
exports.deleteOne = Model =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(
        new ErrorResponse(`No document found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  });
