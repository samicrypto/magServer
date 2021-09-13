const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createTpkg = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.object().required(),
  }),
};

const paginateTpkgs = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTpkg = {
  params: Joi.object().keys({
    tpid: Joi.string().custom(objectId),
  }),
};

const editTpkg = {
    params: Joi.object().keys({
      tpid: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
      title: Joi.string(),
      content: Joi.object(),
    }),
};

const deleteTpkg = {
  params: Joi.object().keys({
    tpid: Joi.string().custom(objectId),
  })
};


module.exports = {
  createTpkg,
  paginateTpkgs,
  getTpkg,
  editTpkg,
  deleteTpkg
};
