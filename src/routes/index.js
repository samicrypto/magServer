const express = require('express');

const docsRoute = require('./docs.route');
const warrantyRoute = require('./warranty.route');
const warrantyCategoryRoute = require('./warrantyCategory.route');


const router = express.Router();


router.use('/docs', docsRoute);
router.use('/warranty', warrantyRoute);
router.use('/wc', warrantyCategoryRoute);


module.exports = router;
