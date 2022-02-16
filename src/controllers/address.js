const Address = require("../models/Address");
const factory = require("../utils/factoryHandler");

/**
 **Model used : Address
 */

/**
 * @description     Get all Address
 * @route           GET /api/v1/address
 * @Request         GET
 * @Access          Public
 */
exports.getAllAddress = factory.getAll(Address);

/**
 * @description     Create all Address
 * @route           POST /api/v1/address
 * @Request         POST
 * @Access          Public - payload
 */
exports.createAddress = factory.create(Address);

/**
 * @description     Get single Address
 * @route           GET /api/v1/address/:id
 * @Request         GET
 * @Access          Public
 */
exports.getAddress = factory.getOne(Address);

/**
 * @description     Update single Address
 * @route           PATCH /api/v1/address/:id
 * @Request         PATCH
 * @Access          Public
 */
exports.updateAddress = factory.updateOne(Address);

/**
 * @description     DELETE single Address
 * @route           DELETE /api/v1/address/:id
 * @Request         Delete
 * @Access          Public
 */
exports.deleteAddress = factory.deleteOne(Address);
