const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');
const { scope } = require('../config/roles');

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *            type: string
 *            description: The user password
 *         role:
 *            type: string
 *            description: The user role
 *       example:
 *         id: d5fE_asz
 *         name: Xiaomi
 *         email: "chiz@gmail.com"
 *         password: "*******"
 *         role: "[user, admin]"
 */

 /**
  * @swagger
  * tags:
  *   name: User
  *   description: The user managing API
  */

 /**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns the list of all the user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */


/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router
  .route('/')
    .post(auth(scope.CU), validate(userValidation.createUser), userController.createUser)
    .get(auth(scope.SU), validate(userValidation.getUsers), userController.getUsers);

router
  .route('/create-admin')
      .post(validate(userValidation.createUser), userController.createAdmin)

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Get the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

router
  .route('/:uid')
    .get(auth(scope.SUBI), validate(userValidation.getUser), userController.getUser);

module.exports = router;
