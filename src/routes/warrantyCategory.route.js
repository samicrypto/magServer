const express = require('express');
const auth = require('../middlewares/auth');
const { scope } = require('../config/roles');
const validate = require('../middlewares/validate');
const WCController = require('../controllers/warrantyCategory.controller');
const WCValidation = require("../validations/warrantyCategory.validation");


const router = express.Router();

router
    .route('/')
        .get(WCController.getWarrantyCategory)
        .post(validate(WCValidation.createWarrantyCategory),  WCController.createWarrantyCategory)

router
    .route('/edit/:cid')
        .put(validate(WCValidation.updateCategoryById), WCController.editCategoryById)

router
    .route('/:slug')
        .get(validate(WCValidation.getCategoryBySlug), WCController.getCategoryBySlug)

router
    .route('/delete/:slug')
        .delete(validate(WCValidation.deleteCategoryBySlug), WCController.deleteCategoryBySlug)



module.exports = router;