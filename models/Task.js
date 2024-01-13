class Task {

    constructor(name, assignee, description, status, dueDate, completionDate) {
        this.name = name;
        this.assignee = assignee;
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
        this.completionDate = completionDate;
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
        this._description = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
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
    

} module.exports = Task;