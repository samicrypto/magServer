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
 *         imei: "45641564864654654"
 *         androidVersion: "10"
 *         regDate: 562136543
 */

 /**
  * @swagger
  * tags:
  *   name: Device
  *   description: The device managing API
  */

 /**
 * @swagger
 * /api/device:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: The list of the devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 */


/**
 * @swagger
 * /api/device:
 *   post:
 *     summary: Create a new device
 *     tags: [Device]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       200:
 *         description: The device was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       500:
 *         description: Some server error
 */

router
  .route('/')
    .post(validate(deviceValidation.createDevice), deviceController.createDevice)
    .get(validate(deviceValidation.paginateDevice), deviceController.paginateDevice);



/**
 * @swagger
 * /api/device/{did}:
 *   get:
 *     summary: Get the device by id
 *     tags: [devices]
 *     parameters:
 *       - in: path
 *         name: did
 *         schema:
 *           type: string
 *         required: true
 *         description: The device id
 *     responses:
 *       200:
 *         description: The device description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The device was not found
 */

router
  .route('/:did')
    .get(deviceController.getDevice);



/**
 * @swagger
 * /pi/device/{did}:
 *  put:
 *    summary: Update the device by the id
 *    tags: [Devices]
 *    parameters:
 *      - in: path
 *        name: did
 *        schema:
 *          type: string
 *        required: true
 *        description: The device id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

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
