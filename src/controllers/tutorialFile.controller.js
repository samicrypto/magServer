const httpStatus = require('http-status');
var FormData = require('form-data');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const upload = require('../middlewares/uploadFile');
const { tutorialFileService, aparatService } = require('../services');
const fs = require('fs');
const { format } = require('prettier');
const { slsp } = require('../utils/ArrayRes');
const { arrayRes } = require('../utils/ArrayRes');



const createTutorialFile = catchAsync(async(req, res) => {
    const tutorialFile = await tutorialFileService.createTutorialFile(req.body);
    const result = await ApiSuccess(tutorialFile, 'TutorialFileIsCreated', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});



const uploadImageLocally = catchAsync(async(req, res) => {
  const tutorialFileId = req.params.tutorialFileId;
  await tutorialFileService.getTutorialFileById(tutorialFileId);

  await upload.uploadImage(req, res);
  const fileDetails = req.files;
  const fileType = req.body.fileType;
  
  const tutorialFile = await tutorialFileService.addUploadFileDetailsToTutorialFile(tutorialFileId, fileType, fileDetails);
  const result = await ApiSuccess(tutorialFile, 'FileUploaded', httpStatus.OK);
  res.status(httpStatus.OK).send(tutorialFile);
});


const uploadVideoLocally = catchAsync(async(req, res) => {
  const tutorialFileId = req.params.tutorialFileId;
  await tutorialFileService.getTutorialFileById(tutorialFileId);

  await upload.uploadVideo(req, res);
  const fileDetails = req.files;
  const fileType = req.body.fileType;
  
  const tutorialFile = await tutorialFileService.addUploadFileDetailsToTutorialFile(tutorialFileId, fileType, fileDetails);
  const result = await ApiSuccess(tutorialFile, 'FileUploaded', httpStatus.OK);
  res.status(httpStatus.OK).send(result);
});

const uploadAudioLocally = catchAsync(async(req, res) => {
  const tutorialFileId = req.params.tutorialFileId;
  await tutorialFileService.getTutorialFileById(tutorialFileId);

  await upload.uploadAudio(req, res);
  const fileDetails = req.files;
  console.log('fileDetails: ', fileDetails);
  const fileType = req.body;
  // console.log('fileType: ', fileType);
  
  const tutorialFile = await tutorialFileService.addUploadFileDetailsToTutorialFile(tutorialFileId, fileType, fileDetails);
  const result = await ApiSuccess(tutorialFile, 'FileUploaded', httpStatus.OK);
  res.status(httpStatus.OK).send(result);
});


const uploadDocLocally = catchAsync(async(req, res) => {
  const tutorialFileId = req.params.tutorialFileId;
  await tutorialFileService.getTutorialFileById(tutorialFileId);

  await upload.uploadDoc(req, res);
  const fileDetails = req.files;
  const fileType = req.body.fileType;
  
  const tutorialFile = await tutorialFileService.addUploadFileDetailsToTutorialFile(tutorialFileId, fileType, fileDetails);
  const result = ApiSuccess(tutorialFile, 'FileUploaded', httpStatus.OK);
  res.status(httpStatus.OK).send(result);
});

const uploadVideoToAparat = catchAsync(async(req, res) => {
  const username = 'samiCode';
  const password = 'saman1993';
  await upload.uploadSingleVideo(req, res);
  const file = req.file;
  const category = parseInt(req.body.catg);
  const login = await aparatService.loginToAparat(username, password);
  const uploadform = await aparatService.createUploadForm(username, login.body.ltoken);
  const formData = new FormData();
  console.log(`${file.destination}/${file.filename}`);
  formData.append('video', fs.createReadStream(`${file.path}`)); //, {  'data[title]': req.body.title, 'data[category]': category }
  formData.append('frm-id', uploadform.body['frm-id'],)
  
  const result = await aparatService.getUploadfileUID(uploadform, formData);
  res.status(httpStatus.OK).send(result);
});


const paginateTutorialFiles = catchAsync(async(req, res) => {
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const {sort, limit, skip, page} = slsp(options);
    const tfs = await tutorialFileService.paginateTutorialFiles(options);
    const result = arrayRes(tfs, limit, page);
    res.status(httpStatus.OK).send(result);
});


const getTutorialFileDetails = catchAsync(async(req, res) => {
  const tutorialFileId = req.params.tfid;
  const tf = await tutorialFileService.getTutorialFileDetails(tutorialFileId); 
  const result = ApiSuccess(tf, 'FileDetails', httpStatus.OK);
  res.status(httpStatus.OK).send(result);
});

const editTutorialFile = catchAsync(async(req, res) => {
  const tutorialFileId = req.params.tfid;
  const newFileBody = req.body;
  const editedFile = await tutorialFileService.editTutorialFile(tutorialFileId, newFileBody);
  const result = ApiSuccess(editedFile, 'FileEditedSuccessfully', httpStatus.OK);
  res.status(httpStatus.OK).send(result);
});

const deleteTutorialFiles = catchAsync(async(req, res) => {
  const ListOfFilesId = req.body.ListOfFilesId;
  const deletedFile = await tutorialFileService.deleteTutorialFiles(ListOfFilesId);
  // if(deletedFile.ok === '1') {

  // }
  const result = ApiSuccess('FilesDeleteSuccessfully', httpStatus.OK);
  res.status(httpStatus.OK).send(result);
});

// const deleteTutorialFiles = catchAsync(async(req, res) => { 
//  await tutorialFileService.dfs();
//  res.send('success');
// });


module.exports = {
    createTutorialFile,
    uploadImageLocally,
    uploadVideoLocally,
    uploadAudioLocally,
    uploadDocLocally,
    uploadVideoToAparat,
    paginateTutorialFiles,
    getTutorialFileDetails,
    editTutorialFile,
    deleteTutorialFiles
};