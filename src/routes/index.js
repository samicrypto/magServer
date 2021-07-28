const express = require('express');

const docsRoute = require('./docs.route');
const userRoute = require('./user.route');


const router = express.Router();


router.use('/docs', docsRoute);
router.use('/users', userRoute);


module.exports = router;
