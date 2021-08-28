const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const { warrantyHistoryService } = require('../services');
const { slsp } = require('../utils/ArrayRes');
const { arrayRes } = require('../utils/ArrayRes');
const { WarrantyHistory } = require('../models');


const warrantyUsage = catchAsync(async(req, res) => {
    const WHBody = req.body;
    const warrantyID = req.params.wid;
    console.log(WHBody);
    const warrantyHistory = await warrantyHistoryService.warrantyUsage(WHBody, warrantyID);
    const result = await ApiSuccess(warrantyHistory, 'WarrantyHistoryIsCreate', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});


const getWarrantyHistoryByWarrantyID = catchAsync(async(req, res) => {
    const wid = req.params.wid;
    const warrantyHistory = await warrantyHistoryService.getWarrantyHistoryByWarrantyID(wid);
    const result = await ApiSuccess(warrantyHistory, 'getWarrantywarrantyHistory', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const paginateWarranty = catchAsync(async(req, res) => {
    const filter = pick(req.query, ['name', 'regDate']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const {sort, limit, skip, page} = slsp(options);
    const warrantys = await warrantyHistoryService.paginateWarranty(options);
    const result = arrayRes(warrantys, limit, page, 'WarrantyPaginated', httpStatus.OK); 
    res.status(httpStatus.OK).send(result)
});

const deleteWarranty = catchAsync(async(req, res) => {
    const did = req.params.did;
    await warrantyHistoryService.deleteWarranty(did);
    const result = await ApiSuccess('WarrantyIsDelete', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const warrantyRemainingTime = catchAsync(async(req, res) => {
    const hardwareId = req.params.hid;
    const remainingTime = await warrantyHistoryService.warrantyRemainingTime(hardwareId);
    const result = await ApiSuccess(remainingTime, 'remainingTime', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

module.exports = { 
    warrantyUsage,
    getWarrantyHistoryByWarrantyID,
    paginateWarranty,
    deleteWarranty,
    warrantyRemainingTime
};