const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const { hardwareService } = require('../services');
const { arrayRes } = require('../utils/ArrayRes');



const createHardware = catchAsync(async(req, res) => {
    const HBody = req.body;
    const hardware = await hardwareService.createHardware(HBody);
    const result = await ApiSuccess(hardware, 'HardwareIsCreate', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});

const editHardware = catchAsync(async(req, res) => {
    const hid = req.params.hid;
    const editBody = req.body;
    const newhardware = await hardwareService.editHardware(hid, editBody);
    const result = await ApiSuccess(newhardware, 'HardwareIsEdit', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const getHardware = catchAsync(async(req, res) => {
    const hid = req.params.hid;
    const hardware = await hardwareService.getHardware(hid);
    const result = await ApiSuccess(hardware, 'getHardware', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const paginateHardware = catchAsync(async(req, res) => {
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const hardwares = await hardwareService.paginateHardware(options);
    const result = arrayRes(hardwares, options.limit, options.page, 'DevicePaginated', httpStatus.OK); 
    res.status(httpStatus.OK).send(result);
});

const deleteHardware = catchAsync(async(req, res) => {
    const hid = req.params.hid;
    await hardwareService.deleteHardware(hid);
    const result = await ApiSuccess('HardwareIsDelete', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

module.exports = { 
    createHardware,
    editHardware,
    getHardware,
    paginateHardware,
    deleteHardware
};