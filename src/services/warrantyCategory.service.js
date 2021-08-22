const httpStatus = require('http-status');
const { WarrantyCategory } = require('../models');
const ApiError = require('../utils/ApiError');

const createWarrantyCategory = async(Body) => {
    if (await WarrantyCategory.isCategorySlugTaken(Body.slug)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'CategoryAlreadyTaken');
    };
    const warrantyCategory = await WarrantyCategory.create({
        title: Body.title,
        slug: Body.slug,
        category: `/${Body.slug}`,
        parent: `/`,
    });
    
    return warrantyCategory;
};

const getWarrantyCategory = async() => {
    const warrantyCategory = await WarrantyCategory.find({ parent: '/' });
    return warrantyCategory;
};


const getCategoryBySlug = async(categorySlug) => {
    const category = await WarrantyCategory.findOne({ slug: categorySlug });
    if(!category) { throw new ApiError(httpStatus.NOT_FOUND, 'CategoryNotFound') };
    return category;
};


const editCategoryById = async(cid, editBody) => {
  const newCategory = await WarrantyCategory.findOneAndUpdate({ _id: cid }, { '$set': editBody }, { "new": true, "upsert": true });
  return newCategory;
  
};

const deleteCategoryBySlug = async(slug) => {
    const category = await WarrantyCategory.findOne({ slug: slug });
    if(!category) { throw new ApiError(httpStatus.NOT_FOUND, "WarrantyCategoryNotFounded")}
    const deleteCategory = await WarrantyCategory.deleteMany({ "$and": [ { category: { $in: [new RegExp('^' + tutorial.category)] } }, { parent: { $in: [new RegExp('^' + tutorial.category)] } }]});
    return deleteCategory;
};  


module.exports = {
    createWarrantyCategory,
    getWarrantyCategory,
    getCategoryBySlug,
    editCategoryById,
    deleteCategoryBySlug,
};