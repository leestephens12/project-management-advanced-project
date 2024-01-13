const express = require('express');
const router = express.Router();
const Authentication = require('../utilities/Authentication');
const Firestore = require('../utilities/Firestore');

router.get('/', async function(req, res, next) {
    const email = Authentication.getUserEmail();
    //Fethces tasks from firestore via the email of logged in user
    const tasks = await Firestore.getTasks(email);
    console.log("tasks: " + tasks);
    //passes task list through to the front end
    res.render('index', {tasks});
});

module.exports = router;
