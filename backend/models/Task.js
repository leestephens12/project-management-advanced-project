class Task {

    constructor(name, assignee, description, status, teamID, dueDate, completionDate, creationDate) {
        this.name = name;
        this.assignee = assignee;
        this.description = description;
        this.status = status;
        this.teamID = teamID;
        this.dueDate = dueDate;
        this.completionDate = completionDate;
        this.creationDate = creationDate;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get assignee() {
        return this._assignee;
    }

    set assignee(value) {
        this._assignee = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        if (this.description == "") {
            throw "The description cannot be empty";
        }
        else {
            this._description = value;
        }
    }

    get status() {
        return this._status;
    }

    set status(value) {
        if (this.statusOptions().includes(value)) {
            this._status = value;
        }
        else {
            throw "This is not a valid value for the Status Option";
        }
    }

    get teamID() {
        return this._teamID
    }

    set teamID(value) {
        this._teamID = value;
    }


    get dueDate() {
        return this._dueDate;
    }

    set dueDate(value) {
        this._dueDate = value;
    }

    get completionDate() {
        return this._completionDate;
    }

    set completionDate(value) {
        this._completionDate = value;
    }

    get creationDate() {
        return this._creationDate;
    }

    set creationDate(value) {
        this._creationDate = value;
    }

    statusOptions() {
        return ["In Progress", "Not Started", "Complete", "On Hold", "in progress", "not started", "complete", "on hold"];
    }
    

} module.exports = Task;