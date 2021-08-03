const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
var { admin } = require("../config/firebase-config.js");


const firebaseNotification = async(registrationToken, message, options) => {

    const message_notification = {
        notification: {
           title: message.title,
           body: message.body
          }
        };

    admin.messaging().sendToDevice(registrationToken, message_notification, options)
    .then( response => {
     console.log('Successfully sent message: ', response);
     return response;
     
    })
    .catch( error => {
        console.log('Error sending message:', error);
    });

};


module.exports = {
    firebaseNotification
};



// const firebaseAdminAuth = async(email, password) => {
//     const res = admin.auth().getUserByEmail(email)
//     .then((userRecord) => {
//         // See the UserRecord reference doc for the contents of userRecord.
//         console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);

//         return userRecord;
//       })
//       .catch((error) => {
//         console.log('Error fetching user data:', error);
//       });
//     return res
// };
