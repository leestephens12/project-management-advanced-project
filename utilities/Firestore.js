//firebase configuration imports
const {initializeApp, applicationDefault, cert} = require('firebase-admin/app');
//firestore configuration imports
const {getFirestore} = require('firebase-admin/firestore');

const service_account = require('./firebase-settings/firebase-service-accounts.json');

class Firestore {

    static app = initializeApp({
        credential : cert(service_account)
    });

    static db = getFirestore(this.app);
    
} module.exports = Firestore;