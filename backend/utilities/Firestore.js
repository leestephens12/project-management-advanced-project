//firebase configuration imports
 const {initializeApp, applicationDefault, cert} = require('firebase-admin/app');
 //firestore configuration imports
 const {getFirestore, QuerySnapshot, docs} = require('firebase-admin/firestore');
 const {createCustomToken, getAuth} = require('firebase-admin/auth');
 const Authentication = require('../utilities/Authentication');

 const service_account = require('./firebase-settings/firebase-service-accounts.json');

 class Firestore {

     static app = initializeApp({
         credential : cert(service_account)
     });

     static db = getFirestore(this.app);
     static auth = getAuth(this.app);

     /**
      * 
      * @param {String} collection
      * @returns the full collection object
      */
     static getCollection(collection) {
        return this.db.collection(collection);
     }

     /**
      * 
      * @param {String} collection 
      * @param {String} document 
      * @returns specifc document in firestore
      */
     static getDocument(collection, document) {
        return this.db.collection(collection).doc(document);
     }

     /**
      * 
      * @param {String} collection -> collection name you want to query
      * @param {String} field -> filed used for comparison
      * @param {String} id -> what you want to compare the field to
      * @returns a list of the documents meeting the requirements of the query
      */
    static async queryDocs(collection, field, id) {
      //stores the list of documents
      const documents = await this.db.collection(collection).where(field, "==", id).get();
      //map the documents returned
      let docs = documents.docs;
      let docData = docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return docData;
 }
     /**
      * 
      * @param {String} collection you want to add data to 
      * @param {Object} data 
      */
     static async addDoc(collection, data) {
        const col = this.getCollection(collection);
        col.add(data);
     }

     /**
      * Allows you to specify the document name compared to the addDoc function
      * @param {String} collection 
      * @param {Object} data 
      * @param {String or Int} id 
      */
     static async addDocCustomID(collection, data, id) {
        const col = this.getCollection(collection);
        col.doc(id).set(data);
     }

 } module.exports = Firestore; 