const express = require('express');
const router = express.Router(); // Use Router instead of express()
const Authentication = require('../utilities/Authentication');
const Firestore = require('../utilities/Firestore');
const Task = require('../models/Task');

router.use(express.json());

router.post('/', async function(req, res) {
  const creationDate = "02-03-2024"; //this gets the current date and time for the task object
  //const {name, description, priority, status, teamID, id, dueDate, completionDate} = req.body;
  const assignee = "lee@test.com";
  const name = "Complete Login";
  const description = "Complete validation";
  const priority = 1;
  const status = 2;
  const teamID = "Frontend Team";
  const id = "cqyVv9a6doKquclqGwFm"
  const completionDate = "02/29/2024";
  const dueDate = "03/01/2024";

  /**
   * Creates a new task object with updated information
   */
  const task = new Task(name, assignee, description, priority, status, teamID, dueDate, completionDate, creationDate);
  const dbTask = task.firestoreConverter(); // Use the converter to ensure there are no underscores
  try {
      //uses the update doc function to add it to firestore
      await Firestore.updateDoc("tasks", id, JSON.parse(JSON.stringify(dbTask)));
      res.status(200).json({message: "Task Updated Successfully"});
  }catch(error) {
      res.status(400).json({error: error});
  }
});

module.exports = router; // Export the router