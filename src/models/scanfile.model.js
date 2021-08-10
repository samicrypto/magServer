const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');



const scanFileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },

      scanDate: {
        type: String,
        required: true,
      },
      lat: String,
      lon: String,
      width: String,
      height: String

},
{
  timestamps: true,
});


// add plugin that converts mongoose to json
scanFileSchema.plugin(paginate);


/**
 * @typedef scanFile
 */
const ScanFile = mongoose.model('ScanFile', scanFileSchema);

module.exports = ScanFile;