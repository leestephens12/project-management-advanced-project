//firebase configuration imports
 const {initializeApp, applicationDefault, cert} = require('firebase-admin/app');
 //firestore configuration imports
 const {getFirestore, QuerySnapshot, docs} = require('firebase-admin/firestore');

 const service_account = require('./firebase-settings/firebase-service-accounts.json');

 class Firestore {

     static app = initializeApp({
         credential : cert(service_account)
     });

     static db = getFirestore(this.app);

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

     static async getTasks(id) {
         const documents = await this.db.collection("tasks").where("assignee", "==", id).get();
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