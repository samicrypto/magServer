const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The username
 *         password:
 *            type: string
 *            description: The user password
 *       example:
 *         username: "saman.na30ri@gmail.com"
 *         password: "saman1993"
 */

 /**
  * @swagger
  * tags:
  *   name: Auth
  *   description: The Auth managing API
  */


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: The user was successfully login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       500:
 *         description: Some server error
 */


router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);

module.exports = router;
