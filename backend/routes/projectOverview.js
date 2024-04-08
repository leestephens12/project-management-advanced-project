const express = require("express");
const router = express.Router();
const Firestore = require("../utilities/Firestore");

router.use(express.json());

router.get("/", async function (req, res) {
  try {
    //call the query docs function and returns a list of tasks based off of the logged in user
    const projectId = req.query.projectId;
    const tasks = await Firestore.queryDocs(
      "tasks",
      "projectId",
      "==",
      projectId
    );

    const tasksLength = tasks.length;
    let inProgressTasks = 0;
    let completedTasks = 0;
    let nsTasks = 0;
    tasks.forEach(task => {
        if(task.status == 0) {
            nsTasks += 1
        }
        else if(task.status == 1) {
            inProgressTasks += 1;
        }
        else {
            completedTasks += 1;
        }
    });

    //These three variables are the percentages of each task status 
    inProgressTasks = Math.round((inProgressTasks /tasksLength) * 100);
    completedTasks = Math.round((completedTasks / tasksLength) * 100);
    nsTasks = Math.round((nsTasks / tasksLength) * 100);


        res.status(200).json({
            inProgressPercent: inProgressTasks, 
            completedPercent: completedTasks,
            notStartedPercent: nsTasks
        });

  } catch (error) {
    //if there is an error retirieving the data from firestore it will throw an error
    console.log(error + error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; // Export the router
