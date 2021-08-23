const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const hardwareCategorySchema = mongoose.Schema({
    title: {
        type: String
    },
    slug: {
        type: String
    },
    category: {
        type: String,
        trim: true
    },
    parent: {
        type: String
    },
    icon: {
        type: String,
    },
    cover: {
        type: String
    }
  },
    {
      timestamps: true,
    }
);

// add plugin that converts mongoose to json
hardwareCategorySchema.plugin(toJSON);
hardwareCategorySchema.plugin(paginate);

hardwareCategorySchema.statics.isCategorySlugTaken = async function (slug) {
    const category = await this.findOne({ slug });
    return !!category;
};


const HardwareCategory = mongoose.model('HardwareCategory', hardwareCategorySchema);

module.exports = HardwareCategory;