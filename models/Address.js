const mongoose = require("mongoose");
const countries = require("i18n-iso-countries");

console.log(countries);

const AddressSchema = new mongoose.Schema({
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
    maxlength: 5,
    required: [true, "Please add a postalcode"]
  },

  number: {
    type: Number,
    minlength: 0,
    maxlength: 15,
    required: [true, "Please add a number"]
  },

  numberAddition: {
    type: String,
    default: ""
    // required: [true, "Please add a numberAddition"]
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
    default: null,
    trim: true
    // enum: {
    //   values: ["not at home", "not interested", "interested"],
    //   message: "Status must be  [not at home] [not interested] [ interested]"
    // }
  },

  name: {
    type: String,
    default: null
  },

  email: {
    type: String,
    default: null,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email"
    ]
  }
});

module.exports = mongoose.model("Address", AddressSchema);
