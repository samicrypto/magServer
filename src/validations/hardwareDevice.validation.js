const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createHardwareDevice = {
  body: Joi.object().keys({
    deviceImei: Joi.string().required(),
    hardwareSerialNumber: Joi.string().required(),
  }),
};

const paginateHardwareDevice = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getHardwareDevice = {
  params: Joi.object().keys({
    imei: Joi.string().required(),
    serialNumber: Joi.string().required()
  }),
};

const editHardwareDevice = {
    params: Joi.object().keys({
      hdid: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
      deviceImei: Joi.string().required(),
      hardwareSerialNumber: Joi.string().required(),
    }),
};

const deleteHardwareDevice = {
  params: Joi.object().keys({
    hdid: Joi.string().custom(objectId),
  })
};


module.exports = {
  createHardwareDevice,
  paginateHardwareDevice,
  getHardwareDevice,
  editHardwareDevice,
  deleteHardwareDevice
};
