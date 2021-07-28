const path = require('path');
const util = require('util');
const fse = require('fs-extra');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');



const deleteImage = function () {
    this.deleteFile = function (filename) {
        const filePath = './public/files/images';
        fse.unlink(`${filePath}/${filename}`);

        console.log('fileIsDeletd');
    }
};

const deleteVideo = function () {
    this.deleteFile = function (filename) {
        const filePath = './public/files/videos';
        fse.unlink(`${filePath}/${filename}`);

        console.log('fileIsDeletd');
    }
};

const deleteAudio = function () {
    this.deleteFile = function (filename) {
        const filePath = './public/files/audios';
        fse.unlink(`${filePath}/${filename}`);

        console.log('fileIsDeletd');
    }
};

const deleteDoc = function () {
    this.deleteFile = function (filename) {
        const filePath = './public/files/doc';
        fse.unlink(`${filePath}/${filename}`);

        console.log('fileIsDeletd');
    }
};




// Strategy Design Patern
const Deleting = function () {
    this.fileType = "";
};

Deleting.prototype = {
    setStrategy: function (fileType) {
        this.fileType = fileType;
    },

    deleteFile: function (filename) {
        return this.fileType.deleteFile(filename);
    }
};




const DeleteFile = async(fileType, filename) => {

    const strateges = {
        "image": deleteImage,
        "video": deleteVideo,
        "audio": deleteAudio,
        "doc"  : deleteDoc
    };
    
    // const image = new deleteImage();
    const deleting = new Deleting();

    deleting.setStrategy(new strateges[fileType]());
    deleting.deleteFile(filename);
};



module.exports = {
    DeleteFile
};