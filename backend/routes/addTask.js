const express = require('express');
const router = express.Router(); // Use Router instead of express()
const Authentication = require('../utilities/Authentication');
const Mailer = require('../utilities/Mailer');
const Firestore = require('../utilities/Firestore');
const Task = require("../models/Task");

router.use(express.json());

router.get('/', async function(req,res) {
    /**
     * Query the teams collection and return a list of teams that the logged in user is in
     * 
     */
    try {
        //const email = Authentication.getEmail(); //enable this after
        //Get a list of the team that current logged in user owns, email is hardcoded for now
        const adminTeams = await Firestore.queryDocs("teams", "admin", "==","lee@test.com");
        //Then returns a list of users of all teams that the user owns
        //Change team1 to be dynamic to all admin teams
        //Set a an array to hold list of assingess
        let assignees = [];
        //loop through every team that the logged in user is an admin of
        for(const teams of adminTeams) {
            //loop thorugh the list of users of each team that he is an admin of
            for(const assignee of teams.users) {
                //if the name does not already exist in the array add it
                if (assignees.includes(assignee) == false) {
                    assignees.push(assignee);
                }
            }
        }

        //console.log(assignees);
        res.status(200).json({assignees: assignees, message: "Assignees returned successfully"});
    }
    catch(error) {
        //return error
        res.status(401).json({error: error.message});
    }
});

/**
 * Frontend sends post data from a form to the backend that holds all the values for a task object
 * I send back a repsonse 200 if it is uploaded to firestore correctly
 * 500 if not
 */
router.post('/', async function(req,res) {
    const creationDate = new Date(); //this gets the current date and time for the task object
    //const {name, description, priority, status, teamID, dueDate, completionDate} = req.body;
    const assignee = "lee@test.com";
    const name = "Complete Login";
    const description = "Complete validation";
    const priority = 1;
    const status = 1;
    var teamID = "Frontend Team";
    const completionDate = "02/29/2024";
    const dueDate = "03/01/2024";

    //changes the team id from the name of the team to the ID
    const teamObj = await Firestore.queryDocs("teams", "name", "==", teamID);
    teamID = teamObj[0].id;
    //create a new task ovject with info received from frontend
    const task = new Task(name, assignee, description, priority, status, teamID, dueDate, completionDate, creationDate);
    const dbTask = task.firestoreConverter(); // Use the converter to ensure there are no underscores
    try {
        //uses the add doc function to add it to firestore
        await Firestore.addDoc("tasks", JSON.parse(JSON.stringify(dbTask)));
        res.status(200).json({message: "Task Uploaded to Database"});

        const assigneeDoc = await Firestore.getDocument('users', assignee);
        const assigneeName = assigneeDoc.data().firstName;

        //Use the Mailer class i set up to send email on completiong
        Mailer.sendEmail(
            assignee,
            'New Task Assignment Notification',
            `Hello, ${assigneeName}, you have a new task: ${name}. Please check your tasks list.`,
            `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: #4A4A4A;
                    margin: 0;
                    padding: 20px;
                    background-color: #F4F4F4;
                }
                .container {
                    background-color: #FFFFFF;
                    padding: 20px;
                    margin: 10px auto;
                    max-width: 600px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    text-align: center; /* Center text for all child elements */
                }
                h2 {
                    color: #333333;
                }
                p {
                    font-size: 16px;
                    line-height: 1.5;
                }
                a.button {
                    background-color: #007BFF;
                    color: #ffffff;
                    padding: 10px 15px;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                    display: inline-block; /* Adjust this if necessary */
                    margin-top: 20px;
                }
                footer {
                    font-size: 12px;
                    text-align: center; /* Ensure footer text is also centered */
                    margin-top: 20px;
                    color: #888;
                }
            </style>
            
            </head>
            <body>
                <div class="container">
                    <h2>New Task Assigned</h2>
                    <p>Hello <strong>${assigneeName}</strong>,</p>
                    <p>You have been assigned a new task. Please find the details below:</p>
                    <p><strong>Title:</strong> ${name}<br>
                       <strong>Description:</strong> ${description}</p>
                    <a href="http://localhost:3001/login" class="button">View Task</a>
                    <footer>
                        <p>If you have any questions, please do not hesitate to contact us.</p>
                        <p>© Management System Team</p>
                    </footer>
                </div>
            </body>
            </html>
            `
        );
        

    }catch(error) {
        //if there is na error it is sent back to the frontend
        res.status(500).json({message: "Task upload failed", error: error.message});
    }
}); module.exports = router;