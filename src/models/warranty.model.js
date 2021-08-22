const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const warrantySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    deviceImei: {
      type: String,
      unique: true,
      required: true
    },
    hradwareSerialNumber: {
      type: String,
      required: true
    },
    startDate: {
      type: String,
      required: true
    },
    expireDate: {
      type: String,
      required: true 
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
warrantySchema.plugin(toJSON);
warrantySchema.plugin(paginate);

/**
 * @typedef Warranty
 */
const Warranty = mongoose.model('Warranty', warrantySchema);

module.exports = Warranty;
