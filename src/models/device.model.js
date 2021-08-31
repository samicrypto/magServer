const mongoose = require('mongoose');
const searchQuery = require("@cme-pro/mongoose-search");
const { toJSON, paginate } = require('./plugins');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

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
// deviceSchema.plugin(searchQuery);
deviceSchema.plugin(mongoose_fuzzy_searching, { fields: [] })

deviceSchema.index({ name: "text", imei:"text" });

/**
 * @typedef Hardware
 */
const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
