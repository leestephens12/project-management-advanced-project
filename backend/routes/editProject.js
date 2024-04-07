const express = require("express");
const router = express.Router();
const Firestore = require("../utilities/Firestore");
const Project = require("../models/Project");

router.use(express.json());

router.post("/", async function (req, res) {

  const {name, projectId, teamId, startDate, endDate, members} = req.body;
  const project = new Project(name, projectId, teamId, startDate, endDate, members);
  const dbProject = project.firestoreConverter(); // Use the converter to ensure there are no underscores
  try {
    //uses the update doc function to add it to firestore
    await Firestore.updateDoc("projects", projectId, JSON.parse(JSON.stringify(dbProject)));
    res.status(200).json({ message: "Task Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router; // Export the router
