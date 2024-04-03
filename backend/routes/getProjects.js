const express = require("express");
const router = express.Router();
const Firestore = require("../utilities/Firestore");

router.use(express.json());

router.get("/", async function (req, res) {
  try {
    //call the query docs function and returns a list of tasks based off of the logged in user
    //const teamID = req.teamID;
    const teamId = "2rzsanNbEoi6ZvLYLWHJ";
    const projects = await Firestore.queryDocs(
      "projects",
      "teamId",
      "==",
      teamId
    );
    res.status(200).json({ projects: projects, message: "Projects retrieved successfully" }); //sends the list of tasks to the front end
  } catch (error) {
    //if there is an error retirieving the data from firestore it will throw an error
    console.log(error + error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; // Export the router
