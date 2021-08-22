const express = require('express');

const docsRoute = require('./docs.route');
const warrantyRoute = require('./warranty.route');


const router = express.Router();


router.use('/docs', docsRoute);
router.use('/warranty', warrantyRoute);


module.exports = router;
