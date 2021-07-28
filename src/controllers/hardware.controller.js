const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const { hardwareService } = require('../services');


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
    const paginate = await hardwareService.paginateHardware();
    console.log('hardwares: ', paginate);
    // const result = await ApiSuccess(paginate, 'HardwarePaginated', httpStatus.OK);
    res.send(paginate)
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