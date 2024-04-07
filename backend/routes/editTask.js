const express = require("express");
const router = express.Router();
const Firestore = require("../utilities/Firestore");
const Task = require("../models/Task");

router.use(express.json());

router.post("/", async function (req, res) {
  const {name, description, priority, status, teamID, id, dueDate, completionDate, projectId} = req.body;


  /**
   * Creates a new task object with updated information
   */
  const task = new Task(
    name,
    assignee,
    description,
    priority,
    status,
    id,
    teamID,
    dueDate,
    completionDate,
    creationDate,
    projectId
  );
  const dbTask = task.firestoreConverter(); // Use the converter to ensure there are no underscores
  try {
    //uses the update doc function to add it to firestore
    await Firestore.updateDoc("tasks", id, JSON.parse(JSON.stringify(dbTask)));
    res.status(200).json({ message: "Task Updated Successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router; // Export the router
