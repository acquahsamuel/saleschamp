const mongoose = require("mongoose");
const slugify = require("slugify");

const ArticleSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  street: {
    type: String,
    required: true
  },

  postalcode: {
    type: String,
    required: true
  },

  number: {
    type: String,
    required: true
  },

  numberAddition: {
    type: String,
    required: true
  },

  createdAt: {
    type: String,
    required: true
  },

  updatedAt: {
    type: String,
    required: true
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

  // title: {
  //   type: String,
  //   required: true,
  // },

  // subTitle: {
  //   type: String,
  // },

  // content: {
  //   type: String,
  //   default: true,
  // },

  // url: String,

  // category: {
  //   type: String,
  //   enum: ["bussiness", "politics", "entertainment", "sports", "general"],
  //   default: "general",
  // },

  // language: {
  //   type: String,
  //   enum: ["en", "tr", "es"],
  //   default: "en",
  // },

  // status: {
  //   type: String,
  //   enum: ["private", "public"],
  //   default: "private",
  // },

  // allowComments: {
  //   type: Boolean,
  //   required: true,
  // },

  // image: {
  //   type: String,
  // },

  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },

});


module.exports = mongoose.model("Article", ArticleSchema);
