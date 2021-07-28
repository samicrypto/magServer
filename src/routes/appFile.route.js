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
//     .route('/appFileId')
//         .get(appFileController.paginateAppFiles)

// router
//     .route('/details/:appFileId')
//         .get(appFileController.getAppFileDetails)
        
// router
//     .route('/edit/:appFileId')
//         .put(appFileController.editAppFile)

// router
//     .route('/delete')
//         .delete(appFileController.deleteAppFiles)


module.exports = router;