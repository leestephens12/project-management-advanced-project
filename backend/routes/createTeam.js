const express = require('express');
const router = express.Router(); // Use Router instead of express()
const Mailer = require('../utilities/Mailer');
const Authentication = require('../utilities/Authentication');
const Firestore = require('../utilities/Firestore');
const Team = require('../models/Team');

router.use(express.json());

router.post('/', async function(req,res) {

    //uncommenting this will get all the fields passed through the form on the front end
    //Doesn't get the tasks variabel as it will start out empty and tasks can be added after
    //const {name, description, admin, tasks} = req.body;
    const users = ["donotreply.mangement.system@gmail.com"]; //move into req.body section
    const name = "Frontend Team";
    const description = "Frontend Dev group";
    const admin = "lee@test.com";
    const tasks = [];

    const team = new Team(name, description, admin, users, tasks);
    //converts the team object to be accepted by firebase
    const dbTeam = team.firestoreConverter();
    try {
        //Adds the team to the firestore database
        await Firestore.addDoc("teams", JSON.parse(JSON.stringify(dbTeam)), name);

        users.forEach(user => {
            Mailer.sendEmail(
                user,
                "You Have Been Added to a New Team",
                "Hey " + user + " you have now been added to the team: " + name + " by: " + admin,
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
                        <h2>Welcome to the Team!</h2>
                        <p>Hey <span style="font-weight:bold;">${user}</span>,<br><br>You have now been added to the team: <span style="font-weight:bold;">${name}</span> by: <span style="font-weight:bold;">${admin}</span>.</p>
                        <!-- Include any additional content or links/buttons here -->
                        <footer>
                            Regards,<br>
                            The Team
                        </footer>
                    </div>
                </body>
                </html>

                `,
            );

        });
    res.status(200).json({message: "Team created successfully!"});

    }catch(error) {
        res.status(400).json({message: error.message});
    }
}); module.exports = router;