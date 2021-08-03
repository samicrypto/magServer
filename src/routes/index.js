const express = require('express');

const docsRoute = require('./docs.route');
const firebaseRoute = require('./firebase.route');


const router = express.Router();


router.use('/docs', docsRoute);
router.use('/firebase', firebaseRoute);


module.exports = router;
