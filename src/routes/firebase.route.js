const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
// const TFileValidation = require('../validations/tuto');
const FBController = require('../controllers/firebase.controller');
const { scope } = require('../config/roles');


const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Firebase:
 *       type: object
 *       required:
 *         - registrationToken
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the firebase
 *         registrationToken:
 *           type: string
 *           description: The firebase token
 *         message:
 *           type: string
 *           description: The firebase message
 *       example:
 *         registrationToken: "as5df4gdsdgdfgjtyu89t7y"
 *         message: "45641564864654654"
 */

 /**
  * @swagger
  * tags:
  *   name: Firebase
  *   description: The firebase managing API
  */

//  /**
//  * @swagger
//  * /api/firebase:
//  *   get:
//  *     summary: Returns the list of all the firebase
//  *     tags: [Firebase]
//  *     responses:
//  *       200:
//  *         description: The list of the firebase
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Firebase'
//  */

/**
 * @swagger
 * /api/firebase/notification:
 *   post:
 *     summary: Create a new firebase
 *     tags: [Firebase]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Firebase'
 *     responses:
 *       200:
 *         description: The firebase was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Firebase'
 *       500:
 *         description: Some server error
 */

router
    .route('/notification')
        .post(FBController.firebaseNotification)

module.exports = router;