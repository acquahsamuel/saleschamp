const mongoose = require("mongoose");
const AVAILABLE_STATUS = require("../utils/constants");

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


AddressSchema.pre('save' ,function(){
  
})

module.exports = mongoose.model("Address", AddressSchema);
