const express = require("express");
const router = express.Router(); // Use Router instead of express()
const Authentication = require("../utilities/Authentication");
const Firestore = require("../utilities/Firestore");
const User = require("../models/User");

router.use(express.json());

router.post("/", async function (req, res) {
  const { firstName, lastName, email, password, occupation, company, admin } =
    req.body;

  try {
    //try to authenticate the user via the fucntion declared in authenticaion classs
    await Authentication.register(email, password);
    //set user to the data retrived from the front end formm
    const user = new User(
      firstName,
      lastName,
      occupation,
      company,
      admin,
      email,
      "null"
    );
    const dbUser = user.firestoreConverter(); //use the converter method in the user class to get rid of underscores
    const docRef = await Firestore.getDocRef("users");
    try {
      //attempt to add the user to the firestore db
      await Firestore.addDocCustomID(
        "users",
        JSON.parse(JSON.stringify(dbUser)),
        email
      );
      res.status(200).json({ message: "User Registered Succesfully" });
    } catch (error) {
      //if there is an error out put it and return to previous page
      res
        .status(401)
        .json({
          message: "Adding Object to Firestore failed",
          error: error.message,
        });
    }
  } catch (error) {
    //if there is an error output it and sen them back to register page
    res
      .status(401)
      .json({ message: "Registration failed", error: error.message });
  }
});

module.exports = router; // Export the router
