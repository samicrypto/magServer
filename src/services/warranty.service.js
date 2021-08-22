const httpStatus = require('http-status');
const { Warranty } = require('../models');
const ApiError = require('../utils/ApiError');


const createWarranty = async(WBody) => {
    const warranty = await Warranty.create(WBody);
    return warranty;
};

const editWarranty = async(wid, editBody) => {
    await Warranty.updateOne({ _id: wid }, { '$set': editBody }, { "new": true, "upsert": true });
    const warranty = await Warranty.findOne({ _id: wid });
    return warranty;
};

const getWarranty = async(wid) => {
    const warranty = await Warranty.findOne({ _id: wid });
    if(!warranty) { throw new ApiError( httpStatus.NOT_FOUND, 'WarrantyNotFounded') };
    return warranty;
};

const paginateWarranty = async() => {

    const warrantys = await Warranty.find()

    return warrantys;

};

const deleteWarranty = async(wid) => {
    await Warranty.deleteOne({ _id: wid }, function(err) {});
};



module.exports = {
    createWarranty,
    editWarranty,
    getWarranty,
    paginateWarranty,
    deleteWarranty
};