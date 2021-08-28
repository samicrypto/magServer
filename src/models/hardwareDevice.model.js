const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const hardwareDeviceSchema = mongoose.Schema(
  { // Device imei
    deviceID: {  
      type: mongoose.SchemaTypes.ObjectId,
      ref:"Device",
      required: true
    },
    // Hardware serial number
    hardwareID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref:"Hardware",
      required: true
    }
  },
  {
    timestamps: true,
  }
);

hardwareDeviceSchema.index({deviceID: 1, hardwareID: 1}, {unique: true});

// add plugin that converts mongoose to json
hardwareDeviceSchema.plugin(toJSON);
hardwareDeviceSchema.plugin(paginate);

/**
 * @typedef HardwareDevice
 */
const HardwareDevice = mongoose.model('HardwareDevice', hardwareDeviceSchema);

module.exports = HardwareDevice;
