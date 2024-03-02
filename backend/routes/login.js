const express = require("express");
const router = express.Router();
const Authentication = require("../utilities/Authentication");

router.use(express.json());

router.post("/", async function (req, res) {
  try {
    const { email, password } = req.body;
    await Authentication.login(email, password);
    res.status(200).json({ message: "Login successful" }); //out put to front end a successful login
  } catch (error) {
    res.status(401).json({ message: "Login failed", error: error.message }); //output an unseccesful login
  }
});

module.exports = router; // Export the router
