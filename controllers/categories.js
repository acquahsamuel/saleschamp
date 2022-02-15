// const User = require('../models/User');
const Category = require('../models/Category');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc      Get all categories
// @route     GET /api/v1/categories
// @access    Private/Admin
exports.getCategories = asyncHandler(async (req, res, next) => {
  // res.status(200).json(res.advancedResults);
  const category = await Category.find();
  res.status(200).json({
    success: true,
    data: category
  })
});


// @desc      Create category
// @route     GET /api/v1/categories
// @access    Private/Admin
exports.createCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    data: category
  });
});




// @desc      Get single user
// @route     GET /api/v1/categories
// @access    Private/Admin
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: category
  });
});



// @desc      Update user
// @route     PATCH /api/v1/categories/:id
// @access    Private/Admin
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: category
  });
});

// @desc      Delete user
// @route     DELETE  /api/v1/categories/:id
// @access    Private/Admin
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});