const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const { hardwareDeviceService } = require('../services');
const { slsp } = require('../utils/ArrayRes');
const { arrayRes } = require('../utils/ArrayRes');


const editHardwareDevice = catchAsync(async(req, res) => {
    const hdid = req.params.hdid;
    const editBody = req.body;
    const newdevice = await hardwareDeviceService.editHardwareDevice(hdid, editBody);
    const result = await ApiSuccess(newdevice, 'hardwareDeviceIsEdit', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const getHardwareDevice = catchAsync(async(req, res) => {
    const hdid = req.params.hdid;
    const device = await hardwareDeviceService.getHardwareDevice(hdid);
    const result = await ApiSuccess(device, 'getHardwareDevice', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const paginateHardwareDevice = catchAsync(async(req, res) => {
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const {sort, limit, skip, page} = slsp(options);
    const devices = await hardwareDeviceService.paginateHardwareDevice(options);
    const result = arrayRes(devices, limit, page, 'DevicePaginated', httpStatus.OK); 
    res.status(httpStatus.OK).send(result)
});

const deleteHardwareDevice = catchAsync(async(req, res) => {
    const hdid = req.params.hdid;
    await hardwareDeviceService.deleteHardwareDevice(hdid);
    const result = await ApiSuccess('DeviceIsDelete', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const setDeviceOnHardware = catchAsync(async(req, res) => {
    const deviceImei = req.body.deviceImei;
    const hardwareSerialNumber = req.body.hardwareSerialNumber;
    const device = await hardwareDeviceService.setDeviceOnHardware(deviceImei, hardwareSerialNumber);
    const result = await ApiSuccess(device, 'DeviceIsSetOnHardware', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

module.exports = { 
    editHardwareDevice,
    getHardwareDevice,
    paginateHardwareDevice,
    deleteHardwareDevice,
    setDeviceOnHardware
};