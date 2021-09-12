const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      searchable: true
    },
    imei: {
      type: String,
      unique: true,
      required: true,
      searchable: true
    },
    androidVersion: {
      type: String,
      required: true
    },
    regDate: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
deviceSchema.plugin(toJSON);
deviceSchema.plugin(paginate);

deviceSchema.index({ name: "text", imei:"text" });

/**
 * @typedef Hardware
 */
const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
