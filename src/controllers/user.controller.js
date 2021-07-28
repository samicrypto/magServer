const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createAdmin = catchAsync(async (req, res) => {
  const user = await userService.createAdmin(req.body);
  const result = ApiSuccess(user, 'AdminIsCreated', httpStatus.CREATED);
  res.status(httpStatus.CREATED).send(result);
});


const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const result = ApiSuccess(user, 'UserIsCreated', httpStatus.CREATED);
  res.status(httpStatus.CREATED).send(result);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});


module.exports = {
  createAdmin,
  createUser,
  getUsers,
  getUser,
};
