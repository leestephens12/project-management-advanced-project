const express = require('express');
const cors = require('cors');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const getTasksRouter = require('./routes/getTasks');
const addTaskRouter = require('./routes/addTask');
const editTaskRouter = require('./routes/editTask');
const getTeamsRouter = require('./routes/getTeams');
const createTeamRouter = require('./routes/createTeam');
const deleteTaskRouter = require('./routes/deleteTask');

const app = express();

app.use(express.json());
app.use(cors({
  methods: ['GET', 'POST', 'OPTIONS']
}));

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/getTasks', getTasksRouter);
app.use('/addTask', addTaskRouter);
app.use('/editTask', editTaskRouter);
app.use('/getTeams', getTeamsRouter);
app.use('/createTeam', createTeamRouter);
app.use('/deleteTask', deleteTaskRouter);



app.listen(3000, () => {
console.log('Server is running on http://localhost:3000');
});

module.exports = app;
