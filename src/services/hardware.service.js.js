const httpStatus = require('http-status');
const { Hardware } = require('../models');
const ApiError = require('../utils/ApiError');



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

const paginateHardware = async() => {
    const hardwares = await Hardware.find();
    return hardwares;
};

const deleteHardware = async(tpid) => {
    await Hardware.deleteOne({ _id: tpid }, function(err) {});
};

module.exports = {
    createHardware,
    editHardware,
    getHardware,
    paginateHardware,
    deleteHardware
};