const express = require('express');
const router = express.Router();
const Authentication = require('../utilities/Authentication');
const User = require('../models/User');
const Firestore = require('../utilities/Firestore');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/', async function(req, res, next) {
  // retrieve email and password passed through the form
  const email = "test2@test.com";
  const password = "test123";
  try {
    //try to authenticate the user via the fucntion declared in authenticaion classs
    await Authentication.register(email, password);
    //set user to the data retrived from the front end formm
    const user = new User("Lee", "Stephens", "Developer", "Jirs", "Samuel", "test@test.com", "Null");
    try {
      //attempt to add the user to the firestore db
      await Firestore.addDocCustomID("users", JSON.parse(JSON.stringify(user)), email);
      res.redirect('login');
    }catch(error) {
      //if there is an error out put it and return to previous page
      console.log("error adding user to db: " + error);
      res.redirect('/register');
    }
  }catch(error) {
    //if there is an error output it and sen them back to register page
    console.log(error);
    res.redirect('/register');
  }
});
module.exports = router;