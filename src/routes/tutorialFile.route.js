const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
// const TFileValidation = require('../validations/tuto');
const TFileController = require('../controllers/tutorialFile.controller');
const { scope } = require('../config/roles');

const router = express.Router();

router
    .route('/create')
        .post(auth(scope.CTF), TFileController.createTutorialFile);

router
    .route('/upload/images/:tutorialFileId')
        .post(TFileController.uploadImageLocally)

router
    .route('/upload/videos/:tutorialFileId')
        .post(TFileController.uploadVideoLocally)


router
    .route('/upload/audios/:tutorialFileId')
        .post(TFileController.uploadAudioLocally)


router
    .route('/upload/docs/:tutorialFileId')
        .post(TFileController.uploadDocLocally)


router
    .route('/upload/videos/aparat/:tutorialFileId')
        .post(TFileController.uploadVideoToAparat)


router
    .route('/tutorialFiles')
        .get(TFileController.paginateTutorialFiles)

router
    .route('/details/:tfid')
        .get(TFileController.getTutorialFileDetails)
        
router
    .route('/edit/:tfid')
        .put(TFileController.editTutorialFile)

router
    .route('/delete')
        .delete(TFileController.deleteTutorialFiles)


module.exports = router;