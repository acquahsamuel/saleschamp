const ErrorResponse = require("./errorResponse");
const asyncHandler = require("../middleware/async");
const COUNTRY_LOOKUP = require("./countries");
const AVAILABLE_STATUS = require("./constants");

/**

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
 * @Request         POST
 * @Access          Public - payload
 */
exports.create = Model =>
  asyncHandler(async (req, res, next) => {
    const createNew = {
      country: req.body.country,
      city: req.body.city,
      street: req.body.street,
      postalcode: req.body.postalcode,
      number: req.body.number,
      numberAddition: req.body.numberAddition
    };

    /**
     * Validate country
     */
    if (!req.body.country) {
      return next(new ErrorResponse("Country code cannot be null", 400));
    }

    /**
     * Validate street
     */
    if (!req.body.street) {
      return next(new ErrorResponse("Street cannot be null", 400));
    }

    if (!COUNTRY_LOOKUP.has(req.body.country.toLowerCase())) {
      return next(new ErrorResponse("Address code is invalid", 400));
    }

    /**
     * Set Header in country
     */
    const country = COUNTRY_LOOKUP.get(req.body.country.toLowerCase());
    res.setHeader("Country", country);
    const docs = await Model.create(createNew);
    res.status(201).json({
      success: true,
      data: docs
    });
  });

/**
 * @Request         GET
 * @Access          Public
 */
exports.getOne = Model =>
  asyncHandler(async (req, res, next) => {
    const docs = await Model.findById(req.params.id);
    if (!docs) {
      return next(
        new ErrorResponse(`Document not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      data: docs
    });
  });

/**
 * @Request         PATCH
 * @Access          Public
 */
exports.updateOne = Model =>
  asyncHandler(async (req, res, next) => {
    /**
     * Body data
     */
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
      data.status.toUpperCase().trim().toString() !==
        AVAILABLE_STATUS.INTERESTED.toString() &&
      data.status.toUpperCase().trim().toString() !==
        AVAILABLE_STATUS.NOT_INTERESTED.toString() &&
      data.status.toUpperCase().trim().toString() !==
        AVAILABLE_STATUS.NOT_AT_HOME.toString()
    ) {
      return next(
        new ErrorResponse(
          `Status is not valid. should be one of ${AVAILABLE_STATUS.NOT_AT_HOME}, 
          ${AVAILABLE_STATUS.INTERESTED}, ${AVAILABLE_STATUS.NOT_INTERESTED} `,
          404
        )
      );
    }

    if (
      address.status &&
      address.status.toUpperCase() !== AVAILABLE_STATUS.NOT_AT_HOME
    ) {
      return next(new ErrorResponse(`Status cannot be set`, 404));
    }

    const docs = await Model.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: docs
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
