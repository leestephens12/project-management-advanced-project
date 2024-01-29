const express = require('express');
const router = express.Router(); // Use Router instead of express()
const Authentication = require('../utilities/Authentication');
const Firestore = require('../utilities/Firestore');
const Task = require("../models/Task");

router.use(express.json());

router.get('/', async function(req,res) {
    /**
     * Query the teams collection and return a list of teams that the logged in user is in
     */
    try {
        //first trys to get logged in users email
        const email = await Authentication.getEmail();
        try {
            //then try to query database for teams
            const userTeams = await Firestore.queryDocs("teams", "users", "array-contains",email);
            res.status(200).json({userTeams: userTeams});
        }catch(error) {
            //return error
            res.status(401).json({error: error.message});
        }
    }
    catch(error) {
        //return error
        res.status(401).json({error: error.message});
    }
});

/**
 * Frontend sends post data from a form to the backend that holds all the values for a task object
 * I send back a repsonse 200 if it is uploaded to firestore correctly
 * 500 if not
 */
router.post('/', async function(req,res) {
    const creationDate = new Date(); //this gets the current date and time for the task object
    const {name, assignee, description, status, teamID, dueDate, completionDate} = req.body;
    //create a new task ovject with info received from frontend
    const task = new Task(name, assignee, description, status, teamID, dueDate, completionDate, creationDate);
    const dbTask = task.firestoreConverter(); // Use the converter to ensure there are no underscores
    try {
        //uses the add doc function to add it to firestore
        await Firestore.addDoc("tasks", JSON.parse(JSON.stringify(dbTask)));
        res.status(200).json({message: "Task Uploaded to Database"});
    }catch(error) {
        //if there is na error it is sent back to the frontend
        res.status(500).json({message: "Task upload failed", error: error.message});
    }
}); module.exports = router;