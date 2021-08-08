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

const getHardwareDevice = async(imei, serialNumber) => {
    const hardwareDevice = await HardwareDevice.findOne({ deviceImei: imei, hardwareSerialNamber: serialNumber });
    if(!hardwareDevice) { throw new ApiError(httpStatus.NOT_FOUND, 'ItIsNotAnyConnectionBetweenThisHardwareAndThisDevice') };
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


const setDeviceOnHardware = async(imei, serialNumber) => {

//   Find Hardeware by serial number
  const hardware = await checkHardware(serialNumber);

//   Find device by imei number
  const device = await checkDevice(imei);

//   Check device is allready set on hardware or not
  await checkHardwareDevice(imei, serialNumber);

//   Check hardware capacity
  const hardwareCount = await HardwareDevice.find({ hardwareSerialNumber: serialNumber }).countDocuments();
  if(hardware.capacity <= hardwareCount) { throw new ApiError(httpStatus.BAD_REQUEST, "HardwareCapacityIsCompelet"); };

//   Create new connection betwwen device and hardware
  hardwareDevice = await HardwareDevice.create({ deviceImei: imei, hardwareSerialNumber: serialNumber });

  return hardwareDevice;

};

const checkHardware = async(serialNumber) => {
  const hardware = await Hardware.findOne({ serialNumber: serialNumber });
  if(!hardware) { throw new ApiError(httpStatus.NOT_FOUND, 'HardwareIsNotFounded') };

  return hardware;
};

const checkDevice = async(imei) => {
    const device = await Device.findOne({ imei: imei });
    if(!device) { throw new ApiError(httpStatus.NOT_FOUND, "DeviceIsNotFounded") }; 

    return device;
};

const checkHardwareDevice = async(imei, serialNumber) => {
    let hardwareDevice = await HardwareDevice.findOne({ deviceImei: imei, hardwareSerialNumber: serialNumber });
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