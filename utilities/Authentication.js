//imports to conifgure app on client side
const {initializeApp} = require('firebase/app');
//imports to initialize the authencitcation 
const {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} = require('firebase/auth');
//importing necessary prebuilt files
const firebase_config = require('./firebase-settings/firebase-configuration.js');

class Authentication {
    //Iintialize the app
    static app = initializeApp(firebase_config);
    //intialize the authentication
    static auth = getAuth(this.app);

    static async login(email, password) {
        await signInWithEmailAndPassword(this.auth, email, password)
            .then((user) => {
                console.log(user.user.email + ' logged in successfully');
            }).catch((error) => {
                console.log("There was an error logging in " + error);
            });
    }

    static async register(email, password) {
        await createUserWithEmailAndPassword(this.auth, email, password)
            .then((user) => {
                console.log(user.user.email + ' registered successfully');
            }).catch((error) => {
                console.log("There was an error registering the user: " + error);
            });
    }
} module.exports = Authentication;