const express = require('express');
const cors = require('cors');
const Authentication = require('../utilities/Authentication');

const app = express();

app.use(express.json());
app.use(cors({
  methods: ['GET', 'POST', 'OPTIONS'], // Include other methods as needed
}));

app.get('/login', function(req,res) {

});

app.post('/login', async function(req, res) {
  try {
    const { email, password } = req.body;
    await Authentication.login(email, password);
    console.log('user logged in succefully');
    // Send a JSON response instead of redirecting
    res.status(200).json({message: 'Login successful'});
  } catch(error) {
    console.error(error);
    res.status(401).json({ message: 'Login failed', error: error.message});
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

module.exports = app;