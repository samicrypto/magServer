const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');
const ApiSuccess = require('../utils/ApiSuccess');

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(username, password);
  const tokens = await tokenService.generateAuthTokens(user);
  const result = ApiSuccess({ user, tokens }, 'UserIsLogin', httpStatus.OK);
  res.send(result);
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  const result = ApiSuccess('UserIsLogOut', httpStatus.OK);
  res.status(httpStatus.NO_CONTENT).send(result);
});


module.exports = {
  login,
  logout,
};
