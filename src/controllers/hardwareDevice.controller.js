const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const { hardwareDeviceService } = require('../services');
const { arrayRes } = require('../utils/ArrayRes');


const createHardwareDevice = catchAsync(async(req, res) => {
    const HDBody = req.body;
    console.log(HDBody);
    const device = await hardwareDeviceService.createHardwareDevice(HDBody);
    const result = await ApiSuccess(device, 'DeviceIsSetOnHardware', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});

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
    const devices = await hardwareDeviceService.paginateHardwareDevice(options);
    const result = arrayRes(devices, options.limit, options.page, 'DevicePaginated', httpStatus.OK); 
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
    createHardwareDevice,
    editHardwareDevice,
    getHardwareDevice,
    paginateHardwareDevice,
    deleteHardwareDevice,
    setDeviceOnHardware
};