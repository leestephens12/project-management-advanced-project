const express = require("express");
const router = express.Router();
const Firestore = require("../utilities/Firestore");

router.use(express.json());

function compareDates(today, taskDate) {
    // Parse the date strings to Date objects (MM/DD/YYYY format)
    const date1 = new Date(today);
    const date2 = new Date(taskDate);
  
    // Calculate the difference in time between the two dates in milliseconds
    const diffTime = Math.abs(date2 - date1);
  
    // Convert the time difference from milliseconds to days
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
  
    // Check if the difference is less than or equal to 14 days
    return diffDays <= 14;
  }


router.get("/", async function (req, res) {
    /*
        1. get tasks for the logged in user
        2. split the tasks up into 3 pecentages, completed, not started, in progress
        3. get all the high priority tasks
        4. get all the tasks with end date approaching
    */
    try {
        const email = req.email;
        const tasks = await Firestore.queryDocs("tasks", "assignee", "==", email);
        //holds the high priority tasks for the user
        const highPriorityTasks = [];
        const endDateTasks = [];
        const date = new Date().toLocaleDateString();
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

            if(compareDates(date, task.dueDate) == true){
                endDateTasks.push(task);
            }
        });

        //These three variables are the percentages of each task status 
        inProgressTasks = Math.round((inProgressTasks /tasksLength) * 100);
        completedTasks = Math.round((completedTasks / tasksLength) * 100);
        nsTasks = Math.round((nsTasks / tasksLength) * 100);

        res.status(200).json({
            inProgressPercent: inProgressTasks, 
            completedPercent: completedTasks,
            notStartedPercent: nsTasks,
            highPriorityTasks: highPriorityTasks,
            tasksEndDateApproaching: endDateTasks
            });

    }catch(error) {
        res.status(500).json({error: error});
    }




});
module.exports = router; // Export the router
