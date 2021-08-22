const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const upload = require('../middlewares/uploadFile');
const WCService = require('../services/warrantyCategory.service');
const ApiSuccess = require('../utils/ApiSuccess');
const { slsp } = require('../utils/ArrayRes');
const { arrayRes } = require('../utils/ArrayRes');

const createWarrantyCategory = catchAsync(async(req, res) => {
    const categoryBody = req.body;
    const type = await WCService.createWarrantyCategory(categoryBody);
    const result = await ApiSuccess(type, 'CategoryIsCreate', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});


const getWarrantyCategory = catchAsync(async(req,res) => {
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const {sort, limit, skip, page} = slsp(options);
    const categories = await WCService.getWarrantyCategory();
    const result = arrayRes(categories, limit, page, 'CategoryPaginated', httpStatus.OK); 
    res.status(httpStatus.OK).send(result);
});


const getCategoryBySlug = catchAsync(async(req,res) => {
    const slug = req.params.slug;
    const category = await WCService.getCategoryBySlug(slug);
    const result = await ApiSuccess(category, 'getCategory', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const editCategoryById = catchAsync(async(req, res) => {
  const categoryId = req.params.cid;
  const editBody = req.body;
  const category = await WCService.editCategoryById(categoryId, editBody);
  const result = await ApiSuccess(category, 'updateCategory', httpStatus.OK);
  res.status(httpStatus.OK).send(result);
});

const deleteCategoryBySlug = catchAsync(async(req, res) => {
    const slug = req.params.slug;
    const deleteCategory = await WCService.deleteCategoryBySlug(slug);
    res.status(httpStatus.OK).send(deleteCategory);
});


module.exports = {
    createWarrantyCategory,
    getWarrantyCategory,
    getCategoryBySlug,
    editCategoryById,
    deleteCategoryBySlug
};