const express = require("express");
const router = express.Router();
const Firestore = require("../utilities/Firestore");
const Project = require("../models/Project");

router.use(express.json());

router.post("/", async function (req, res) {
  //const {name, teamId, startDate, endDate, tasks, members} = req.body;
  const name = "Test Project";
  const teamId = "2rzsanNbEoi6ZvLYLWHJ";
  const startDate = "03/04/2024";
  const endDate = "05/09/2024";
  const tasks = "null";
  const members = ["lee@test.com", "sam@test.com"];

  try {
    //Get the reference of the document you want to add the data to
    const docRef = await Firestore.getDocRef("projects");
    const projectId = docRef.id; //get the document id
    const project = new Project(name, projectId, teamId, startDate, endDate, tasks, members);
    const dbProject = project.firestoreConverter(); // Use the converter to ensure there are no underscores
    //uses the add doc function to add it to firestore
    await Firestore.addDoc(docRef, JSON.parse(JSON.stringify(dbProject)));
    res.status(200).json({ message: "Project Uploaded to Database" });

  } catch (error) {
    //if there is na error it is sent back to the frontend
    res
      .status(400)
      .json({ message: "Project upload failed", error: error.message });
  }
});
module.exports = router;
