const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createDevice = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    imei: Joi.string().required(),
    androidVersion: Joi.string().required(),
    regDate: Joi.date().required(),
  }),
};

const paginateDevice = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDevice = {
  params: Joi.object().keys({
    did: Joi.string().custom(objectId),
  }),
};

const editDevice = {
    params: Joi.object().keys({
      did: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
      name: Joi.string(),
      imei: Joi.string().required(),
      androidVersion: Joi.string(),
      regDate: Joi.date(),
      hardwareSerialNamber: Joi.string()
    }),
};

const deleteDevice = {
  params: Joi.object().keys({
    did: Joi.string().custom(objectId),
  })
};


module.exports = {
  createDevice,
  paginateDevice,
  getDevice,
  editDevice,
  deleteDevice
};
