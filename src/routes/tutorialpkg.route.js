const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const TPkgValidation = require('../validations/tutorialpkg.validation');
const TPkgController = require('../controllers/tutorialpkg.controller');
const { scope } = require('../config/roles');

const router = express.Router();

router
  .route('/')
  .post(validate(TPkgController.createUser), TPkgController.createTPkg)
  .get(validate(TPkgValidation.paginateTpkgs), TPkgController.paginateTpkg);

router
  .route('/edit/:tpid')
      .put(validate(TPkgValidation.editTpkg), TPkgController.editTPkg);

router
  .route('/delete/:tpid')
    .delete(validate(TPkgValidation.deleteTpkg), TPkgController.deleteTpkg)

module.exports = router;
