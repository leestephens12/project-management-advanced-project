const express = require('express');
const router = express.Router(); // Use Router instead of express()
const Authentication = require('../utilities/Authentication');
const Firestore = require('../utilities/Firestore');
const Team = require('../models/Team');

router.use(express.json());

router.post('/', async function(req,res) {

    //uncommenting this will get all the fields passed through the form on the front end
    //Doesn't get the tasks variabel as it will start out empty and tasks can be added after
    //const {name, description, admin, users} = req.body;

    const team = new Team("Test", "Test Desc", "lee@test.com", ["sam@test.com", "testuser@test.com"], []);
    const dbTeam = team.firestoreConverter();
    try {
        Firestore.addDoc("teams", JSON.parse(JSON.stringify(dbTeam)));
        res.status(200).json({message: "Team created successfully!"});

    }catch(error) {
        res.status(400).json({message: error.message});
    }

}); module.exports = router;