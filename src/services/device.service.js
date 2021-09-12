const httpStatus = require('http-status');
const { Device, HardwareDevice, WarrantyHistory } = require('../models');
const ApiError = require('../utils/ApiError');
const hardwareDeviceService = require('./hardwareDevice.service');
const logger = require('../config/logger');


const { Client } = require('@elastic/elasticsearch');
const client = new Client({ 
    node: 'http://localhost:9200',

    auth: {
        username: 'elastic',
        password: 'changeme'
    }
});
 
// var elasticsearch = require('elasticsearch');
// var client = new elasticsearch.Client({
//   host: 'localhost:9200',
// //   log: 'trace',
//   apiVersion: '7.2', // use the same version of your Elasticsearch instance
// });

// // client.ping({
// //     // ping usually has a 3000ms timeout
// //     requestTimeout: 1000
// //   }, function (error) {
// //     if (error) {
// //       console.trace('elasticsearch cluster is down!');
// //     } else {
// //       logger.info('All is well');
// //     }
// //   });

const createDevice = async(DBody) => {
    try {

        const device = await Device.create(DBody);    
        await client.index({
            index: 'device',
            body:{
                id: device._id,
                name: device.name,
                imei: device.imei
            }
        }); 
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
    const result = await client.search({
        index: 'device',
        body: {
          query: {
            match: { name: 'samsung' }
          }
        }
      });
    let res;
    const lists = result.body.hits.hits;
    const ress = lists.forEach((list) => {
      console.log(list._source);
    });
    console.log('Result: ', ress);


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