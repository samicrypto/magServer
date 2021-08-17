const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createDealer = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.array().required(),
    address: Joi.object().required() 
  }),
};

const paginateDealer = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDealer = {
  params: Joi.object().keys({
    did: Joi.string().custom(objectId),
  }),
};

const editDealer = {
    params: Joi.object().keys({
      did: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
      name: Joi.string().required(),
      type: Joi.array(),
      address: Joi.object() 
    }),
};

const deleteDealer = {
  params: Joi.object().keys({
    did: Joi.string().custom(objectId),
  })
};


module.exports = {
  createDealer,
  paginateDealer,
  getDealer,
  editDealer,
  deleteDealer
};
