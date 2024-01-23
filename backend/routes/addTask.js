const express = require('express');
const router = express.Router(); // Use Router instead of express()
const Authentication = require('../utilities/Authentication');
const Firestore = require('../utilities/Firestore');

router.use(express.json());

/**
 * Frontend sends post data from a form to the backend that holds all the values for a task object
 * I send back a repsonse 200 if it is uploaded to firestore correctly
 * 500 if not
 */
const validate = (data, res) => {
    const { description, status } = data;

    if(!description) res.status(400).json({message: "Description cannot be empty. "});
    if(!["In Progress", "Not Started", "Complete", "On Hold", "in progress", "not started", "complete", "on hold"].includes(status)) {
        res.status(400).json({message: "Non-existent status option used"});
    }
}

router.post('/', async function(req,res) {
   const creationDate = new Date(); //this gets the current date and time for the task object
   const {name, description, assignee, status, teamID, dueDate, completionDate} = req.body;

   validate({ description, status }, res);

    try {
        //uses the add doc function to add it to firestore
        await Firestore.addDoc("tasks", {
            assignee,
            description,
            name,
            status,
            teamID,
            dueDate,
            completionDate,
            creationDate,
        });
        res.status(200).json({message: "Task Uploaded to Database"});
    }catch(error) {
        //if there is na error it is sent back to the frontend
        res.status(500).json({message: "Task upload failed", error: error.message});
    }
}); module.exports = router;
