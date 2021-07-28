const express = require('express');

const docsRoute = require('./docs.route');
const appFileRoute = require('./appFile.route');


const router = express.Router();


router.use('/docs', docsRoute);
router.use('/appfile', appFileRoute);


module.exports = router;
