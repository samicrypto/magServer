const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { firebaseService } = require('../services');
const ApiSuccess = require('../utils/ApiSuccess');


const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

const firebaseNotification = catchAsync(async(req, res) => {
    const  registrationToken = req.body.registrationToken
    const message = req.body.message
    const options =  notification_options

    const result = await firebaseService.firebaseNotification(registrationToken, message, options);
    res.status(httpStatus.OK).send(result);
});

module.exports = {
    firebaseNotification
};