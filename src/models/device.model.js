const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const deviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    androidVersion: {
      type: String,
      required: true
    },
    regDate: {
      type: Date,
      required: true
    },
    androidVersion: {
      type: String,
    },
    hardwareSerialNamber: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Hardware',
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
deviceSchema.plugin(toJSON);
deviceSchema.plugin(paginate);

/**
 * @typedef Hardware
 */
const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
