const Task = require("../models/Task");
const express = require('express');
const router = express.Router(); // Use Router instead of express()
const Authentication = require('../utilities/Authentication');
const Firestore = require('../utilities/Firestore');

router.use(express.json());

router.post('/', async function(req,res) {
    const {name, assignee, description, status, dueDate, completionDate} = req.body;
    const task = new Task(name, assignee, description, status, dueDate, completionDate);
    try {
        await Firestore.addDoc("tasks", JSON.parse(JSON.stringify(task)));
        res.status(200).json({message: "Task Uploaded to Database"});
    }catch(error) {
        res.status(500).json({message: "Task upload failed", error: error.message});
    }
}); module.exports = router;