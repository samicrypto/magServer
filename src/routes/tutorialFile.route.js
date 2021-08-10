const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
// const TFileValidation = require('../validations/tuto');
const TFileController = require('../controllers/tutorialFile.controller');
const { scope } = require('../config/roles');

const router = express.Router();



/**
 * @swagger
 * components:
 *   schemas:
 *     TutorialFile:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - sources
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the device
 *         title:
 *           type: string
 *           description: The TutorialFile title
 *         description:
 *           type: string
 *           description: The TutorialFile description
 *         sources:
 *            type: string
 *            description: The TutorialFile source
 *       example:
 *         id: d5fE_asz
 *         title: file 1
 *         description: "this is description"
 *         sources: "[]"
 */

 /**
  * @swagger
  * tags:
  *   name: TutorialFile
  *   description: The TutorialFile managing API
  */

 /**
 * @swagger
 * /api/tfile/:
 *   get:
 *     summary: Returns the list of all the TutorialFile
 *     tags: [TutorialFile]
 *     responses:
 *       200:
 *         description: The list of the TutorialFile
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TutorialFile'
 */

 /**
 * @swagger
 * /api/tfile:
 *   post:
 *     summary: Create a new TutorialFile
 *     tags: [TutorialFile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TutorialFile'
 *     responses:
 *       200:
 *         description: The TutorialFile was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TutorialFile'
 *       500:
 *         description: Some server error
 */

 router
    .route('/')
        .get(TFileController.paginateTutorialFiles)
        .post(auth(scope.SUBI), TFileController.createTutorialFile);

 /**
 * @swagger
 * /api/tfile/upload/images/{tfid}:
 *   post:
 *     summary: upload a image file
 *     tags: [TutorialFile]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: multi-files
 *         schema:
 *           type: file
 *         required: true
 *         description: The file to upload
 *       - in: path
 *         name: tfid
 *         schema:
 *           type: string
 *         required: true
 *         description: The tutorialFile id  
 *     responses:
 *       200:
 *         description: The TutorialFile was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TutorialFile'
 *       500:
 *         description: Some server error
 */


router
    .route('/upload/images/:tfid')
        .post(TFileController.uploadImageLocally)

 /**
 * @swagger
 * /api/tfile/upload/videos/{tfid}:
 *   post:
 *     summary: upload a videos file
 *     tags: [TutorialFile]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: multi-files
 *         schema:
 *           type: file
 *         required: true
 *         description: The file to upload
 *       - in: path
 *         name: tfid
 *         schema:
 *           type: string
 *         required: true
 *         description: The tutorialFile id  
 *     responses:
 *       200:
 *         description: The TutorialFile was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TutorialFile'
 *       500:
 *         description: Some server error
 */

router
    .route('/upload/videos/:tfid')
        .post(TFileController.uploadVideoLocally)


 /**
 * @swagger
 * /api/tfile/upload/audios/{tfid}:
 *   post:
 *     summary: upload a audios file
 *     tags: [TutorialFile]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: multi-files
 *         schema:
 *           type: file
 *         required: true
 *         description: The file to upload
 *       - in: path
 *         name: tfid
 *         schema:
 *           type: string
 *         required: true
 *         description: The tutorialFile id  
 *     responses:
 *       200:
 *         description: The TutorialFile was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TutorialFile'
 *       500:
 *         description: Some server error
 */

router
    .route('/upload/audios/:tfid')
        .post(TFileController.uploadAudioLocally)


 /**
 * @swagger
 * /api/tfile/upload/docs/{tfid}:
 *   post:
 *     summary: upload a docs file
 *     tags: [TutorialFile]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: multi-files
 *         schema:
 *           type: file
 *         required: true
 *         description: The file to upload
 *       - in: path
 *         name: tfid
 *         schema:
 *           type: string
 *         required: true
 *         description: The tutorialFile id  
 *     responses:
 *       200:
 *         description: The TutorialFile was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TutorialFile'
 *       500:
 *         description: Some server error
 */

router
    .route('/upload/docs/:tfid')
        .post(TFileController.uploadDocLocally)


router
    .route('/upload/videos/aparat/:tfid')
        .post(TFileController.uploadVideoToAparat)


/**
 * @swagger
 * /api/tfile/{tfid}:
 *   get:
 *     summary: Get the tutorialfile by id
 *     tags: [TutorialFile]
 *     parameters:
 *       - in: path
 *         name: tfid
 *         schema:
 *           type: string
 *         required: true
 *         description: The tutorialfile id
 *     responses:
 *       200:
 *         description: The tutorialfile description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TutorialFile'
 *       404:
 *         description: The book was not found
 */

router
    .route('/:tfid')
        .get(TFileController.getTutorialFileDetails)
    
        

/**
 * @swagger
 * /api/tfile/edit/{tfid}:
 *  put:
 *    summary: Update the TutorialFile by the id
 *    tags: [TutorialFile]
 *    parameters:
 *      - in: path
 *        name: tfid
 *        schema:
 *          type: string
 *        required: true
 *        description: The tutorialfile id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TutorialFile'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TutorialFile'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

router
    .route('/edit/:tfid')
        .put(TFileController.editTutorialFile)




/**
 * @swagger
 * /api/tfile/{tfid}:
 *   delete:
 *     summary: Remove the tutorialfile by id
 *     tags: [TutorialFile]
 *     parameters:
 *       - in: path
 *         name: tfid
 *         schema:
 *           type: string
 *         required: true
 *         description: The tutorialfile id
 * 
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */

router
    .route('/delete')
        .delete(TFileController.deleteTutorialFiles)


module.exports = router;