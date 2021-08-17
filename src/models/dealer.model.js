const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const dealerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum:['shop', 'suppourt'],
      required: true
    },
    address: {
      type: String,
      required: true
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
