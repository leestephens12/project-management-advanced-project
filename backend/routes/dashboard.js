const express = require('express');
const router = express.Router(); // Use Router instead of express()
const Firestore = require('../utilities/Firestore');
const Authentication = require('../utilities/Authentication');

router.use(express.json());

router.get('/', async function(req,res) {
    try {
        //call the query docs function and returns a list of tasks based off of the logged in user
        const email = await Authentication.getEmail();
        const tasks = await Firestore.queryDocs("tasks", "assignee", email);
        console.log(tasks);
        res.status(200).json({tasks: tasks, message: "Tasks retrieved successfully"}); //sends the list of tasks to the front end
    }catch(error) {
        //if there is an error retirieving the data from firestore it will throw an error
        console.log(error + error.message);
        res.status(500).json({message: error.message});
    }
});

router.post('/', async function(req, res) {

});

module.exports = router; // Export the router