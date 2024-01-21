const express = require("express");
const Task = require("../models/Task");
const Firestore = require("../utilities/Firestore");
const router = express.Router();

router.use(express.json());

router.post('/', async function(req,res) {
    const {name, assignee, description, status, dueDate, completionDate} = req.body;
    const task = new Task(name, assignee, description, status, dueDate, completionDate);
    try {
        await Firestore.addDoc(JSON.parse(JSON.stringify(task)));
        res.status(200).json({message: "Task Uploaded to Database"});
    }catch(error) {
        res.status(500).json({message: "Task upload failed", error: error.message});
    }
});