const express = require('express');
const router = express.Router(); // Use Router instead of express()
const Authentication = require('../utilities/Authentication');
const Firestore = require('../utilities/Firestore');

router.use(express.json());

router.post('/', async function(req, res) {
  const creationDate = "02-03-2024"; //this gets the current date and time for the task object
  //const {name, description, priority, status, teamID, dueDate, completionDate} = req.body;
  const assignee = "donotreply.mangement.system@gmail.com";
  const name = "Complete Login";
  const description = "Complete validation";
  const priority = "High";
  const status = "Complete";
  const teamID = "Frontend Team";
  const completionDate = "02/29/2024";
  const dueDate = "03/01/2024";

  Firestore.updateDoc("task", id)
});

module.exports = router; // Export the router