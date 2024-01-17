const express = require('express');
const router = express.Router(); // Use Router instead of express()
const Authentication = require('../utilities/Authentication');

router.use(express.json());

router.get('/', function(req,res) {
  // Your GET login logic here
});

router.post('/', async function(req, res) {
  try {
    const { email, password } = req.body;
    await Authentication.login(email, password);
    console.log(await Authentication.getUser());
    console.log('user logged in successfully');
    res.status(200).json({ message: 'Login successful' });
  } catch(error) {
    console.error(error);
    res.status(401).json({ message: 'Login failed', error: error.message });
  }
});

module.exports = router; // Export the router