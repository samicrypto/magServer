const httpStatus = require('http-status');
const { Device } = require('../models');
const ApiError = require('../utils/ApiError');
const hardwareDeviceService = require('./hardwareDevice.service');


const createDevice = async(DBody) => {
    const device = await Device.create(DBody);
    return device;
};

const editDevice = async(did, editBody) => {
    await Device.updateOne({ _id: did }, { '$set': editBody }, { "new": true, "upsert": true });
    const device = await Device.findOne({ _id: did });
    return device;
};

const getDevice = async(did) => {
    const device = await Device.findOne({ _id: did });
    if(!device) { throw new ApiError( httpStatus.NOT_FOUND, 'DeviceNotFounded') };
    return device;
};

const paginateDevice = async() => {

    const devices = await Device.find()

    return devices;

};

const deleteDevice = async(did) => {
    await Device.deleteOne({ _id: did }, function(err) {});
};


const createDeviceAndSetHardewareSerialNumber = async(deviceBody, hardwareSerialNUmber) => {
    let device = await Device.findOne({ imei: deviceBody.imei });
    if(!device) { device = await createDevice(deviceBody) };

    const result = await hardwareDeviceService.setDeviceOnHardware(device.imei, hardwareSerialNUmber);
    return result;
};

module.exports = {
    createDevice,
    editDevice,
    getDevice,
    paginateDevice,
    deleteDevice,
    createDeviceAndSetHardewareSerialNumber
};