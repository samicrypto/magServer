const httpStatus = require('http-status');
var FormData = require('form-data');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const upload = require('../middlewares/uploadFile');
const { scanFileService } = require('../services');
const fs = require('fs');
const { format } = require('prettier');
const { slsp } = require('../utils/ArrayRes');
const { arrayRes } = require('../utils/ArrayRes');



const createScanFile = catchAsync(async(req, res) => {
    const scanFile = await scanFileService.createScanFile(req.body);
    const result = await ApiSuccess(scanFile, 'scanFileCreated', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});

const editScanFileDetails = catchAsync(async(req, res) => {
    const scanFileId = req.params.sfid;
    const newBody = req.body;
    const editFile = await scanFileService.editScanFileDetails(scanFileId, newBody);
    const result = await ApiSuccess(editFile, 'scanFileUpdate', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});


const paginateScanFiles = catchAsync(async(req, res) => {
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const {sort, limit, skip, page} = slsp(options);
    const scanFiles = await scanFileService.paginateScanFiles(options);
    const result = arrayRes(scanFiles, limit, page, 'ScanFilePaginated', httpStatus.OK); 
    res.status(httpStatus.OK).send(result);
});


const getScanFileById = catchAsync(async(req, res) => {
    const scanFileId = req.params.sfid;
    const scanFile = await scanFileService.getScanFileById(scanFileId);
    const result = await ApiSuccess(scanFile, 'scanFileUpdate', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});


const deleteScanFileById = catchAsync(async(req, res) => {
    const scanFileId = req.params.sfid;
    await scanFileService.deleteScanFileById(scanFileId);
    const result = await ApiSuccess('fileDeleteSuccessfuly', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

module.exports = {
    createScanFile,
    editScanFileDetails,
    paginateScanFiles,
    getScanFileById,
    deleteScanFileById
};