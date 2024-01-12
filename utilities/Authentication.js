//imports to conifgure app on client side
const {initializeApp} = require('firebase/app');
//imports to initialize the authencitcation 
const {getAuth} = require('firebase/auth');
//importing necessary prebuilt files
const firebase_config = require('./firebase-settings/firebase-configuration.js');

class Authentication {
    //Iintialize the app
    static app = initializeApp(firebase_config);
    //intialize the authentication
    static auth = getAuth(this.app);

} module.exports = Authentication;