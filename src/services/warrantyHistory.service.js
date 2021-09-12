const httpStatus = require('http-status');
const {  WarrantyHistory, Warranty } = require('../models');
const ApiError = require('../utils/ApiError');


const warrantyUsage = async(WHBody, warrantyID) => {

    const warrantyHistory = await WarrantyHistory.create({
        warrantyID: warrantyID,
        title: WHBody.title,
        deviceID: WHBody.deviceID,
        description: WHBody.description,
        warrantyUsageDate: WHBody.warrantyUsageDate,
        deliveryDate: WHBody.deliveryDate,
        status: WHBody.status
    });
    return warrantyHistory;
};

const getWarrantyHistoryByWarrantyID = async(warrantyID) => {
  const list = await WarrantyHistory.find({ warrantyID: warrantyID });
  return list;
};

module.exports = {
    warrantyUsage,
    getWarrantyHistoryByWarrantyID
};