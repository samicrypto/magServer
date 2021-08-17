const httpStatus = require('http-status');
const { HardwareCategory } = require('../models');
const ApiError = require('../utils/ApiError');

const createTypeCategory = async(typeBody) => {
    if (await HardwareCategory.isCategorySlugTaken(typeBody.slug)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'CategoryAlreadyTaken');
    };
    const typeCategory = await HardwareCategory.create({
        title: typeBody.title,
        slug: typeBody.slug,
        category: `/${typeBody.slug}`,
        parent: `/`,
    });
    
    return typeCategory;
};

const createBrandCategory = async(brandBody, type) => {
    if (await HardwareCategory.isCategorySlugTaken(brandBody.slug)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'CategoryAlreadyTaken');
    };
    const toutrial = await HardwareCategory.create({
        title: brandBody.title,
        slug: brandBody.slug,
        category: `${type.category}/${brandBody.slug}`,
        parent: `${type.category}`,
    });
    
    return toutrial;
};

const createModelCategory = async(modelBody, brand) => {
  if (await HardwareCategory.isCategorySlugTaken(modelBody.slug)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'CategoryAlreadyTaken');
  };
  const toutrial = await HardwareCategory.create({
      title: modelBody.title,
      slug: modelBody.slug,
      category: `${brand.category}/${modelBody.slug}`,
      parent: `${brand.category}`,
  });
  
  return toutrial;
};

const getTypeCategory = async() => {
    const typeCategory = await HardwareCategory.find({ parent: '/' });
    return typeCategory;
};

const getBrandCategory = async(typeSlug) => {
    const type = await HardwareCategory.findOne({ slug: typeSlug });
    const brands = await HardwareCategory.find({ parent: { $in: [new RegExp('^' + type.category)] } });
    return brands;
};

const getModelCategory = async(brandSlug) => {
  const brand = await HardwareCategory.findOne({ slug: brandSlug });
  const brands = await HardwareCategory.find({ parent: { $in: [new RegExp('^' + brand.category)] } });
  return brands;
};

const getCategoryBySlug = async(categorySlug) => {
    const category = await HardwareCategory.findOne({ slug: categorySlug });
    if(!category) { throw new ApiError(httpStatus.NOT_FOUND, 'CategoryNotFound') };
    return category;
};

const deleteCategoryBySlug = async(slug) => {
    const category = await HardwareCategory.findOne({ slug: slug });
    if(!category) { throw new ApiError(httpStatus.NOT_FOUND, "HardwareCategoryNotFounded")}
    const deleteCategory = await HardwareCategory.deleteMany({ "$and": [ { category: { $in: [new RegExp('^' + tutorial.category)] } }, { parent: { $in: [new RegExp('^' + tutorial.category)] } }]});
    return deleteCategory;
};  


module.exports = {
    createTypeCategory,
    createBrandCategory,
    createModelCategory,
    getTypeCategory,
    getBrandCategory,
    getModelCategory,
    getCategoryBySlug,
    deleteCategoryBySlug,
};