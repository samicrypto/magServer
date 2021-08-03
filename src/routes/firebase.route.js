const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
// const TFileValidation = require('../validations/tuto');
const FBController = require('../controllers/firebase.controller');
const { scope } = require('../config/roles');


const router = express.Router();

router
    .route('/notification')
        .post(FBController.firebaseNotification)

module.exports = router;