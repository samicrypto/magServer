const httpStatus = require('http-status');
const {  WarrantyHistory, Warranty } = require('../models');
const ApiError = require('../utils/ApiError');


const warrantyUsage = async(WHBody, warrantyId) => {

    const warrantyHistory = await WarrantyHistory.create({
        warrantyId: warrantyId,
        title: WHBody.title,
        description: WHBody.description,
        warrantyUsageDate: WHBody.warrantyUsageDate,
        deliveryDate: WHBody.deliveryDate,
        status: WHBody.status
    });
    return warrantyHistory;
};

const getWarrantyHistoryByWarrantyId = async(warrantyId) => {
  const list = await WarrantyHistory.find({ warrantyId: warrantyId });
  return list;
};

module.exports = {
    warrantyUsage,
    getWarrantyHistoryByWarrantyId
};