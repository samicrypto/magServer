const express = require('express');
const { DBTController } = require('../controllers');

const router = express.Router();


router
  .route('/dump-datebase')
    .post(DBTController.dumpMongo2Localfile);


module.exports = router;