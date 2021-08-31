const httpStatus = require('http-status');
const { Device, HardwareDevice, WarrantyHistory } = require('../models');
const ApiError = require('../utils/ApiError');
const hardwareDeviceService = require('./hardwareDevice.service');


const createDevice = async(DBody) => {
    try {
        const device = await Device.create(DBody);
        return device;
    } catch (error) {
        if(error.message.indexOf("11000") != -1) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'ThisDeviceIsAlreadyRegister');
        }
    }
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

const restDevice = async(deviceIDsList) => {

    deviceIDsList.forEach(async(deviceID) => {
        const restDevice = await Device.deleteMany({ _id:{ '$in': deviceID }  });
        await HardwareDevice.deleteMany({ deviceID: { '$in': deviceID }});
        await WarrantyHistory.deleteMany({ deviceID: { '$in': deviceID }});
    });
    return restDevice;

};


const searchDevice = async(searchText) => {
    const globalSearch = { '$text': { '$search': searchText } };
    // const querySearch = 
    // const devices = await Device.find({'$text': { '$search': searchText } });
    // const devices = await Device.searchQuery('samsung')
    // const devices = await Device.fuzzySearch('samsung', { name: 'samsung' })
    return devices;
};

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