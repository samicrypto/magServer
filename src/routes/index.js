const express = require('express');

const docsRoute = require('./docs.route');
const databaseToolsRoute = require('./databaseTools.route');


const router = express.Router();


router.use('/docs', docsRoute);
router.use('/dbt', databaseToolsRoute);


module.exports = router;
