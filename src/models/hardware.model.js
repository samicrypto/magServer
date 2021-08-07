const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const hardwareSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    serialNumber: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
hardwareSchema.plugin(toJSON);
hardwareSchema.plugin(paginate);

/**
 * @typedef Hardware
 */
const Hardware = mongoose.model('Hardware', hardwareSchema);

module.exports = Hardware;
