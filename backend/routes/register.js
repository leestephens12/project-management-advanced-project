const express = require('express');
const router = express.Router(); // Use Router instead of express()
const Authentication = require('../utilities/Authentication');

router.use(express.json());

router.get('/', function(req,res) {
  // Your GET login logic here
});

router.post('/', async function(req, res) {
  const email = "test2@test.com";
  const password = "test123";
  const uid = await Authentication.getUID();

  try {
    //try to authenticate the user via the fucntion declared in authenticaion classs
    await Authentication.register(email, password);
    //set user to the data retrived from the front end formm
    const user = new User("Lee", "Stephens", "Developer", "Jirs", "Samuel", "test@test.com", "Null");
    try {
      //attempt to add the user to the firestore db
      await Firestore.addDocCustomID("users", JSON.parse(JSON.stringify(user)), uid);
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

module.exports = router; // Export the router