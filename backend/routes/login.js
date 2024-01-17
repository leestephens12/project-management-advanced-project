const express = require('express');
const router = express.Router(); // Use Router instead of express()
const Authentication = require('../utilities/Authentication');
const Firestore = require('../utilities/Firestore');

router.use(express.json());

router.get('/', function(req,res) {
  // Your GET login logic here
});

router.post('/', async function(req, res) {
  try {
    const { email, password } = req.body;
    await Authentication.login(email, password);
    try {
      const uid = await Authentication.getUserID();
      try {
        const token = await Firestore.createToken(uid);
        res.send({token});
      }catch(error) {
        res.status(500).json({message: "Error creating a token", error: error.message});
      }
    }
     catch(error) {
      res.status(500).json({message: "Could not retrieve User ID", error: error.message});
     }
    console.log('user logged in successfully');
    res.status(200).json({ message: 'Login successful' });
  } catch(error) {
    console.error(error);
    res.status(401).json({ message: 'Login failed', error: error.message });
  }
});

module.exports = router; // Export the router