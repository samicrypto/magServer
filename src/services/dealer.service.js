const httpStatus = require('http-status');
const { Dealer } = require('../models');
const ApiError = require('../utils/ApiError');



const createDealer = async(DBody) => {
    const dealer = await Dealer.create(DBody);
    return dealer;
};

const editDealer = async(did, editBody) => {
    await Dealer.updateOne({ _id: did }, { '$set': editBody }, { "new": true, "upsert": true });
    const dealer = await Dealer.findOne({ _id: did });
    return dealer;
};

const getDealer = async(did) => {
    const dealer = await Dealer.findOne({ _id: did });
    if(!dealer) { throw new ApiError( httpStatus.NOT_FOUND, 'DeviceNotFounded') };
    return dealer;
};

const paginateDealer = async() => {

    const dealers = await Dealer.find()
    return dealers;

};

const deleteDealer = async(did) => {
    await Dealer.deleteOne({ _id: did }, function(err) {});
};



module.exports = {
    createDealer,
    editDealer,
    getDealer,
    paginateDealer,
    deleteDealer,
};