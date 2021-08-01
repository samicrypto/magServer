const httpStatus = require('http-status');
const { ScanFile } = require('../models');
const ApiError = require('../utils/ApiError');
const { slsp } = require('../utils/ArrayRes');

const createScanFile = async(body) => {
    const scanFile = await ScanFile.create(body);
    return scanFile;
};


const getScanFileById = async(id) => {
    const scanFile = await ScanFile.findOne({ _id: id });
    if(!scanFile) { throw new ApiError(httpStatus.BAD_REQUEST, 'ScanFileIsNotExist'); }
    return scanFile;
};


const editScanFileDetails = async(scanFileId, newBody) => {
    await ScanFile.updateOne({ _id: scanFileId}, { '$set': newBody }, { "new": true, "upsert": true });
    const newScanFile = await getScanFileById(scanFileId);
    return newScanFile;
};


const paginateScanFiles = async(options) => {
    const {sort, limit, skip, page} = slsp(options);

    const scanFiles = await ScanFile.find()
    .sort(sort).skip(skip).limit(limit).exec()

    return scanFiles;
};

const deleteScanFileById = async(scanFileId) => {
    await ScanFile.deleteOne({ _id: scanFileId });
};

module.exports = {
    createScanFile,
    getScanFileById,
    editScanFileDetails,
    paginateScanFiles,
    deleteScanFileById
};
