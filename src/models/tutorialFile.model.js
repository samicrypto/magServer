const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');



const tutorialFileSchema = mongoose.Schema({
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

      // If Input Type is local Upload file ocal and save filename
      // If file is external link we save it in urlLink
      sources: [{
          inputType: { type: String, enum: ['local', 'link']},
          filename: String,
          urlLink: String,
          fileType: String,
          mimetype: String
      }],
},
{
  timestamps: true,
});


// add plugin that converts mongoose to json
tutorialFileSchema.plugin(toJSON);
tutorialFileSchema.plugin(paginate);


/**
 * @typedef tutorialFile
 */
const TutorialFile = mongoose.model('Tutorialfile', tutorialFileSchema);

module.exports = TutorialFile;