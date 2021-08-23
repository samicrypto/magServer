const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createTypeCategory = {
    body: Joi.object().keys({
        title: Joi.string(),
        slug: Joi.string(),
        tutorialCategory: Joi.string()
    }),
};

const createBrandCategory = {
    params: Joi.object().keys({
        typeSlug: Joi.string(),
    }),
    body: Joi.object().keys({
        title: Joi.string(),
        slug: Joi.string()
    }),
};

const createModelCategory = {
  params: Joi.object().keys({
      brandSlug: Joi.string(),
  }),
  body: Joi.object().keys({
      title: Joi.string(),
      slug: Joi.string()
  }),
};


const updateCategoryById = {
    params: Joi.object().keys({
        cid: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
            title: Joi.string(),
            slug: Joi.string()
        }).options({ stripUnknown: true }),
};


const getCategoryBySlug = {
    params: Joi.object().keys({
        slug: Joi.string().required()
    })
};

const deleteCategoryBySlug = {
    params: Joi.object().keys({
        slug: Joi.string()
    })
};


const getTypeCategory = {
    params: Joi.object().keys({
        typeSlug: Joi.string().required()
    })
};

const getBrandCategory = {
  params: Joi.object().keys({
    typeSlug: Joi.string().required()
  })
};

const getModelCategory = {
  params: Joi.object().keys({
      brandSlug: Joi.string().required()
  })
};

module.exports = {
    createTypeCategory,
    createBrandCategory,
    createModelCategory,
    updateCategoryById,
    getCategoryBySlug,
    deleteCategoryBySlug,
    getTypeCategory,
    getBrandCategory,
    getModelCategory
};