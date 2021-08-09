const httpStatus = require('http-status');
const { AppFile } = require('../models');
const ApiError = require('../utils/ApiError');
const { slsp } = require('../utils/ArrayRes');

const createAppFile = async(body) => {
    const app = await AppFile.create(body);
    return app;
};


const addUploadFileDetailsToAppFile = async(appFileId, appVersion, fileDetail) => {
    const filename = fileDetail.filename;
    const version  = parseInt(appVersion) ;
    const mimetype = fileDetail.mimetype;


    await AppFile.updateOne({_id: appFileId}, {"$set": {
        "source":  filename,
        "version": version
    }}, { "new": true, "upsert": true });  
    
    const appFile = await getAppFileById(appFileId);
    return appFile;
};

const getAppFileById = async(id) => {
    const appFile = await AppFile.findOne({ _id: id });
    if(!appFile) { throw new ApiError(httpStatus.BAD_REQUEST, 'AppFileIsNotExist'); }
    return appFile;
};


const chechAppVersion = async(appFileId, appVersion) => {
    const version = parseInt(appVersion)
    const appFile = await AppFile.findOne({ _id: appFileId });
    if(appFile.version > version) { return appFile; };
};

const editAppFileDetails = async(appFileId, newBody) => {
    const up = await AppFile.updateOne({ _id: appFileId}, { '$set': newBody }, { "new": true, "upsert": true });
    const newAppFile = await getAppFileById(appFileId);
    return newAppFile;
};


const paginateAppFiles = async(options) => {

    const appFiles = await AppFile.find()

    return appFiles;
};

const deleteAppFileById = async(appFileId) => {
    await AppFile.deleteOne({ _id: appFileId });
};

module.exports = {
    createAppFile,
    getAppFileById,
    addUploadFileDetailsToAppFile,
    chechAppVersion,
    editAppFileDetails,
    paginateAppFiles,
    deleteAppFileById
};
