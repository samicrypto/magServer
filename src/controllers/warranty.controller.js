const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const { warrantyService, warrantyCategoryService, hardwareService } = require('../services');
const { slsp } = require('../utils/ArrayRes');
const { arrayRes } = require('../utils/ArrayRes');
const { Hardware } = require('../models');


const createWarranty = catchAsync(async(req, res) => {
    const WBody = req.body;
    const warranty = await warrantyService.createWarranty(WBody);
    const result = await ApiSuccess(warranty, 'WarrantyIsCreate', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});

const editWarranty = catchAsync(async(req, res) => {
    const wid = req.params.wid;
    const editBody = req.body;
    const newWarranty = await warrantyService.editWarranty(wid, editBody);
    const result = await ApiSuccess(newWarranty, 'WarrantyIsEdit', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const getWarranty = catchAsync(async(req, res) => {
    const wid = req.params.wid;
    const warranty = await warrantyService.getWarranty(wid);
    const result = await ApiSuccess(warranty, 'getWarranty', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const paginateWarranty = catchAsync(async(req, res) => {
    const filter = pick(req.query, ['name', 'regDate']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const {sort, limit, skip, page} = slsp(options);
    const warrantys = await warrantyService.paginateWarranty(options);
    const result = arrayRes(warrantys, limit, page, 'WarrantyPaginated', httpStatus.OK); 
    res.status(httpStatus.OK).send(result)
});

const deleteWarranty = catchAsync(async(req, res) => {
    const wid = req.params.wid;
    await warrantyService.deleteWarranty(wid);
    const result = await ApiSuccess('WarrantyIsDelete', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const warrantyRemainingTime = catchAsync(async(req, res) => {
    const hardwareID = req.params.hid;
    const remainingTime = await warrantyService.warrantyRemainingTime(hardwareID);
    const result = await ApiSuccess(remainingTime, 'remainingTime', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

module.exports = { 
    createWarranty,
    editWarranty,
    getWarranty,
    paginateWarranty,
    deleteWarranty,
    warrantyRemainingTime
};