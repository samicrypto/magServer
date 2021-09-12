const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const dealerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: [{
      type: String,
      enum:['shop', 'support'],
      required: true
    }],
    address: {
      street: String,
      city: String,
      zip: String
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
dealerSchema.plugin(toJSON);
dealerSchema.plugin(paginate);

/**
 * @typedef Dealer
 */
const Dealer = mongoose.model('Dealer', dealerSchema);

module.exports = Dealer;
