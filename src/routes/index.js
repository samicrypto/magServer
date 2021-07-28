const express = require('express');
const { hardwareService } = require('../services');

const docsRoute = require('./docs.route');
const hardwareRoute = require('./hardware.route');


const router = express.Router();


router.use('/docs', docsRoute);
router.use('/hw', hardwareRoute);


module.exports = router;
