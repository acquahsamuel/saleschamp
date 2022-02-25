const asyncHandler = require('express-async-handler');
const ErrorResponse = require('./errorResponse');
const COUNTRY_LOOKUP = require('./countries');
const AVAILABLE_STATUS = require('./constants');

/**
 * @description     DELETE single Address
 * @route           DELETE /api/v1/address/:id
 * @Request         Delete
 * @Access          Public
 */
exports.getAll = (Model) =>
  asyncHandler(async (req, res) => {
    const docs = await Model.find();
    res.status(200).json({
      count: docs.length,
      success: true,
      data: docs,
    });
  });

/**
 * @description     DELETE single Address
 * @route           DELETE /api/v1/address/:id
 * @Request         Delete
 * @Access          Public
 */
exports.create = (Model) =>
  asyncHandler(async (req, res, next) => {
    const data = {
      country: req.body.country,
      city: req.body.city,
      street: req.body.street,
      postalcode: req.body.postalcode,
      number: req.body.number,
      numberAddition: req.body.numberAddition,
    };

    if (!data.country) {
      return next(new ErrorResponse('Country code cannot be null', 422));
    }

    if (!data.street) {
      return next(new ErrorResponse('Street cannot be null', 422));
    }

    if (!COUNTRY_LOOKUP.has(req.body.country.toLowerCase())) {
      return next(new ErrorResponse('Address code is invalid', 422));
    }

    const country = COUNTRY_LOOKUP.get(req.body.country.toLowerCase());
    res.setHeader('Country', country);
    const docs = await Model.create(data);
    res.status(201).json([
      {
        success: true,
        data: docs,
      },
    ]);
  });

/**
 * @description     DELETE single Address
 * @route           DELETE /api/v1/address/:id
 * @Request         Delete
 * @Access          Public
 */
exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const docs = await Model.findById(req.params.id);
    if (!docs) {
      return next(
        new ErrorResponse(
          `Document not found with id of ${req.params.id}`,
          404,
        ),
      );
    }
    res.status(200).json([
      {
        success: true,
        data: docs,
      },
    ]);
  });

/**
 * @description     DELETE single Address
 * @route           DELETE /api/v1/address/:id
 * @Request         Delete
 * @Access          Public
 */
exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const data = {
      status: req.body.status,
      name: req.body.name,
      email: req.body.email,
    };

    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(
        new ErrorResponse(
          `Document not found with id of ${req.params.id}`,
          404,
        ),
      );
    }

    if(!data.status){
      return next(
        new ErrorResponse(
          `Status cannot be empty`,
          404,
        ),
      );
    }

    if (
      data.status.toUpperCase().trim().toString() !== AVAILABLE_STATUS.INTERESTED.toString()
       &&  data.status.toUpperCase().trim().toString() !== AVAILABLE_STATUS.NOT_INTERESTED.toString() 
       && data.status.toUpperCase().trim().toString() !==  AVAILABLE_STATUS.NOT_AT_HOME.toString()
    ) {
      return next(
        new ErrorResponse(
          `Status is not valid. should be one of ${AVAILABLE_STATUS.NOT_AT_HOME}, ${AVAILABLE_STATUS.INTERESTED}, ${AVAILABLE_STATUS.NOT_INTERESTED}`,
          404,
        ),
      );
    }

    if (
      doc.status &&
      doc.status.toUpperCase() !== AVAILABLE_STATUS.NOT_AT_HOME
    ) {
      return next(new ErrorResponse(`Status cannot be set`, 404));
    }

    const docs = await Model.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json([
      {
        success: true,
        data: docs,
      },
    ]);
  });

/**
 * @description     DELETE single Address
 * @route           DELETE /api/v1/address/:id
 * @Request         Delete
 * @Access          Public
 */
exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(
        new ErrorResponse(`No document found with id of ${req.params.id}`, 404),
      );
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  });
