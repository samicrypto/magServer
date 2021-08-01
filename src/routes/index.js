const express = require('express');

const docsRoute = require('./docs.route');
const scanFileRoute = require('./scanfile.route');

const router = express.Router();


router.use('/docs', docsRoute);
router.use('/scanfile/', scanFileRoute);


module.exports = router;
