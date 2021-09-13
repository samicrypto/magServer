const express = require('express');
const { hardwareService, hardwareDeviceService } = require('../services');

const docsRoute = require('./docs.route');
const databaseToolsRoute = require('./databaseTools.route');
const hardwareRoute = require('./hardware.route');
const deviceRoute = require('./device.route');
const HardwareDeviceRoute = require('./hardwareDevice.route');
const HardwareCategoryRoute = require('./hardwareCategory.route');
const warrantyRoute = require('./warranty.route');
const warrantyCategoryRoute = require('./warrantyCategory.route');
const warrantyHistoryRoute = require('./warrantyHistory.route');
const dealerRoute = require('./dealer.route');
const firebaseRoute = require('./firebase.route');
const scanFileRoute = require('./scanfile.route');
const tutorialpkgRoute = require('./tutorialpkg.route');
const appFileRoute = require('./appFile.route');
const tutorialFileRoute = require('./tutorialFile.route');

const router = express.Router();


router.use('/docs', docsRoute);
router.use('/dbt', databaseToolsRoute);
router.use('/hardware', hardwareRoute);
router.use('/device', deviceRoute);
router.use('/hd', HardwareDeviceRoute);
router.use('/hc', HardwareCategoryRoute);
router.use('/warranty', warrantyRoute);
router.use('/wc', warrantyCategoryRoute);
router.use('/wh', warrantyHistoryRoute);
router.use('/dealer', dealerRoute);
router.use('/firebase', firebaseRoute);
router.use('/scanfile/', scanFileRoute);
router.use('/tpkg', tutorialpkgRoute);
router.use('/appfile', appFileRoute);
router.use('/tfile', tutorialFileRoute);



module.exports = router;
