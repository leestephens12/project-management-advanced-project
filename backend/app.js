const express = require('express');
const cors = require('cors');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const dashboardRouter = require('./routes/dashboard');
const addTaskRouter = require('./routes/addTask');

const app = express();

app.use(express.json());
app.use(cors({
  methods: ['GET', 'POST', 'OPTIONS']
}));

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/dashboard', dashboardRouter);
app.use('/addTasks', addTaskRouter);



app.listen(3000, () => {
console.log('Server is running on http://localhost:3000');
});

module.exports = app;