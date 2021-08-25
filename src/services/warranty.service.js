const httpStatus = require('http-status');
const { Warranty, Hardware, WarrantyHistory } = require('../models');
const ApiError = require('../utils/ApiError');
const ms = require('ms');

const createWarranty = async(WBody) => {
    const hardware = await Hardware.findOne({ _id: WBody.hardwareId });
    if(!hardware) { throw new ApiError( httpStatus.NOT_FOUND, 'HardwareNotFound') };

    var warranty = await Warranty.findOne({ hardwareId: WBody.hardwareId });
    if(warranty) { throw new ApiError( httpStatus.NOT_FOUND, 'WarrantyExist') };

    warranty = await Warranty.create({
        title: WBody.title,
        hardwareId: WBody.hardwareId,
        category: hardware.warrantyType,
        startDate: WBody.startDate,
        expireDate: WBody.expireDate
    });

    return warranty;
};

const editWarranty = async(wid, editBody) => {
    const warranty =  await Warranty.findOneAndUpdate({ _id: wid }, { '$set': editBody }, { "new": true, "upsert": true });
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
    await WarrantyHistory.deleteMany({warrantyId: { "$in": wid }});
    await Warranty.deleteOne({ _id: wid }, function(err) {});
};


const warrantyRemainingTime = async(hardwareId) => {
    const warravty = await Warranty.findOne({ hardwareId: hardwareId });
    const curentTime = new Date().getTime();
    const remainingTimeByMS = warravty.expireDate - curentTime;
    if(remainingTimeByMS <= 0) {
        return 'warranty is expire'
    }
    const remainingTimeByMinut = ms(remainingTimeByMS, { long: true });
    return { remainingTime : remainingTimeByMinut };

};


module.exports = {
    createWarranty,
    editWarranty,
    getWarranty,
    paginateWarranty,
    deleteWarranty,
    warrantyRemainingTime
};