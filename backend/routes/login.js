const express = require('express');
const cors = require('cors');
const Authentication = require('../utilities/Authentication');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/login', function(req,res) {

});

app.post('/login', function(req, res) {
  /*try {
    const { email, password } = req.body;
    await Authentication.login(email, password);

    // Send a JSON response instead of redirecting
    res.json({ message: 'Login successful' });
  } catch(error) {
    console.error(error);
    res.status(401).json({ message: 'Login failed' });
  }*/
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});