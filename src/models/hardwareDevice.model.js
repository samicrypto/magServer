const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const hardwareDeviceSchema = mongoose.Schema(
  { // Device imei
    deviceImei: {  
      type: String,
      required: true
    },
    // Hardware serial number
    hardwareSerialNumber: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
hardwareDeviceSchema.plugin(toJSON);
hardwareDeviceSchema.plugin(paginate);

/**
 * @typedef HardwareDevice
 */
const HardwareDevice = mongoose.model('HardwareDevice', hardwareDeviceSchema);

module.exports = HardwareDevice;
