const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const HDValidation = require('../validations/hardwareDevice.validation');
const HDController = require('../controllers/hardwareDevice.controller');
const { scope } = require('../config/roles');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     HardwareDevice:
 *       type: object
 *       required:
 *         - deviceImei
 *         - hardwareSerialNumber
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         deviceImei:
 *           type: string
 *           description: The book title
 *         hardwareSerialNumber:
 *           type: string
 *           description: The device imei
 *       example:
 *         id: d5fE_asz
 *         deviceImei: "54561354687541564"
 *         hardwareSerialNumber: "4564dasd64asd8646asd54654"
 */

 /**
  * @swagger
  * tags:
  *   name: HardwareDevice
  *   description: The HardwareDevice managing API
  */

 /**
 * @swagger
 * /api/hd:
 *   get:
 *     summary: Returns the list of all the Hardware Devices
 *     tags: [HardwareDevices]
 *     responses:
 *       200:
 *         description: The list of the hardware devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HardwareDevice'
 */


/**
 * @swagger
 * /api/hd:
 *   post:
 *     summary: Create a new hardware device
 *     tags: [HardwareDevice]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HardwareDevice'
 *     responses:
 *       200:
 *         description: The hardware device was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HardwareDevice'
 *       500:
 *         description: Some server error
 */

router
  .route('/')
    .post(HDController.createHardwareDevice)
    .get(validate(HDValidation.paginateHardwareDevice), HDController.paginateHardwareDevice);



/**
 * @swagger
 * /api/device/{hdid}:
 *   get:
 *     summary: Get the device by id
 *     tags: [devices]
 *     parameters:
 *       - in: path
 *         name: hdid
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
 *               $ref: '#/components/schemas/HardwareDevice'
 *       404:
 *         description: The device was not found
 */

router
  .route('/:hdid')
    .get(HDController.getHardwareDevice);



/**
 * @swagger
 * /pi/device/{hdid}:
 *  put:
 *    summary: Update the hardware device by the id
 *    tags: [Devices]
 *    parameters:
 *      - in: path
 *        name: hdid
 *        schema:
 *          type: string
 *        required: true
 *        description: The device id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/HardwareDevice'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HardwareDevice'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

router
  .route('/edit/:hdid')
      .put(validate(HDValidation.editHardwareDevice), HDController.editHardwareDevice);

router
  .route('/delete/:hdid')
    .delete(validate(HDValidation.deleteHardwareDevice), HDController.deleteHardwareDevice)

router
  .route('/sdoh') // set device on hardware
    .put(HDController.setDeviceOnHardware)

module.exports = router;
