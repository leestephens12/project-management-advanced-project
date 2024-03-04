const express = require("express");
const router = express.Router();
const Firestore = require("../utilities/Firestore");

router.use(express.json());

router.get("/", async function (req, res) {
    let members = [];
    try {
        const users = await Firestore.getCollection("users");
        users.forEach(user => {
            members.push(user.email);
        });

        res.status(200).json({members: members});
    }catch(error) {
        res.status(500).json({error: error});
    }

});

module.exports = router; // Export the router
