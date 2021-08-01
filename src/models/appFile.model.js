const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');



const appFileSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
        trim: true,
      },
      version: Number,
      source: String,
      forceUpdate: Boolean
},
{
  timestamps: true,
});


// add plugin that converts mongoose to json
appFileSchema.plugin(toJSON);
appFileSchema.plugin(paginate);


/**
 * @typedef tutorialFile
 */
const AppFile = mongoose.model('AppFile', appFileSchema);

module.exports = AppFile;