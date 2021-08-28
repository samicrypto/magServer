const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createWarranty = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    hardwareID: Joi.string().required(),
    category: Joi.string(),
    startDate: Joi.string().required(),
    expireDate: Joi.string().required(),
  }),
};

const paginateWarranty = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getWarranty = {
  params: Joi.object().keys({
    wid: Joi.string().custom(objectId),
  }),
};

const editWarranty = {
    params: Joi.object().keys({
      wid: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
      title: Joi.string(),
      hardwareID: Joi.string(),
      category: Joi.string(),
      startDate: Joi.string(),
      expireDate: Joi.string(),
    }),
};

const deleteWarranty = {
  params: Joi.object().keys({
    wid: Joi.string().custom(objectId),
  })
};


module.exports = {
  createWarranty,
  paginateWarranty,
  getWarranty,
  editWarranty,
  deleteWarranty
};
