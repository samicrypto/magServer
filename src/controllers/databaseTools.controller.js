const DBTService = require('../services/databaseTools.service');
const catchAsync = require('../utils/catchAsync');
const ApiSuccess = require('../utils/ApiSuccess');
const httpStatus = require('http-status');


const dumpMongo2Localfile = catchAsync(async(req, res) => {
  const backupPath = req.body.backupPath;
  const dumpPath = await DBTService.dumpMongo2Localfile(backupPath);
  const result = await ApiSuccess(dumpPath, httpStatus.OK, 'Backup Successfully.');
  res.status(httpStatus.OK).send(result);
});

module.exports = {
  dumpMongo2Localfile
};