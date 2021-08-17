const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const dealerValidation = require('../validations/device.validation');
const dealerController = require('../controllers/dealer.controller');
const { scope } = require('../config/roles');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Devices:
 *       type: object
 *       required:
 *         - name
 *         - imei
 *         - androidVersion
 *         - regDate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the device
 *         name:
 *           type: string
 *           description: The Device title
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
  *   name: Devices
  *   description: The Device managing API
  */

 /**
 * @swagger
 * /api/device:
 *   get:
 *     summary: Returns the list of all the devices
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
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Devices'
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
    .post(validate(dealerValidation.createDevice), dealerController.createDevice)
    .get(validate(dealerValidation.paginateDevice), dealerController.paginateDevice);



/**
 * @swagger
 * /api/device/{did}:
 *   get:
 *     summary: Get the device by id
 *     tags: [Devices]
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
 *               $ref: '#/components/schemas/Device'
 *       404:
 *         description: The device was not found
 */

router
  .route('/:did')
    .get(dealerController.getDevice);



/**
 * @swagger
 * /api/device/edit/{did}:
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
 *            $ref: '#/components/schemas/Device'
 *    responses:
 *      200:
 *        description: The Device was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Device'
 *      404:
 *        description: The Device was not found
 *      500:
 *        description: Some error happened
 */

router
  .route('/edit/:did')
      .put(validate(dealerValidation.editDevice), dealerController.editDevice);

/**
 * @swagger
 * /api/device/delete/{did}:
 *   delete:
 *     summary: Remove the device by id
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: did
 *         schema:
 *           type: string
 *         required: true
 *         description: The device id
 * 
 *     responses:
 *       200:
 *         description: The device was deleted
 *       404:
 *         description: The device was not found
 */

router
  .route('/delete/:did')
    .delete(validate(dealerValidation.deleteDevice), dealerController.deleteDevice)

/**
 * @swagger
 * /api/device/cdash/{hsn}:
 *  post:
 *    summary: create the device by the hsn
 *    tags: [Devices]
 *    parameters:
 *      - in: path
 *        name: hsn
 *        schema:
 *          type: string
 *        required: true
 *        description: The hardware serial number
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Device'
 *    responses:
 *      200:
 *        description: The Device was created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Device'
 *      404:
 *        description: The Hardware was not found
 *      500:
 *        description: Some error happened
 */

router
  .route('/cdash/:hsn')
    .post(dealerController.createDeviceAndSetHardewareSerialNumber)

module.exports = router;
