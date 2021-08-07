const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const deviceValidation = require('../validations/device.validation');
const deviceController = require('../controllers/device.controller');
const { scope } = require('../config/roles');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       required:
 *         - name
 *         - imei
 *         - androidVersion
 *         - regDate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The book title
 *         imei:
 *           type: string
 *           description: The device imei
 *         androidVersion:
 *            type: string
 *            description: The device android version
 *         regDate:
 *            type: string
 *            description: The device register date
 *       example:
 *         id: d5fE_asz
 *         name: Xiaomi
 *         imei: 45641564864654654
 *         androidVersion: 10
 *         regDate: 562136543
 */

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

router
  .route('/connectDevice/:did')
    .put(deviceController.setDeviceOnHardware)

module.exports = router;
