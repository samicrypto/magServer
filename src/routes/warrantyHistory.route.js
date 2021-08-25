const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const WHValidation = require('../validations/warrantyHistory.validation');
const WHController = require('../controllers/warrantyHistory.controller');
const { scope } = require('../config/roles');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     WarrantyHistory:
 *       type: object
 *       required:
 *         - warrantyId
 *         - title
 *         - description
 *         - warrantyUsageDate
 *         - deliveryDate
 *         - status
 *       properties:
 *         warrantyId:
 *           type: string
 *           description: The id of the WarrantyHistory
 *         title:
 *           type: string
 *           description: The WarrantyHistory title
 *         description:
 *           type: string
 *           description: The WarrantyHistory imei
 *         warrantyUsageDate:
 *            type: string
 *            description: The WarrantyHistory Usage Date
 *         deliveryDate:
 *            type: string
 *            description: The WarrantyHistory register date
 *         status:
 *            type: string
 *            description: The WarrantyHistory register date
 *       example:
 *         warrantyId: "d5fE9d8asdju89asdh9y89das"
 *         title: "warranty 1"
 *         description: "thi is des of warranty history"
 *         warrantyUsageDate: "1629619790489"
 *         deliveryDate: "1629619790447"
 *         status: "repairing"
 */

 /**
  * @swagger
  * tags:
  *   name: WarrantyHistory
  *   description: The WarrantyHistory managing API
  */

 /**
 * @swagger
 * /api/wh:
 *   get:
 *     summary: Returns the list of all the WarrantyHistory
 *     tags: [WarrantyHistory]
 *     responses:
 *       200:
 *         description: The list of the WarrantyHistory
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Warrant'
 */


/**
 * @swagger
 * /api/wh/warrantyUsage/{wid}:
 *   post:
 *     summary: Create a new WarrantyHistory
 *     tags: [WarrantyHistory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WarrantyHistory'
 *     responses:
 *       200:
 *         description: The WarrantyHistory was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WarrantyHistory'
 *       500:
 *         description: Some server error
 */

router
  .route('/warrantyUsage/:wid')
    .post(validate(WHValidation.warrantyUsage), WHController.warrantyUsage)

router
  .route('/:wid')
    .get(validate(WHValidation.getWarrantyHistoryByWarrantyId), WHController.getWarrantyHistoryByWarrantyId);


module.exports = router;
