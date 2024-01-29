const express = require('express');
const router = express.Router(); // Use Router instead of express()
const Authentication = require('../utilities/Authentication');
const Firestore = require('../utilities/Firestore');

router.use(express.json());

router.get('/', function(req,res) {
  /*
        In this section you have to autofil the current task information
  */
});

router.post('/', async function(req, res) {
    /*
        When the user hits the edit button and has filled out the necessary fields
        it will send the new object to the database
    */
   
});

module.exports = router; // Export the router