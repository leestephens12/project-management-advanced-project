const express = require("express");
const router = express.Router();
const Firestore = require("../utilities/Firestore");

router.use(express.json());

router.get("/", async function (req, res) {
    /*
        1. get tasks for the logged in user
        2. split the tasks up into 3 pecentages, completed, not started, in progress
        3. get all the high priority tasks
        4. get all the tasks with end date approaching
    */
    const email = "lee@test.com";
    const tasks = await Firestore.queryDocs("tasks", "assignee", "==", email);
    //holds the high priority tasks for the user
    const highPriorityTasks = [];
    const endDateTasks = [];
    const date = new Date().toLocaleDateString();
    console.log(date);
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

        if(task.priority == 0) {
            highPriorityTasks.push(task);
        }
    });

    //These three variables are the percentages of each task status
    inProgressTasks = Math.round((inProgressTasks /tasksLength) * 100);
    completedTasks = Math.round((completedTasks / tasksLength) * 100);
    nsTasks = Math.round((nsTasks / tasksLength) * 100);


});
module.exports = router; // Export the router
