const httpStatus = require('http-status');
const { HardwareCategory } = require('../models');
const Hardware = require('../models/hardware.model');
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
    // const brands = await HardwareCategory.find({ parent: { $in: [new RegExp('^' + type.category)] } });
    const brands = await HardwareCategory.find({ parent: type.category });
    return brands;
};

const getModelCategory = async(brandSlug) => {
  const brand = await HardwareCategory.findOne({ slug: brandSlug });
  if(!brand) { throw new ApiError(httpStatus.BAD_REQUEST, 'CategoryAlreadyTaken'); }
  // const brands = await HardwareCategory.find({ parent: { $in: [new RegExp('^' + brand.category)] } });
  const brands = await HardwareCategory.find({ parent: brand.category });
  return brands;
};

const getCategoryBySlug = async(categorySlug) => {
    const category = await HardwareCategory.findOne({ slug: categorySlug });
    if(!category) { throw new ApiError(httpStatus.NOT_FOUND, 'CategoryNotFound') };
    return category;
};

const getCategoryByID = async(categoryID) => {
    const category = await HardwareCategory.findOne({ _id: categoryID });
    if(!category) { throw new ApiError(httpStatus.NOT_FOUND, 'CategoryNotFound') };
    return category;
};

const deleteCategoryBySlug = async(slug) => {
    const category = await HardwareCategory.find({  });
};  


const editCategorySlugById = async(cid, newSlug) => {
    const targetCategory = await HardwareCategory.findOne({ _id: cid });
    const list = await HardwareCategory.find({ category: { $in: [new RegExp(`${targetCategory.slug}`)] } });
    list.forEach(async(doc) => { 
        const newCategory = doc.category.replace(`${targetCategory.slug}`, newSlug)
        const newParent = doc.parent.replace(`${targetCategory.slug}`, newSlug)

        await HardwareCategory.updateOne({ _id: doc._id }, { '$set': {
            "category": newCategory,
            "parent": newParent 
        } }, { "new": true, "upsert": true })
    });
    await HardwareCategory.updateOne({ _id: cid }, { '$set': {
        "slug": newSlug,
    } }, { "new": true, "upsert": true })
    const newList = await HardwareCategory.find({ category: { $in: [new RegExp(`${newSlug}`)] } });
    return newList;
};

const editCategoryTitleByID = async(cid, newTitle) => {
    const newCategory = await HardwareCategory.findOneAndUpdate({ _id: cid }, { '$set': {
        "title": newTitle,
    } }, { "new": true, "upsert": true })

    return newCategory;
};

module.exports = {
    createTypeCategory,
    createBrandCategory,
    createModelCategory,
    getTypeCategory,
    getBrandCategory,
    getModelCategory,
    getCategoryBySlug,
    getCategoryByID,
    deleteCategoryBySlug,
    editCategorySlugById,
    editCategoryTitleByID
};