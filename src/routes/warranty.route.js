const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const warrantyValidation = require('../validations/warranty.validation');
const warrantyController = require('../controllers/warranty.controller');
const { scope } = require('../config/roles');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Warranty:
 *       type: object
 *       required:
 *         - title
 *         - deviceImei
 *         - hradwareSerialNumber
 *         - startDate
 *         - expireDate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Warranty
 *         title:
 *           type: string
 *           description: The Warranty title
 *         deviceImei:
 *           type: string
 *           description: The Warranty imei
 *         hradwareSerialNumber:
 *            type: string
 *            description: The Warranty android version
 *         startDate:
 *            type: string
 *            description: The Warranty register date
 *         expireDate:
 *            type: string
 *            description: The Warranty register date
 *       example:
 *         id: d5fE_asz
 *         title: Xiaomi
 *         deviceImei: "45641564864654654"
 *         hradwareSerialNumber: "10"
 *         startDate: 562136543
 *         expireDate: 562136543
 */

 /**
  * @swagger
  * tags:
  *   name: Warranty
  *   description: The Warranty managing API
  */

 /**
 * @swagger
 * /api/warranty:
 *   get:
 *     summary: Returns the list of all the Warranty
 *     tags: [Warranty]
 *     responses:
 *       200:
 *         description: The list of the Warranty
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Warrant'
 */


/**
 * @swagger
 * /api/warranty:
 *   post:
 *     summary: Create a new Warranty
 *     tags: [Warranty]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Warranty'
 *     responses:
 *       200:
 *         description: The Warranty was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warranty'
 *       500:
 *         description: Some server error
 */

router
  .route('/')
    .post(validate(warrantyValidation.createWarranty), warrantyController.createWarranty)
    .get(validate(warrantyValidation.paginateWarranty), warrantyController.paginateWarranty);



/**
 * @swagger
 * /api/warranty/{did}:
 *   get:
 *     summary: Get the Warranty by id
 *     tags: [Warranty]
 *     parameters:
 *       - in: path
 *         name: did
 *         schema:
 *           type: string
 *         required: true
 *         description: The Warranty id
 *     responses:
 *       200:
 *         description: The Warranty description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warranty'
 *       404:
 *         description: The Warranty was not found
 */

router
  .route('/:did')
    .get(warrantyController.getWarranty);



/**
 * @swagger
 * /api/warranty/edit/{did}:
 *  put:
 *    summary: Update the Warranty by the id
 *    tags: [Warranty]
 *    parameters:
 *      - in: path
 *        name: did
 *        schema:
 *          type: string
 *        required: true
 *        description: The Warranty id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Warranty'
 *    responses:
 *      200:
 *        description: The Warranty was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Warranty'
 *      404:
 *        description: The Warranty was not found
 *      500:
 *        description: Some error happened
 */

router
  .route('/edit/:did')
      .put(validate(warrantyValidation.editWarranty), warrantyController.editWarranty);

/**
 * @swagger
 * /api/warranty/delete/{did}:
 *   delete:
 *     summary: Remove the Warranty by id
 *     tags: [Warranty]
 *     parameters:
 *       - in: path
 *         name: did
 *         schema:
 *           type: string
 *         required: true
 *         description: The Warranty id
 * 
 *     responses:
 *       200:
 *         description: The Warranty was deleted
 *       404:
 *         description: The Warranty was not found
 */

router
  .route('/delete/:did')
    .delete(validate(warrantyValidation.deleteWarranty), warrantyController.deleteWarranty)

/**
 * @swagger
 * /api/warranty/cdash/{hsn}:
 *  post:
 *    summary: create the Warranty by the hsn
 *    tags: [Warranty]
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
 *            $ref: '#/components/schemas/Warranty'
 *    responses:
 *      200:
 *        description: The Warranty was created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Warranty'
 *      404:
 *        description: The Hardware was not found
 *      500:
 *        description: Some error happened
 */

module.exports = router;
