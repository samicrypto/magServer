const express = require('express');
const docsRoute = require('./docs.route');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');


const router = express.Router();

router.use('/docs', docsRoute);
router.use('/users', userRoute);
router.use('/auth', authRoute);


module.exports = router;
