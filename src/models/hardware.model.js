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
      unique: true,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    hardwareCategoryID: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true
    },
    warrantyCategoryID: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true
    },
    diactive: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
hardwareSchema.plugin(toJSON);
hardwareSchema.plugin(paginate);


hardwareSchema.statics.isSerialNumberTaken = async function (serialNumber) {
  const serial = await this.findOne({ serialNumber });
  return !!serial;
};


/**
 * @typedef Hardware
 */
const Hardware = mongoose.model('Hardware', hardwareSchema);

module.exports = Hardware;
