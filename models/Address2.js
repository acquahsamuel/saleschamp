const mongoose = require("mongoose");
const slugify = require("slugify");

const ArticleSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "Please add a country"]
  },

  city: {
    type: String,
    required: [true, "Please add a city"]
  },

  street: {
    type: String,
    required: [true, "Please add a street"]
  },

  postalcode: {
    type: Number,
    required: [true, "Please add a postalcode"]
  },

  number: {
    type: Number,
    required: [true, "Please add a number"]
  },

  numberAddition: {
    type: String,
    required: [true, "Please field cannot be empty"]
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  },

  status: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model("Article", ArticleSchema);
