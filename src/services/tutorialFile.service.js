const httpStatus = require('http-status');
const { TutorialFile } = require('../models');
const ApiError = require('../utils/ApiError');
const deleteFile = require('../utils/deleteFile');


const createTutorialFile = async(body) => {
    const tutorialFile = await TutorialFile.create(body);
    return tutorialFile;
};


const getTutorialFileById = async(id) => {
    const tutorialFile = await TutorialFile.findOne({ _id: id });
    if(!tutorialFile) { throw new ApiError(httpStatus.BAD_REQUEST, 'TutorialFileIsNotExist'); }

    return tutorialFile;
};

const addUploadFileDetailsToTutorialFile = async(tutorialFileId, fileType, fileDetails) => {

    const fileModel = fileDetails.map((fileDetail) => {

        const file = {
            filename: fileDetail.filename,
            fileType: fileType,
            mimetype: fileDetail.mimetype,
        };

        return file;
    });

    await TutorialFile.updateOne({_id: tutorialFileId}, {"$addToSet": {
        "sources": { "$each": fileModel }
    }}, { "new": true, "upsert": true });  
    
    const tutorialFile = await getTutorialFileById(tutorialFileId);
    return tutorialFile;
};


const paginateTutorialFiles = async(options) => {

    const tutorialFiles = await TutorialFile.find()
    
    return tutorialFiles;

};


const getTutorialFileDetails = async(tuid) => {
    const tutorialFile = getTutorialFileById(tuid);
    return tutorialFile;
};


const editTutorialFile = async(tfid, newFileBody) => {
    await TutorialFile.updateOne({ _id: tfid }, { "$set":  newFileBody }, { "new": true, "upsert": true });
    const newFile = await getTutorialFileById(tfid);
    return newFile;
};


const deleteTutorialFiles = async(ListOfFilesId) => {
    const source = ListOfFilesId.forEach(async(tfid) => {
            await deleteTutorialFile(tfid);
    });
    return source;
};

const deleteTutorialFile = async(tfid) => {
    const tf = await getTutorialFileById(tfid);
    tf.sources.forEach(async(file) => {
        await deleteSingleSourceFile(tfid, file);
    });
    const result = await TutorialFile.deleteOne({ _id: tfid }, function(err) {});
};

const deleteSingleSourceFile = async(tfId, file) => {
    deleteFile.DeleteFile(file.fileType, file.filename);
    const result = await TutorialFile.updateOne({ _id: tfId },  { "$pull": {
        "sources": { _id: file._id },
    }}, { "new": true, "upsert": true });
};


module.exports = {
    createTutorialFile,
    getTutorialFileById,
    addUploadFileDetailsToTutorialFile,
    paginateTutorialFiles,
    getTutorialFileDetails,
    editTutorialFile,
    deleteTutorialFiles,
};