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

    //Register users in firebase aith with email and password
    static async register(email, password) {
        try {
            await createUserWithEmailAndPassword(this.auth, email, password)
                .then((userCredential) => {
                    user = userCredential.user;
                    console.log("user registered in successfully");
                });
        }catch(error) {
            console.log(error);
        }
    }

    //functio for user to log in 
    static async signIn(email, password) {
        //use built in sign in method from firebase passing trhough an email and password from front end
        await signInWithEmailAndPassword(this.auth, email, password)
        try {
            await signInWithEmailAndPassword(this.auth, email, password)
                .then((userCredential) => {
                    user = userCredential.user;
                    console.log("user signed in successfully");
                });
        }catch(error) {
            console.log(error);
        }
    }

} module.exports = Authentication;
