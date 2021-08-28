const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const warrantyUsage = {
  params: Joi.object().keys({
    wid: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    warrantyUsageDate: Joi.string(),
    deliveryDate: Joi.string().required(),
    status: Joi.string().required(),
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
      title: Joi.string().required(),
      hardwareId: Joi.string().required(),
      category: Joi.string(),
      startDate: Joi.string().required(),
      expireDate: Joi.string().required(),
    }),
};

const deleteWarranty = {
  params: Joi.object().keys({
    wid: Joi.string().custom(objectId),
  })
};


const getWarrantyHistoryByWarrantyID = {
  params: Joi.object().keys({
    wid: Joi.string().custom(objectId),
  })
};

module.exports = {
  warrantyUsage,
  paginateWarranty,
  getWarranty,
  editWarranty,
  deleteWarranty
};
