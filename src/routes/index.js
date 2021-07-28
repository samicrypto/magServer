const express = require('express');

const docsRoute = require('./docs.route');
const tutorialFileRoute = require('./tutorialFile.route');


const router = express.Router();


router.use('/docs', docsRoute);
router.use('/tfile', tutorialFileRoute);


module.exports = router;
