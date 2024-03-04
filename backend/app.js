const express = require('express');
const cors = require('cors');
const session = require("express-session");
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const getTasksRouter = require('./routes/getTasks');
const addTaskRouter = require('./routes/addTask');
const editTaskRouter = require('./routes/editTask');
const getTeamsRouter = require('./routes/getTeams');
const createTeamRouter = require('./routes/createTeam');
const deleteTaskRouter = require('./routes/deleteTask');
const authenticateRequest = require('./middleware/tokenAuth');

const app = express();


app.use(express.json());
app.use(cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true, // To allow sending cookies over CORS
}));

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/getTasks', authenticateRequest, getTasksRouter);
app.use('/addTask', authenticateRequest, addTaskRouter);
app.use('/editTask', editTaskRouter);
app.use('/getTeams', authenticateRequest, getTeamsRouter);
app.use('/createTeam', createTeamRouter);
app.use('/deleteTask', deleteTaskRouter);



app.listen(3000, () => {
console.log('Server is running on http://localhost:3000');
});

module.exports = app;
