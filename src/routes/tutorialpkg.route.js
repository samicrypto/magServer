const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const TPkgValidation = require('../validations/tutorialpkg.validation');
const TPkgController = require('../controllers/tutorialpkg.controller');
const { scope } = require('../config/roles');

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Tutorialpkg:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the tutorialpkg
 *         title:
 *           type: string
 *           description: The tutorialpkg title
 *         content:
 *           type: object
 *           description: The tutorialpkg content
 *       example:
 *         id: "d5fE_asz"
 *         title: "pkg file"
 *         content: { paramt: "asd asdjhk" }
 */

 /**
  * @swagger
  * tags:
  *   name: Tutorialpkg
  *   description: The Tutorialpkg managing API
  */

 /**
 * @swagger
 * /api/tpkg:
 *   get:
 *     summary: Returns the list of all the tutorialpkgs
 *     tags: [Tutorialpkg]
 *     responses:
 *       200:
 *         description: The list of the tutorialpkgs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tutorialpkg'
 */


/**
 * @swagger
 * /api/tpkg:
 *   post:
 *     summary: Create a new tutorialpkg
 *     tags: [Tutorialpkg]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tutorialpkg'
 *     responses:
 *       200:
 *         description: The tutorialpkg was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tutorialpkg'
 *       500:
 *         description: Some server error
 */

router
  .route('/')
    .post(validate(TPkgValidation.createTpkg), TPkgController.createTPkg)
    .get(validate(TPkgValidation.paginateTpkgs), TPkgController.paginateTpkg);


/**
 * @swagger
 * /api/tpkg/{tpid}:
 *   get:
 *     summary: Get the tutorialpkgs by id
 *     tags: [Tutorialpkg]
 *     parameters:
 *       - in: path
 *         name: tpid
 *         schema:
 *           type: string
 *         required: true
 *         description: The tutorialpkgs id
 *     responses:
 *       200:
 *         description: The tutorialpkgs description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tutorialpkg'
 *       404:
 *         description: The tutorialpkgs was not found
 */

router
    .route('/:tpid')
        .get(validate(TPkgValidation.getTpkg), TPkgController.getTpkg)

/**
 * @swagger
 * /api/tpkg/edit/{tpid}:
 *  put:
 *    summary: Update the tutorialpkgs by the id
 *    tags: [Tutorialpkg]
 *    parameters:
 *      - in: path
 *        name: tpid
 *        schema:
 *          type: string
 *        required: true
 *        description: The tutorialpkgs id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Tutorialpkg'
 *    responses:
 *      200:
 *        description: The tutorialpkgs was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Tutorialpkg'
 *      404:
 *        description: The tutorialpkgs was not found
 *      500:
 *        description: Some error happened
 */

router
  .route('/edit/:tpid')
      .put(validate(TPkgValidation.editTpkg), TPkgController.editTPkg);


/**
 * @swagger
 * /api/tpkg/delete/{tpid}:
 *   delete:
 *     summary: Remove the tutorialpkgs by id
 *     tags: [Tutorialpkg]
 *     parameters:
 *       - in: path
 *         name: tpid
 *         schema:
 *           type: string
 *         required: true
 *         description: The tutorialpkgs id
 * 
 *     responses:
 *       200:
 *         description: The tutorialpkgs was deleted
 *       404:
 *         description: The tutorialpkgs was not found
 */

router
  .route('/delete/:tpid')
    .delete(validate(TPkgValidation.deleteTpkg), TPkgController.deleteTpkg)

module.exports = router;
