const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const { tutorialpkgService } = require('../services');


const createTPkg = catchAsync(async(req, res) => {
    const TPkgBody = req.body;
    const TPkg = await tutorialpkgService.createTPkg(TPkgBody);
    const result = await ApiSuccess(TPkg, 'TutorialPkgIsCreate', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});

const editTPkg = catchAsync(async(req, res) => {
    const tpid = req.params.tpid;
    const editBody = req.body;
    const newtpkg = await tutorialpkgService.editTPkg(tpid, editBody);
    const result = await ApiSuccess(newtpkg, 'TutorialPkgIsEdit', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});

const getTpkg = catchAsync(async(req, res) => {
    const tpid = req.params.tpid;
    const newtpkg = await tutorialpkgService.getTpkg(tpid);
    const result = await ApiSuccess(newtpkg, 'getTutorialPkg', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});

const paginateTpkg = catchAsync(async(req, res) => {
    const paginate = await tutorialpkgService.paginateTpkg();
    const result = await ApiSuccess(paginate, 'TutorialPkgPaginated', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});

const deleteTpkg = catchAsync(async(req, res) => {
    const tpid = req.params.tpid;
    await tutorialpkgService.deleteTpkg(tpid);
    const result = await ApiSuccess('TutorialPkgIsDelete', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});

module.exports = { 
    createTPkg,
    editTPkg,
    getTpkg,
    paginateTpkg,
    deleteTpkg
};