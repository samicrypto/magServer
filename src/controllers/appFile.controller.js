const httpStatus = require('http-status');
var FormData = require('form-data');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const upload = require('../middlewares/uploadFile');
const { appFileService } = require('../services');
const fs = require('fs');
const { format } = require('prettier');
const { arrayRes } = require('../utils/ArrayRes');



const createAppFile = catchAsync(async(req, res) => {
    const appFile = await appFileService.createAppFile(req. body);
    const result = await ApiSuccess(appFile, 'foleCreated', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});


const uploadAppFile = catchAsync(async(req, res) => {
    const appFileId = req.params.appFileId;
    await appFileService.getAppFileById(appFileId);
  
    await upload.uploadApk(req, res); //uploadApkFile
    const fileDetail = req.file;
    const version = req.body.version;
    
    const appFile = await appFileService.addUploadFileDetailsToAppFile(appFileId, version, fileDetail);
    const result = await ApiSuccess(appFile, 'FileUploaded', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
  });
  

const chechAppVersion = catchAsync(async(req, res) => {
    const appFileId = req.params.appFileId;
    const version = req.params.version;
    const report = await appFileService.chechAppVersion(appFileId, version);
    if(report) {
        const result = await ApiSuccess(report, 'newVersionIsExist', httpStatus.OK);
        res.status(httpStatus.OK).send(result);
    }
    else {
        const result = await ApiSuccess('newVersionIsNotFound', httpStatus.NOT_FOUND);
        res.status(httpStatus.OK).send(result);
    }
});

const editAppFileDetails = catchAsync(async(req, res) => {
    const appFileId = req.params.appFileId;
    const newBody = req.body;
    const editFile = await appFileService.editAppFileDetails(appFileId, newBody);
    const result = await ApiSuccess(editFile, 'fileUpdate', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

module.exports = {
    createAppFile,
    uploadAppFile,
    chechAppVersion,
    editAppFileDetails
};