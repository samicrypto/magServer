const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const { deviceService } = require('../services');
const { slsp } = require('../utils/ArrayRes');
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
    const filter = pick(req.query, ['name', 'regDate']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const {sort, limit, skip, page} = slsp(options);
    const devices = await deviceService.paginateDevice(options);
    const result = arrayRes(devices, limit, page, 'DevicePaginated', httpStatus.OK); 
    res.status(httpStatus.OK).send(result)
});

const deleteDevice = catchAsync(async(req, res) => {
    const did = req.params.did;
    await deviceService.deleteDevice(did);
    const result = await ApiSuccess('DeviceIsDelete', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const createDeviceAndSetHardewareSerialNumber = catchAsync(async(req, res) => {
    const deviceBody = req.body;
    const hardwareSerialNUmber = req.params.hsn;
    const setResult = await deviceService.createDeviceAndSetHardewareSerialNumber(deviceBody, hardwareSerialNUmber);
    const result = await ApiSuccess(setResult, 'createAndSetDeviceSuccessfuly', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const restDevice = catchAsync(async(req, res) => {
    const deviceIDsList = req.body.deviceIDsList;
    console.log(deviceIDsList);
    await deviceService.restDevice(deviceIDsList);
    const result = await ApiSuccess('DeviceIsDelete', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const searchDevice = catchAsync(async(req, res) => {
    const searchText = req.body.searchText;
    const devices = await deviceService.searchDevice(searchText);
    res.status(httpStatus.OK).send(devices);
});


module.exports = { 
    createDevice,
    editDevice,
    getDevice,
    paginateDevice,
    deleteDevice,
    createDeviceAndSetHardewareSerialNumber,
    restDevice,
    searchDevice
};