const express = require('express');
const auth = require('../middlewares/auth');
const { scope } = require('../config/roles');
const validate = require('../middlewares/validate');
const HCController = require('../controllers/hardwareCategory.controller');
const HClValidation = require("../validations/hardwareCategory.validation");


const router = express.Router();

router
    .route('/create-type')
        .post(validate(HClValidation.createTypeCategory),  HCController.createTypeCategory)

router
    .route('/create-brand/:typeSlug')
        .post(validate(HClValidation.createBrandCategory), HCController.createBrandCategory)

router
    .route('/create-model/:brandSlug')
        .post(validate(HClValidation.createModelCategory), HCController.createModelCategory)

router
    .route('/type-category')
        .get(HCController.getTypeCategory)

router
    .route('/brand-category/:typeSlug')
        .get(validate(HClValidation.getBrandCategory), HCController.getBrandCategory)

router
    .route('/model-category/:brandSlug')
        .get(validate(HClValidation.getModelCategory), HCController.getModelCategory)

router
    .route('/:slug')
        .get(validate(HClValidation.getCategoryBySlug), HCController.getCategoryBySlug)

router
    .route('/delete/:slug')
        .delete(validate(HClValidation.deleteCategoryBySlug), HCController.deleteCategoryBySlug)

router
    .route('/edit-slug/:cid')
        .put(HCController.editCategorySlugById)

router
    .route('/edit-title/:cid')
        .put(HCController.editCategoryTitleByID)

module.exports = router;