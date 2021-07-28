const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const tutorialpkgSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: Object,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tutorialpkgSchema.plugin(toJSON);
tutorialpkgSchema.plugin(paginate);

/**
 * @typedef Tutorialpkg
 */
const Tutorialpkg = mongoose.model('Tutorialpkg', tutorialpkgSchema);

module.exports = Tutorialpkg;
