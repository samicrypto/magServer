const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createHardware = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    serialNumber: Joi.string().required(),
    capacity: Joi.number().required(),
    warrantyType: Joi.string()
  }),
};

const paginateHardware = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getHardware = {
  params: Joi.object().keys({
    hid: Joi.string().custom(objectId),
  }),
};

const editHardware = {
    params: Joi.object().keys({
      hid: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
      name: Joi.string(),
      serialNumber: Joi.string(),
      capacity: Joi.number()
    }),
};

const deleteHardware = {
  params: Joi.object().keys({
    hid: Joi.string().custom(objectId),
  })
};


module.exports = {
  createHardware,
  paginateHardware,
  getHardware,
  editHardware,
  deleteHardware
};
