const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const { warrantyService } = require('../services');
const { slsp } = require('../utils/ArrayRes');
const { arrayRes } = require('../utils/ArrayRes');


const createWarranty = catchAsync(async(req, res) => {
    const WBody = req.body;
    const device = await warrantyService.createWarranty(WBody);
    const result = await ApiSuccess(device, 'DeviceIsCreate', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});

const editWarranty = catchAsync(async(req, res) => {
    const did = req.params.did;
    const editBody = req.body;
    const newdevice = await warrantyService.editWarranty(did, editBody);
    const result = await ApiSuccess(newdevice, 'deviceIsEdit', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const getWarranty = catchAsync(async(req, res) => {
    const did = req.params.did;
    const device = await warrantyService.getWarranty(did);
    const result = await ApiSuccess(device, 'getWarranty', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const paginateWarranty = catchAsync(async(req, res) => {
    const filter = pick(req.query, ['name', 'regDate']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const {sort, limit, skip, page} = slsp(options);
    const devices = await warrantyService.paginateWarranty(options);
    const result = arrayRes(devices, limit, page, 'DevicePaginated', httpStatus.OK); 
    res.status(httpStatus.OK).send(result)
});

const deleteWarranty = catchAsync(async(req, res) => {
    const did = req.params.did;
    await warrantyService.deleteWarranty(did);
    const result = await ApiSuccess('DeviceIsDelete', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});



module.exports = { 
    createWarranty,
    editWarranty,
    getWarranty,
    paginateWarranty,
    deleteWarranty,
};