const express = require('express');
const cors = require('cors');
const loginRouter = require('./routes/login'); // Path to your login route file
const registerRouter = require('./routes/register'); // Path to your login route file

const app = express();

app.use(express.json());
app.use(cors({
  methods: ['GET', 'POST', 'OPTIONS']
}));

app.use('/login', loginRouter);
app.use('/register', registerRouter);



app.listen(3000, () => {
console.log('Server is running on http://localhost:3000');
});

module.exports = app;