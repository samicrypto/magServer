const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const hardwareValidation = require('../validations/hardware.validation');
const hardwareController = require('../controllers/hardware.controller');
const { scope } = require('../config/roles');

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Hardwares:
 *       type: object
 *       required:
 *         - name
 *         - serialNumber
 *         - capacity
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the device
 *         name:
 *           type: string
 *           description: The hardware title
 *         serialNumber:
 *           type: string
 *           description: The hardware serial number
 *         capacity:
 *            type: string
 *            description: The hardware capacity
 *       example:
 *         id: "610126106d0f193b034bcc15"
 *         name: "vmichar 1"
 *         serialNumber: "10asd44564asd154213"
 *         capacity: 10
 */

 /**
  * @swagger
  * tags:
  *   name: Hardwares
  *   description: The Hardware managing API
  */

 /**
 * @swagger
 * /api/hardware:
 *   get:
 *     summary: Returns the list of all the hardwares
 *     tags: [Hardwares]
 *     responses:
 *       200:
 *         description: The list of the hardwares
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hardware'
 */


/**
 * @swagger
 * /api/hardware:
 *   post:
 *     summary: Create a new hardware
 *     tags: [Hardwares]
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
 *               $ref: '#/components/schemas/Hardware'
 *       500:
 *         description: Some server error
 */
router
  .route('/')
  .post(validate(hardwareValidation.createHardware), hardwareController.createHardware)
  .get(validate(hardwareValidation.paginateHardware), hardwareController.paginateHardware);


/**
 * @swagger
 * /api/hardware/{hid}:
 *   get:
 *     summary: Get the hardware by id
 *     tags: [Hardwares]
 *     parameters:
 *       - in: path
 *         name: hid
 *         schema:
 *           type: string
 *         required: true
 *         description: The hardware id
 *     responses:
 *       200:
 *         description: The hardware description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hardware'
 *       404:
 *         description: The hardware was not found
 */

router
  .route('/:hid')
    .get(hardwareController.getHardware);



/**
 * @swagger
 * /api/hardware/edit/{hid}:
 *  put:
 *    summary: Update the hardware by the id
 *    tags: [Hardwares]
 *    parameters:
 *      - in: path
 *        name: hid
 *        schema:
 *          type: string
 *        required: true
 *        description: The hardware id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Hardware'
 *    responses:
 *      200:
 *        description: The Hardware was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Hardware'
 *      404:
 *        description: The Hardware was not found
 *      500:
 *        description: Some error happened
 */

router
  .route('/edit/:hid')
      .put(validate(hardwareValidation.editHardware), hardwareController.editHardware);

/**
 * @swagger
 * /api/hardware/delete/{hid}:
 *   delete:
 *     summary: Remove the hardware by id
 *     tags: [Hardwares]
 *     parameters:
 *       - in: path
 *         name: hid
 *         schema:
 *           type: string
 *         required: true
 *         description: The hardware id
 * 
 *     responses:
 *       200:
 *         description: The hardware was deleted
 *       404:
 *         description: The hardware was not found
 */

router
  .route('/delete/:hid')
    .delete(validate(hardwareValidation.deleteHardware), hardwareController.deleteHardware)

module.exports = router;
