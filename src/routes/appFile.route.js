const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const appFileController = require('../controllers/appFile.controller');
const { scope } = require('../config/roles');
const { appFileService } = require('../services');

const router = express.Router();



/**
 * @swagger
 * components:
 *   schemas:
 *     AppFile:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - version
 *         - source
 *         - forceUpdate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the appfile
 *         title:
 *           type: string
 *           description: The appfile title
 *         description:
 *           type: string
 *           description: The appfile description
 *         version:
 *           type: string
 *           description: The appfile version
 *         source:
 *            type: string
 *            description: The appfile source file
 *         forceUpdate:
 *            type: boolean
 *            description: The appfile download status
 *       example:
 *         id: d5fE_asz
 *         title: "app file first"
 *         description: "this is app file description"
 *         version: "1.1"
 *         forceUpdate: "true"
 */

 /**
  * @swagger
  * tags:
  *   name: AppFile
  *   description: The AppFile managing API
  */

 /**
 * @swagger
 * /api/appfile:
 *   get:
 *     summary: Returns the list of all the appfiles
 *     tags: [AppFile]
 *     responses:
 *       200:
 *         description: The list of the appfiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppFile'
 */


/**
 * @swagger
 * /api/appfile:
 *   post:
 *     summary: Create a new AppFile
 *     tags: [AppFile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppFile'
 *     responses:
 *       200:
 *         description: The appfile was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppFile'
 *       500:
 *         description: Some server error
 */

router
    .route('/')
        .get(appFileController.paginateAppFiles)
        .post(appFileController.createAppFile);


/**
 * @swagger
 * /api/appfile/upload/apk/{apfid}:
 *   post:
 *     summary: Upload the appfile by id
 *     tags: [AppFile]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: apfid
 *         schema:
 *           type: string
 *         required: true
 *         description: The appfile id
 *       - in: formData
 *         name: single-file
 *         schema:
 *           type: file
 *         required: true
 *         description: The file that is for upload
 *     responses:
 *       200:
 *         description: The appfile description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppFile'
 *       404:
 *         description: The appfile was not found
 */

router
    .route('/upload/apk/:apfid')
        .post(appFileController.uploadAppFile)


/**
 * @swagger
 * /api/appfile/cnv/appFileId/{apfid}/version/{version}:
 *  post:
 *    summary: Check new appfile version
 *    tags: [AppFile]
 *    parameters:
 *      - in: path
 *        name: apfid
 *        schema:
 *          type: string
 *        required: true
 *        description: The appfile id
 *      - in: path
 *        name: version
 *        schema:
 *          type: string
 *        required: true
 *        description: The appfile version
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AppFile'
 *    responses:
 *      200:
 *        description: The appfile was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AppFile'
 *      404:
 *        description: The appfile was not found
 *      500:
 *        description: Some error happened
 */

router
    .route('/cnv/appFileId/:apfid/version/:version') // cnv check new version
        .post(appFileController.chechAppVersion)


/**
 * @swagger
 * /api/appfile/edit/{apfid}:
 *  put:
 *    summary: Update the appfile by the id
 *    tags: [AppFile]
 *    parameters:
 *      - in: path
 *        name: apfid
 *        schema:
 *          type: string
 *        required: true
 *        description: The appfile id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AppFile'
 *    responses:
 *      200:
 *        description: The appfile was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AppFile'
 *      404:
 *        description: The appfile was not found
 *      500:
 *        description: Some error happened
 */

router
    .route('/edit/:apfid')
        .put(appFileController.editAppFileDetails)


/**
 * @swagger
 * /api/appfile/{apfid}:
 *   get:
 *     summary: Get the appfile by id
 *     tags: [AppFile]
 *     parameters:
 *       - in: path
 *         name: apfid
 *         schema:
 *           type: string
 *         required: true
 *         description: The appfile id
 *     responses:
 *       200:
 *         description: The appfile description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppFile'
 *       404:
 *         description: The appfile was not found
 */

router
    .route('/:apfid')
        .get(appFileController.getAppFileById)
        

/**
 * @swagger
 * /api/appfile/delete/{apfid}:
 *   delete:
 *     summary: Remove the appfile by id
 *     tags: [AppFile]
 *     parameters:
 *       - in: path
 *         name: apfid
 *         schema:
 *           type: string
 *         required: true
 *         description: The appfile id
 * 
 *     responses:
 *       200:
 *         description: The appfile was deleted
 *       404:
 *         description: The appfile was not found
 */

router
    .route('/delete/:apfid')
        .delete(appFileController.deleteAppFileById)


module.exports = router;