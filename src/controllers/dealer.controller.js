const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const { dealerService } = require('../services');
const { slsp } = require('../utils/ArrayRes');
const { arrayRes } = require('../utils/ArrayRes');


const createDealer = catchAsync(async(req, res) => {
    const DBody = req.body;
    const dealer = await dealerService.createDealer(DBody);
    const result = await ApiSuccess(device, 'DealerIsCreate', httpStatus.CREATED);
    res.status(httpStatus.CREATED).send(result);
});

const editDealer = catchAsync(async(req, res) => {
    const did = req.params.did;
    const editBody = req.body;
    const dealer = await dealerService.editDealer(did, editBody);
    const result = await ApiSuccess(dealer, 'dealerIsEdit', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const getDealer = catchAsync(async(req, res) => {
    const did = req.params.did;
    const dealer = await dealerService.getDealer(did);
    const result = await ApiSuccess(device, 'getDealer', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});

const paginateDealer = catchAsync(async(req, res) => {
    const filter = pick(req.query, ['name', 'regDate']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const {sort, limit, skip, page} = slsp(options);
    const dealers = await dealerService.paginateDealer(options);
    const result = arrayRes(dealers, limit, page, 'DevicePaginated', httpStatus.OK); 
    res.status(httpStatus.OK).send(result)
});

const deleteDealer = catchAsync(async(req, res) => {
    const did = req.params.did;
    await dealerService.deleteDealer(did);
    const result = await ApiSuccess('DealerIsDelete', httpStatus.OK);
    res.status(httpStatus.OK).send(result);
});


module.exports = { 
    createDealer,
    editDealer,
    getDealer,
    paginateDealer,
    deleteDealer
};