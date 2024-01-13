//imports to conifgure app on client side
const {initializeApp} = require('firebase/app');
//imports to initialize the authencitcation 
const {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} = require('firebase/auth');
//importing necessary prebuilt files
const firebase_config = require('./firebase-settings/firebase-configuration.js');
const Firestore = require("./Firestore.js");

class Authentication {
    //Iintialize the app
    static app = initializeApp(firebase_config);
    //intialize the authentication
    static auth = getAuth(this.app);

    /**
     * uses buil in sign in function through firebase to authenticate user
     * In route file it redirects to correct page based on auth status
     * @param {String} email -> User inputted password from Login Form
     * @param {String} password -> User inputed password from front end
     */
    static async login(email, password) {
        await signInWithEmailAndPassword(this.auth, email, password)
            .then((user) => {
                console.log(user.user.email + ' logged in successfully');
                
            }).catch((error) => {
                console.log("There was an error logging in " + error);
            });
    }

    /**
     * uses buil in sign in function through firebase to register user
     * Creates new account in firebase
     * @param {String} email -> User inputted password from Login Form
     * @param {String} password -> User inputed password from front end
     */
    static async register(email, password) {
        await createUserWithEmailAndPassword(this.auth, email, password)
            .then((user) => {
                console.log(user.user.email + 'registered successfully');
            }).catch((error) => {
                console.log("There was an error registering the user: " + error);
            });
    }

    /**
     * This is an async function users use to sign out
     */
    static async logout() {
        await signOut(this.auth)
            .then(()=> {
                console.log("User signed out successfully");
            })
            .catch((error) => {
                console.log("There was an error signing out: " + error);
            });
    }
} module.exports = Authentication;