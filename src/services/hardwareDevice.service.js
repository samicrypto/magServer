const httpStatus = require('http-status');
const { HardwareDevice, Hardware, Device } = require('../models');
const ApiError = require('../utils/ApiError');
const { slsp } = require('../utils/ArrayRes');



const editHardwareDevice = async(hdid, editBody) => {
    //   Find Hardeware by serial number
    await checkHardware(editBody.hardwareSerialNumber);

    //   Find device by imei number
    await checkDevice(editBody.deviceImei);

    //   Check device is allready set on hardware or not
    await checkHardwareDevice(editBody.deviceImei, editBody.hardwareSerialNumber);

    const hardwareDevice = await HardwareDevice.findOneAndUpdate({ _id: hdid }, { '$set': editBody }, { "new": true, "upsert": true });
    return hardwareDevice;
};

const getHardwareDevice = async(hdid) => {
    const hardwareDevice = await HardwareDevice.findOne({ _id: hdid });
    if(!hardwareDevice) { throw new ApiError(httpStatus.NOT_FOUND, 'ThisHardwareDeviceIsNotFound') };
    return hardwareDevice;
};

const paginateHardwareDevice = async(options) => {
    const {sort, limit, skip, page} = slsp(options);

    const hardwareDevices = await HardwareDevice.find()
    .sort(sort).skip(skip).limit(limit).exec()


    return hardwareDevices;
};

const deleteHardwareDevice = async(hdid) => {
    await HardwareDevice.deleteOne({ _id: hdid }, function(err) {});
};


const setDeviceOnHardware = async(deviceID, hardwareID) => {

//   Find Hardeware by serial number
  const hardware = await checkHardware(hardwareID);

//   Find device by imei number
  const device = await checkDevice(deviceID);

//   Check device is allready set on hardware or not
  await checkHardwareDevice(deviceID, hardwareID);

if(hardware.diactive === true) { throw new ApiError(httpStatus.BAD_REQUEST, "ThisHardwareIsBlock"); }  
//   Check hardware capacity
  const hardwareCount = await HardwareDevice.find({ hardwareID: hardwareID }).countDocuments();
  if(hardware.capacity <= hardwareCount) { throw new ApiError(httpStatus.BAD_REQUEST, "HardwareCapacityIsCompelet"); };

//   Create new connection betwwen device and hardware
  hardwareDevice = await HardwareDevice.create({ deviceID: deviceID, hardwareID: hardwareID });

  return hardwareDevice;

};

const checkHardware = async(id) => {
  const hardware = await Hardware.findOne({ _id: id });
  if(!hardware) { throw new ApiError(httpStatus.NOT_FOUND, 'HardwareIsNotFounded') };

  return hardware;
};

const checkDevice = async(id) => {
    const device = await Device.findOne({ _id: id });
    if(!device) { throw new ApiError(httpStatus.NOT_FOUND, "DeviceIsNotFounded") }; 

    return device;
};

const checkHardwareDevice = async(deviceID, hardwareID) => {
    let hardwareDevice = await HardwareDevice.findOne({ deviceID: deviceID, hardwareID: hardwareID });
    if(hardwareDevice) { throw new ApiError(httpStatus.BAD_REQUEST, "ThisDeviceIsAlreadyConnectToThisHardware"); };  

    return hardwareDevice;
};

module.exports = {
    editHardwareDevice,
    getHardwareDevice,
    paginateHardwareDevice,
    deleteHardwareDevice,
    setDeviceOnHardware,
};