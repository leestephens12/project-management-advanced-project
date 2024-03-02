const express = require("express");
const router = express.Router();
const Firestore = require("../utilities/Firestore");

router.use(express.json());

/**
 * Get Request from frontend when the Team tab is loaded, it returns a
 * list of team objects that the user is a part of
 */
router.get("/", async function (req, res) {
  try {
    //call the query docs function and returns a list of tasks based off of the logged in user
    //const email = await Authentication.getEmail(); /**turn back on when teseting is complete  */
    const teams = await Firestore.queryDocs(
      "teams",
      "users",
      "array-contains",
      "lee@test.com"
    );
    const adminTeams = await Firestore.queryDocs(
      "teams",
      "admin",
      "==",
      "lee@test.com"
    );
    res
      .status(200)
      .json({
        teams: teams,
        adminTeams: adminTeams,
        message: "Teams retrieved successfully",
      }); //sends the list of teams to the front end
  } catch (error) {
    //if there is an error retirieving the data from firestore it will throw an error
    console.log(error + error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; // Export the router
