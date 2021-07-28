const httpStatus = require('http-status');
const { Device } = require('../models');
const ApiError = require('../utils/ApiError');
const { slsp } = require('../utils/ArrayRes');



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

module.exports = {
    createDevice,
    editDevice,
    getDevice,
    paginateDevice,
    deleteDevice
};