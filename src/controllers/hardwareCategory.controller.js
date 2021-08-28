const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const upload = require('../middlewares/uploadFile');
const HCService = require('../services/hardwareCategory.service');
const ApiSuccess = require('../utils/ApiSuccess');
const { slsp } = require('../utils/ArrayRes');
const { arrayRes } = require('../utils/ArrayRes');

const createTypeCategory = catchAsync(async(req, res) => {
    const categoryBody = req.body;
    const type = await HCService.createTypeCategory(categoryBody);
    const result = await ApiSuccess(type, 'TypeIsCreate', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});

const createBrandCategory = catchAsync(async(req, res) => {
    const typeSlug = req.params.typeSlug;
    const categoryBody = req.body;
    const type = await HCService.getCategoryBySlug(typeSlug);
    if(!type) { throw new ApiError(httpStatus.NOT_FOUND, 'CategoryNotFound'); };
    const brand = await HCService.createBrandCategory(categoryBody, type);
    const result = await ApiSuccess(brand, 'BrandIsCreate', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});

const createModelCategory = catchAsync(async(req, res) => {
  const brandSlug = req.params.brandSlug;
  const categoryBody = req.body;
  const brand = await HCService.getCategoryBySlug(brandSlug);
  if(!brand) { throw new ApiError(httpStatus.NOT_FOUND, 'CategoryNotFound'); };
  const model = await HCService.createModelCategory(categoryBody, brand);
  const result = await ApiSuccess(model, 'ModelIsCreate', httpStatus.CREATED);
  res.status(httpStatus.CREATED).send(result);
});

const getTypeCategory = catchAsync(async(req,res) => {
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const {sort, limit, skip, page} = slsp(options);
    const types = await HCService.getTypeCategory();
    const result = arrayRes(types, limit, page, 'TypePaginated', httpStatus.OK); 
    res.status(httpStatus.OK).send(result);
});

const getBrandCategory = catchAsync(async(req,res) => {
    const typeSlug = req.params.typeSlug;
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const {sort, limit, skip, page} = slsp(options);
    const brands = await HCService.getBrandCategory(typeSlug);
    const result = arrayRes(brands, limit, page, 'BrandPaginated', httpStatus.OK); 
    res.status(httpStatus.OK).send(result);
});

const getModelCategory = catchAsync(async(req,res) => {
  const brandSlug = req.params.brandSlug;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const {sort, limit, skip, page} = slsp(options);
  const models = await HCService.getModelCategory(brandSlug);
  const result = arrayRes(models, limit, page, 'ModelPaginated', httpStatus.OK); 
  res.status(httpStatus.OK).send(result);
});

const getCategoryBySlug = catchAsync(async(req,res) => {
    const slug = req.params.slug;
    const category = await HCService.getCategoryBySlug(slug);
    const result = await ApiSuccess(category, 'getCategory', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const deleteCategoryBySlug = catchAsync(async(req, res) => {
    const slug = req.params.slug;
    const deleteCategory = await HCService.deleteCategoryBySlug(slug);
    res.status(httpStatus.OK).send(deleteCategory);
});

const editCategoryById = catchAsync(async(req, res) => {
    const categoryId = req.params.cid;
    const result = await HCService.editCategoryById(categoryId);
    // const result = await ApiSuccess(category, 'updateCategory', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

module.exports = {
    createTypeCategory,
    createBrandCategory,
    createModelCategory,
    getTypeCategory,
    getBrandCategory,
    getModelCategory,
    getCategoryBySlug,
    deleteCategoryBySlug,
    editCategoryById
};