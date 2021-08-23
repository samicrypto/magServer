const express = require('express');

const docsRoute = require('./docs.route');
const hardwareRoute = require('./hardware.route');
const deviceRoute = require('./device.route');
const HardwareDeviceRoute = require('./hardwareDevice.route');
const HardwareCategoryRoute = require('./hardwareCategory.route');
const warrantyRoute = require('./warranty.route');
const warrantyCategoryRoute = require('./warrantyCategory.route');


const router = express.Router();


router.use('/docs', docsRoute);
router.use('/hardware', hardwareRoute);
router.use('/device', deviceRoute);
router.use('/hd', HardwareDeviceRoute);
router.use('/hc', HardwareCategoryRoute);
router.use('/warranty', warrantyRoute);
router.use('/wc', warrantyCategoryRoute);


module.exports = router;
