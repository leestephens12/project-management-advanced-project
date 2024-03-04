const admin = require("firebase-admin");
const Authentication = require("../utilities/Authentication");

async function authenticateRequest(req, res, next) {
  //get token and decode it
  const token = await Authentication.getToken();
  if (!token) {
    return res.status(500).send("Unauthorized");
  }

  try {
    // Verify the ID token and decode it
    const decodedToken = await admin.auth().verifyIdToken(token);
    // The decoded token contains user details. You can access the email like this:
    const userEmail = decodedToken.email;

    // For demonstration, attaching the entire decoded token and email to the request object
    req.user = decodedToken;
    req.email = userEmail; // Now you have the user's email attached to every request
    next(); // Proceed to the next route handler
  } catch (error) {
    console.error("Error verifying ID token:", error);
    res.status(403).send("token not wokring");
  }
}
module.exports = authenticateRequest;
