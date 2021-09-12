const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const dealerValidation = require('../validations/dealer.validation');
const dealerController = require('../controllers/dealer.controller');
const { scope } = require('../config/roles');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Dealers:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the dealer
 *         name:
 *           type: string
 *           description: The dealer title
 *         type:
 *           type: string
 *           description: The dealer type
 *         address:
 *            type: string
 *            description: The dealer address
 *       example:
 *         name: Xiaomi
 *         type: ["shop", "support"]
 *         address: { "street":"Jordan", "city":"New York" , "zip":"9090"}
 */

 /**
  * @swagger
  * tags:
  *   name: Dealers
  *   description: The Dealers managing API
  */

 /**
 * @swagger
 * /api/dealer:
 *   get:
 *     summary: Returns the list of all the dealers
 *     tags: [Dealers]
 *     responses:
 *       200:
 *         description: The list of the dealers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dealers'
 */


/**
 * @swagger
 * /api/dealer:
 *   post:
 *     summary: Create a new dealer
 *     tags: [Dealers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dealers'
 *     responses:
 *       200:
 *         description: The dealer was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dealers'
 *       500:
 *         description: Some server error
 */

router
  .route('/')
    .post(validate(dealerValidation.createDealer), dealerController.createDealer)
    .get(validate(dealerValidation.paginateDealer), dealerController.paginateDealer);



/**
 * @swagger
 * /api/dealer/{did}:
 *   get:
 *     summary: Get the dealer by id
 *     tags: [Dealers]
 *     parameters:
 *       - in: path
 *         name: did
 *         schema:
 *           type: string
 *         required: true
 *         description: The dealer id
 *     responses:
 *       200:
 *         description: The dealer description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dealers'
 *       404:
 *         description: The dealer was not found
 */

router
  .route('/:did')
    .get(dealerController.getDealer);



/**
 * @swagger
 * /api/dealer/edit/{did}:
 *  put:
 *    summary: Update the dealer by the id
 *    tags: [Dealers]
 *    parameters:
 *      - in: path
 *        name: did
 *        schema:
 *          type: string
 *        required: true
 *        description: The dealer id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Dealers'
 *    responses:
 *      200:
 *        description: The dealer was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Dealers'
 *      404:
 *        description: The dealer was not found
 *      500:
 *        description: Some error happened
 */

router
  .route('/edit/:did')
      .put(validate(dealerValidation.editDealer), dealerController.editDealer);

/**
 * @swagger
 * /api/dealer/delete/{did}:
 *   delete:
 *     summary: Remove the dealer by id
 *     tags: [Dealers]
 *     parameters:
 *       - in: path
 *         name: did
 *         schema:
 *           type: string
 *         required: true
 *         description: The dealer id
 * 
 *     responses:
 *       200:
 *         description: The dealer was deleted
 *       404:
 *         description: The dealer was not found
 */

router
  .route('/delete/:did')
    .delete(validate(dealerValidation.deleteDealer), dealerController.deleteDealer)

module.exports = router;
