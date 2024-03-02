const express = require('express');
const router = express.Router(); // Use Router instead of express()
const Authentication = require('../utilities/Authentication');
const Firestore = require('../utilities/Firestore');
const Task = require('../models/Task');

router.use(express.json());

router.post('/', async function(req, res) {
  //const id = req.body;
  const id = "n70SkQoGWWSzM3352HGZ";
  try {
      //uses the delete task function in firestore utility to delte it from db
      await Firestore.deleteDoc("tasks", id);
  }catch(error) {
      res.status(400).json({error: error});
  }
});

module.exports = router; // Export the router