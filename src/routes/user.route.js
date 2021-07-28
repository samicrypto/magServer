const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');
const { scope } = require('../config/roles');

const router = express.Router();

router
  .route('/')
  .post(auth(scope.CU), validate(userValidation.createUser), userController.createUser)
  .get(auth(scope.SU), validate(userValidation.getUsers), userController.getUsers);

router
  .route('/create-admin')
      .post(validate(userValidation.createUser), userController.createAdmin)
      
router
  .route('/:userId')
  .get(auth(scope.SUBI), validate(userValidation.getUser), userController.getUser);

module.exports = router;
