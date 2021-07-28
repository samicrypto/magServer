const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const hardwareValidation = require('../validations/hardware.validation');
const hardwareController = require('../controllers/hardware.controller');
const { scope } = require('../config/roles');

const router = express.Router();

router
  .route('/')
  .post(validate(hardwareValidation.createHardware), hardwareController.createHardware)
  .get(validate(hardwareValidation.paginateHardware), hardwareController.paginateHardware);


router
  .route('/:hid')
    .get(hardwareController.getHardware);

router
  .route('/edit/:hid')
      .put(validate(hardwareValidation.editHardware), hardwareController.editHardware);

router
  .route('/delete/:hid')
    .delete(validate(hardwareValidation.deleteHardware), hardwareController.deleteHardware)

module.exports = router;
