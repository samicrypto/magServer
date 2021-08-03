const httpStatus = require('http-status');
const { Hardware } = require('../models');
const ApiError = require('../utils/ApiError');
const { slsp } = require('../utils/ArrayRes');




const createHardware = async(HBody) => {
    const hardware = await Hardware.create(HBody);
    return hardware;
};

const editHardware = async(tpid, editBody) => {
    await Hardware.updateOne({ _id: tpid }, { '$set': editBody }, { "new": true, "upsert": true });
    const hardware = await Hardware.findOne({ _id: tpid });
    return hardware;
};

const getHardware = async(tpid) => {
    const hardware = await Hardware.findOne({ _id: tpid });
    return hardware;
};

const paginateHardware = async(options) => {
    const {sort, limit, skip, page} = slsp(options);

    const hardwares = await Hardware.find()
    .sort(sort).skip(skip).limit(limit).exec()


    return hardwares;
};

const deleteHardware = async(tpid) => {
    await Hardware.deleteOne({ _id: tpid }, function(err) {});
};

const getHardwareBySerialNumber = async(serialNumber) => {
    const hardware = await Hardware.findOne({ serialNumber: serialNumber});
    if(!hardware) { throw new ApiError('Hardware with this SerialNumer is NotFounded', httpStatus.NOT_FOUND) };
    return hardware;
};

// const checkHardwareCapacity = async(serialNumber) => {
//     const hardware = await Hardware.findOne({ serialNumber: serialNumber });
// };

module.exports = {
    createHardware,
    editHardware,
    getHardware,
    paginateHardware,
    deleteHardware,
    getHardwareBySerialNumber
};