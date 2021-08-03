const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const { deviceService } = require('../services');
const { arrayRes } = require('../utils/ArrayRes');


const createDevice = catchAsync(async(req, res) => {
    const DBody = req.body;
    const device = await deviceService.createDevice(DBody);
    const result = await ApiSuccess(device, 'DeviceIsCreate', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});

const editDevice = catchAsync(async(req, res) => {
    const did = req.params.did;
    const editBody = req.body;
    const newdevice = await deviceService.editDevice(did, editBody);
    const result = await ApiSuccess(newdevice, 'deviceIsEdit', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const getDevice = catchAsync(async(req, res) => {
    const did = req.params.did;
    const device = await deviceService.getDevice(did);
    const result = await ApiSuccess(device, 'getDevice', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const paginateDevice = catchAsync(async(req, res) => {
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const devices = await deviceService.paginateDevice(options);
    const result = arrayRes(devices, options.limit, options.page, 'DevicePaginated', httpStatus.OK); 
    res.status(httpStatus.OK).send(result)
});

const deleteDevice = catchAsync(async(req, res) => {
    const did = req.params.did;
    await deviceService.deleteDevice(did);
    const result = await ApiSuccess('DeviceIsDelete', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const setDeviceOnHardware = catchAsync(async(req, res) => {
    const deviceId = req.params.did;
    const hardwareSerialNumber = req.body.hardwareSerialNumber;
    const device = await deviceService.setDeviceOnHardware(deviceId, hardwareSerialNumber);
    const result = await ApiSuccess(device, 'DeviceIsSetOnHardware', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

module.exports = { 
    createDevice,
    editDevice,
    getDevice,
    paginateDevice,
    deleteDevice,
    setDeviceOnHardware
};