const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const scanFileController = require('../controllers/scanfile.controller');
const { scope } = require('../config/roles');


const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ScanFile:
 *       type: object
 *       required:
 *         - name
 *         - scanDate
 *         - lat
 *         - lon
 *         - width
 *         - height
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the scanfile
 *         name:
 *           type: string
 *           description: The scanfile title
 *         scanDate:
 *           type: string
 *           description: The scanfile date micro secend
 *         lat:
 *            type: string
 *            description: The scanfile lat
 *         lon:
 *            type: string
 *            description: The scanfile lon
 *         width:
 *            type: string
 *            description: The map width
 *         height:
 *            type: string
 *            description: The map height
 *       example:
 *         id: d5fE_asz
 *         name: Xiaomi
 *         scanDate: "45641564864654654"
 *         lat: "10.1564"
 *         lon: "12.45644"
 *         width: "11.45644"
 *         height: "16.45644"
 */

 /**
  * @swagger
  * tags:
  *   name: ScanFile
  *   description: The scanfile managing API
  */

 /**
 * @swagger
 * /api/scanfile:
 *   get:
 *     summary: Returns the list of all the scanfile
 *     tags: [ScanFile]
 *     responses:
 *       200:
 *         description: The list of the scanfile
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ScanFile'
 */


/**
 * @swagger
 * /api/scanfile:
 *   post:
 *     summary: Create a new scanfile
 *     tags: [ScanFile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScanFile'
 *     responses:
 *       200:
 *         description: The scanfile was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScanFile'
 *       500:
 *         description: Some server error
 */

router
    .route('/')
        .get(scanFileController.paginateScanFiles)
        .post(scanFileController.createScanFile);


/**
 * @swagger
 * /api/scanfile/{sfid}:
 *   get:
 *     summary: Get the scanfile by id
 *     tags: [ScanFile]
 *     parameters:
 *       - in: path
 *         name: sfid
 *         schema:
 *           type: string
 *         required: true
 *         description: The devscanfileice id
 *     responses:
 *       200:
 *         description: The scanfile description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScanFile'
 *       404:
 *         description: The scanfile was not found
 */

router
    .route('/:sfid')
        .get(scanFileController.getScanFileById)


/**
 * @swagger
 * /api/scanfile/edit/{sfid}:
 *  put:
 *    summary: Update the scanfile by the id
 *    tags: [ScanFile]
 *    parameters:
 *      - in: path
 *        name: sfid
 *        schema:
 *          type: string
 *        required: true
 *        description: The scanfile id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ScanFile'
 *    responses:
 *      200:
 *        description: The scanfile was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ScanFile'
 *      404:
 *        description: The scanfile was not found
 *      500:
 *        description: Some error happened
 */

router
    .route('/edit/:sfid')
        .put(scanFileController.editScanFileDetails)


/**
 * @swagger
 * /api/scanfile/delete/{sfid}:
 *   delete:
 *     summary: Remove the scan file by id
 *     tags: [ScanFile]
 *     parameters:
 *       - in: path
 *         name: sfid
 *         schema:
 *           type: string
 *         required: true
 *         description: The scan file id
 * 
 *     responses:
 *       200:
 *         description: The scan file was deleted
 *       404:
 *         description: The scan file was not found
 */

router
    .route('/delete/:sfid')
        .delete(scanFileController.deleteScanFileById)


module.exports = router;