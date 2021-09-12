var admin = require("firebase-admin");

var serviceAccount = require("./magserver-559ab-firebase-adminsdk-9q26v-3dd0d28ba0.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sample-project-e1a84.firebaseio.com"
})

module.exports.admin = admin