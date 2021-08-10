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
 *     tags: [HardwareDevice]
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

router
  .route('/')
    .get(validate(HDValidation.paginateHardwareDevice), HDController.paginateHardwareDevice);



/**
 * @swagger
 * /api/hd/{hdid}:
 *   get:
 *     summary: Get the device by id
 *     tags: [HardwareDevice]
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
 * /pi/hd/edit/{hdid}:
 *  put:
 *    summary: Update the hardware device by the id
 *    tags: [HardwareDevice]
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


/**
 * @swagger
 * /api/hardware/delete/{hdid}:
 *   delete:
 *     summary: Remove the hardware by id
 *     tags: [HardwareDevice]
 *     parameters:
 *       - in: path
 *         name: hdid
 *         schema:
 *           type: string
 *         required: true
 *         description: The hardware device id
 * 
 *     responses:
 *       200:
 *         description: The hardware device was deleted
 *       404:
 *         description: The hardware device was not found
 */


router
  .route('/delete/:hdid')
    .delete(validate(HDValidation.deleteHardwareDevice), HDController.deleteHardwareDevice)

  
/**
 * @swagger
 * /api/hd/sdoh:
 *   post:
 *     summary: Set Device on Hardware
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
  .route('/sdoh') // set device on hardware
    .post(HDController.setDeviceOnHardware)

module.exports = router;
