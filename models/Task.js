const Firestore = require('../utilities/Firestore');

class Task {

    constructor(name, assignee, description, status, dueDate, completionDate) {
        this.name = name;
        this.assignee = assignee;
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
        this.completionDate = completionDate;

    }


} module.exports = Task;