const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const deviceValidation = require('../validations/device.validation');
const deviceController = require('../controllers/device.controller');
const { scope } = require('../config/roles');

const router = express.Router();

router
  .route('/')
    .post(validate(deviceValidation.createDevice), deviceController.createDevice)
    .get(validate(deviceValidation.paginateDevice), deviceController.paginateDevice);


router
  .route('/:did')
    .get(deviceController.getDevice);

router
  .route('/edit/:did')
      .put(validate(deviceValidation.editDevice), deviceController.editDevice);

router
  .route('/delete/:did')
    .delete(validate(deviceValidation.deleteDevice), deviceController.deleteDevice)

module.exports = router;
