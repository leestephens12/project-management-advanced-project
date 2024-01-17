const express = require('express');
const router = express.Router(); // Use Router instead of express()
const Firestore = require('../utilities/Firestore');

router.use(express.json());

router.get('/', async function(req,res) {
    try {
        //Store the tasks retrieved from the getTasks function
        const tasks = await Firestore.getTasks();
        res.status(200).json({tasks: tasks, message: "Tasks retrieved successfully"}); //sends the list of tasks to the front end
    }catch(error) {
        //if there is an error retirieving the data from firestore it will throw an error
        res.status(500).json({message: error.message});
    }
});

router.post('/', async function(req, res) {

});

module.exports = router; // Export the router