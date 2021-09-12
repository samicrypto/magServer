const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createWarrantyCategory = {
    body: Joi.object().keys({
        title: Joi.string(),
        slug: Joi.string(),
        tutorialCategory: Joi.string()
    }),
};


const updateCategoryById = {
    params: Joi.object().keys({
        cid: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
            title: Joi.string()
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


const getWarrantyCategory = {
    params: Joi.object().keys({
        slug: Joi.string().required()
    })
};


module.exports = {
    createWarrantyCategory,
    updateCategoryById,
    getCategoryBySlug,
    deleteCategoryBySlug,
    getWarrantyCategory,
};