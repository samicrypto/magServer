const httpStatus = require('http-status');
const { Warranty, Hardware } = require('../models');
const ApiError = require('../utils/ApiError');


const createWarranty = async(WBody) => {
    const hardware = await Hardware.findOne({ serialNumber: WBody.hardwareSerialNumber });
    if(!hardware) { throw new ApiError( httpStatus.NOT_FOUND, 'HardwareNotFound') };

    var warranty = await Warranty.findOne({ deviceImei: WBody.deviceImei, hardwareSerialNumber: WBody.hardwareSerialNumber });
    if(warranty) { throw new ApiError( httpStatus.NOT_FOUND, 'WarrantyExist') };

    warranty = await Warranty.create({
        title: WBody.title,
        deviceImei: WBody.deviceImei,
        hardwareSerialNumber: WBody.hardwareSerialNumber,
        category: hardware.warrantyType,
        startDate: WBody.startDate,
        expireDate: WBody.expireDate
    });
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

    const warrantys = await Warranty.find();
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