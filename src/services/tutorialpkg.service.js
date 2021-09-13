const httpStatus = require('http-status');
const { Tutorialpkg } = require('../models');
const ApiError = require('../utils/ApiError');



const createTPkg = async(TPkgBody) => {
    const TPkg = await Tutorialpkg.create(TPkgBody);
    return TPkg;
};

const editTPkg = async(tpid, editBody) => {
    await Tutorialpkg.updateOne({ _id: tpid }, { '$set': editBody }, { "new": true, "upsert": true });
    const tpkg = await Tutorialpkg.findOne({ _id: tpid });
    return tpkg;
};

const getTpkg = async(tpid) => {
    const tpkg = await Tutorialpkg.findOne({ _id: tpid });
    return tpkg;
};

const paginateTpkg = async() => {
    const tpkgs = await Tutorialpkg.find();
    return tpkgs;
};

const deleteTpkg = async(tpid) => {
    await Tutorialpkg.deleteOne({ _id: tpid }, function(err) {});
};

module.exports = {
    createTPkg,
    editTPkg,
    getTpkg,
    paginateTpkg,
    deleteTpkg
};