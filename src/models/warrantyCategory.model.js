const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const warrantyCategorySchema = mongoose.Schema({
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
warrantyCategorySchema.plugin(toJSON);
warrantyCategorySchema.plugin(paginate);

warrantyCategorySchema.statics.isCategorySlugTaken = async function (slug) {
    const category = await this.findOne({ slug });
    return !!category;
};


const WarrantyCategory = mongoose.model('WarrantyCategory', warrantyCategorySchema);

module.exports = WarrantyCategory;