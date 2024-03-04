const express = require("express");
const router = express.Router();
const Firestore = require("../utilities/Firestore");

router.use(express.json());

/**
 * Get Request from frontend when the dashboard page is loaded
 * In the get request i use the logged in users email to query firestore to return a list of tasks
 * if the query goes ok then returns a 200 status and a list of tasks
 * if it doesnt go okay returns a 500 status code w an error message
 */
router.get("/", async function (req, res) {
  try {
    //call the query docs function and returns a list of tasks based off of the logged in user
    const email = req.email;
    const tasks = await Firestore.queryDocs("tasks", "assignee", "==", email);
    res
      .status(200)
      .json({ tasks: tasks, message: "Tasks retrieved successfully" }); //sends the list of tasks to the front end
  } catch (error) {
    //if there is an error retirieving the data from firestore it will throw an error
    console.log(error + error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; // Export the router
