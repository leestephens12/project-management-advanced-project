const { initializeApp } = require("firebase/app");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} = require("firebase/auth");
const firebase_config = require("./firebase-settings/firebase-configuration.js");

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
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * uses buil in sign in function through firebase to register user
   * Creates new account in firebase
   * @param {String} email -> User inputted password from Login Form
   * @param {String} password -> User inputed password from front end
   */
  static async register(email, password) {
    await createUserWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * This is an async function users use to sign out
   */
  static async logout() {
    await signOut(this.auth);
  }

  /**
   *
   * @returns current uid of logged in user
   */
  static async getEmail() {
    if (this.auth.currentUser) {
      return this.auth.currentUser.email;
    } else {
      return "There is no user logged in";
    }
  }
}
module.exports = Authentication;
