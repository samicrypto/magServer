const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const scanFileController = require('../controllers/scanfile.controller');
const { scope } = require('../config/roles');


const router = express.Router();

router
    .route('/')
        .get(scanFileController.paginateScanFiles)

router
    .route('/create')
        .post(scanFileController.createScanFile);

router
    .route('/:sfid')
        .get(scanFileController.getScanFileById)
        
router
    .route('/edit/:sfid')
        .put(scanFileController.editScanFileDetails)

router
    .route('/delete/:sfid')
        .delete(scanFileController.deleteScanFileById)


module.exports = router;