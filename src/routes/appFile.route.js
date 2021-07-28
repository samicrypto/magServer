const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const appFileController = require('../controllers/appFile.controller');
const { scope } = require('../config/roles');
const { appFileService } = require('../services');

const router = express.Router();

router
    .route('/create')
        .post(appFileController.createAppFile);

router
    .route('/upload/apk/:appFileId')
        .post(appFileController.uploadAppFile)

router
    .route('/cnv/appFileId/:appFileId/version/:version') // cnv check new version
        .post(appFileController.chechAppVersion)

router
    .route('/edit/:appFileId')
        .put(appFileController.editAppFileDetails)

// router
//     .route('/tutorialFiles')
//         .get(TFileController.paginateTutorialFiles)

// router
//     .route('/details/:tfid')
//         .get(TFileController.getTutorialFileDetails)
        
// router
//     .route('/edit/:tfid')
//         .put(TFileController.editTutorialFile)

// router
//     .route('/delete')
//         .delete(TFileController.deleteTutorialFiles)


module.exports = router;