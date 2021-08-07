const httpStatus = require('http-status');
const { Device, Hardware, HardwareDevice } = require('../models');
const ApiError = require('../utils/ApiError');
const { slsp } = require('../utils/ArrayRes');
const { hardwareService } = require('./index');


const createDevice = async(HBody) => {
    const device = await Device.create(HBody);
    return device;
};

const editDevice = async(did, editBody) => {
    await Device.updateOne({ _id: did }, { '$set': editBody }, { "new": true, "upsert": true });
    const device = await Device.findOne({ _id: did });
    return device;
};

const getDevice = async(did) => {
    const device = await Device.findOne({ _id: did });
    return device;
};

const paginateDevice = async(options) => {

    const {sort, limit, skip, page} = slsp(options);

    const devices = await Device.find()
    .sort(sort).skip(skip).limit(limit).exec()

    return devices;

};

const deleteDevice = async(did) => {
    await Device.deleteOne({ _id: did }, function(err) {});
};


const setDeviceOnHardware = async(imei, serialNumber) => {
    const hardwareDevice = await HardwareDevice.findOne({ deviceImei: imei, hardwareSerialNamber: serialNumber });
    const hardware = await hardwareService.getHardwareBySerialNumber(hardwareSerialNumber);
    if(hardware.capacity <= hardware.conectedDevice) {
        throw new ApiError("HardwareCapacityIsCompelt", httpStatus.LOCKED);
    };

    await Device.updateOne({ _id: deviceId }, { '$set': {
        "hardwareSerialNamber": hardwareSerialNumber
    } 
  }, { "new": true, "upsert": true });

  const device = await getDevice(deviceId);
  return device;
};

module.exports = {
    createDevice,
    editDevice,
    getDevice,
    paginateDevice,
    deleteDevice,
    setDeviceOnHardware
};