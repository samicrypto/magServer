const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createWarranty = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    imei: Joi.string().required(),
    androidVersion: Joi.string().required(),
    regDate: Joi.date().required(),
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
    did: Joi.string().custom(objectId),
  }),
};

const editWarranty = {
    params: Joi.object().keys({
      did: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
      name: Joi.string(),
      imei: Joi.string(),
      androidVersion: Joi.string(),
      regDate: Joi.date(),
      hardwareSerialNamber: Joi.string()
    }),
};

const deleteWarranty = {
  params: Joi.object().keys({
    did: Joi.string().custom(objectId),
  })
};


module.exports = {
  createWarranty,
  paginateWarranty,
  getWarranty,
  editWarranty,
  deleteWarranty
};
