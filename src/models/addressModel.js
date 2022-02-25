const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Please add a country'],
    },

    city: {
      type: String,
      required: [true, 'Please add a city'],
    },

    street: {
      type: String,
      required: [true, 'Please add a street'],
    },

    postalcode: {
      type: String,
      maxlength: [5, 'Maximum length of 5'],
      required: [true, 'Please add a postalcode'],
      match: [/^[0-9]+$/, 'Postal code can only contain digits'],
    },

    number: {
      type: Number,
      minlength: 0,
      maxlength: 15,
      match: [/^0|[1-9]\d*$/, 'Only number allowed'],
      required: [true, 'Please add a number'],
    },

    numberAddition: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      default: null,
      trim: true,
    },

    name: {
      type: String,
      default: null,
    },

    email: {
      type: String,
      default: null,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Address', AddressSchema);
