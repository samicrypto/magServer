const express = require('express');

const docsRoute = require('./docs.route');
const tutorialpkgRoute = require('./tutorialpkg.route');


const router = express.Router();


router.use('/docs', docsRoute);
router.use('/tpkg', tutorialpkgRoute);


module.exports = router;
