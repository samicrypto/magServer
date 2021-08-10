const express = require('express');
const { hardwareService, hardwareDeviceService } = require('../services');

const docsRoute = require('./docs.route');
const hardwareRoute = require('./hardware.route');
const deviceRoute = require('./device.route');
const HardwareDeviceRoute = require('./hardwareDevice.route');


const router = express.Router();


router.use('/docs', docsRoute);
router.use('/hardware', hardwareRoute);
router.use('/device', deviceRoute);
router.use('/hd', HardwareDeviceRoute);



module.exports = router;
