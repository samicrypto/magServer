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
    .route('/upload/apk/:apfid')
        .post(appFileController.uploadAppFile)

router
    .route('/cnv/appFileId/:apfid/version/:version') // cnv check new version
        .post(appFileController.chechAppVersion)

router
    .route('/edit/:apfid')
        .put(appFileController.editAppFileDetails)

router
    .route('/')
        .get(appFileController.paginateAppFiles)

router
    .route('/:apfid')
        .get(appFileController.getAppFileById)
        
router
    .route('/edit/:apfid')
        .put(appFileController.editAppFileDetails)

router
    .route('/delete/:apfid')
        .delete(appFileController.deleteAppFileById)


module.exports = router;