const express = require('express');
const router = express.Router(); // Use Router instead of express()
const Authentication = require('../utilities/Authentication');
const Firestore = require('../utilities/Firestore');
const User = require('../models/User');

router.use(express.json());

router.get('/', function(req,res) {
  // Your GET login logic here
});

router.post('/', async function(req, res) {
  const {email, password} = req.body;

  try {
    //try to authenticate the user via the fucntion declared in authenticaion classs
    const uid = await Authentication.register(email, password);
    //set user to the data retrived from the front end formm
    const user = new User("Lee", "Stephens", "Developer", "Jirs", "Samuel", "test@test.com", "Null");
    try {
      //attempt to add the user to the firestore db
      await Firestore.addDocCustomID("users", JSON.parse(JSON.stringify(user)), email);
      res.status(200).json({message : "User Registered Succesfully"});
    }catch(error) {
      //if there is an error out put it and return to previous page
      res.status(401).json({message : "Adding Object to Firestore failed", error : error.message});
    }
  }catch(error) {
    //if there is an error output it and sen them back to register page
    res.status(401).json({message : "Registration failed", error : error.message});
  }
});

module.exports = router; // Export the router