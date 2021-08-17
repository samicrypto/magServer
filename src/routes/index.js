const express = require('express');

const docsRoute = require('./docs.route');
const dealerRoute = require('./dealer.route');


const router = express.Router();


router.use('/docs', docsRoute);
router.use('/dealer', dealerRoute);


module.exports = router;
