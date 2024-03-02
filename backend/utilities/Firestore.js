 const admin = require('firebase-admin')
//firebase configuration imports
 const {initializeApp, cert} = require('firebase-admin/app');
 //firestore configuration imports
 const {getFirestore, QuerySnapshot, docs, deleteDoc, update, arrayUnion, DocumentReference} = require('firebase-admin/firestore');
 const {getAuth} = require('firebase-admin/auth');
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
        return this.db.collection(collection).doc(document).get();
     }

     /**
      * 
      * @param {String} collection -> collection name you want to query
      * @param {String} field -> filed used for comparison
      * @param {String} id -> what you want to compare the field to
      * @returns a list of the documents meeting the requirements of the query
      */
    static async queryDocs(collection, field, operator, id) {
      //stores the list of documents
      const documents = await this.db.collection(collection).where(field, operator, id).get();
      //map the documents returned
      let docs = documents.docs;
      let docData = docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return docData;
   }

     /**
      * 
      * @param {DocumentReference} docRef you want to add data to 
      * @param {Object} data you want to add
      */
     static async addDoc(docRef, data) {
        await docRef.set(data);
     }

     /**
      * 
      * @param {String} collection you want to add a document to 
      * @returns a document reference to use with the add doc function
      */
     static async getDocRef(collection) {
      const col = this.getCollection(collection);
      const docRef = col.doc();
      return docRef;
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

     /**
      * Call the get document function created above
      * @param {String} collection collection you want to query
      * @param {String} document Specific document string you want
      * @param {String} field specific field you want yo query
      * @returns the output of the filed desired
      */
     static async getField(collection, document, field) {
      try {
         const docSnapshot = await this.getDocument(collection, document);
         if (!docSnapshot.exists) {
             console.log('Document does not exist');
             return null;
         }
         const data = docSnapshot.data(); // Note the use of data() as a method
         return data[field];
     } catch (error) {
         console.error('Error getting field:', error);
         return null;
     }
   }

   static async updateDoc(collection, id, data) {
      const docRef = this.db.collection(collection).doc(id);
      docRef.update(data);
   }

   static async deleteDoc(collection, id) {
      const docRef = this.db.collection(collection).doc(id);
      await docRef.delete();
   }

   static async addToArray(collection, id, field, items) {
      const docRef = this.db.collection(collection).doc(id);
      await docRef.update({
         [field]: admin.firestore.FieldValue.arrayUnion(items)
      });
  }


 } module.exports = Firestore; 