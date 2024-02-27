class Task {
    constructor(name, assignee, description, priority, status, teamID, dueDate, completionDate, creationDate) {
        this.name = name;
        this.assignee = assignee;
        this.description = description;
        this.priority = priority;
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

    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
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

    /**
     * 
     * @returns A task that doesnt not have underscores
     * **Even though underscores are good coding practice for private instance variables
     */
    firestoreConverter() {
        return {
            name: this._name,
            assignee: this._assignee,
            description: this._description,
            priority: this._priority,
            status: this._status,
            teamID: this._teamID,
            dueDate: this._dueDate,
            completionDate: this._completionDate,
            creationDate: this._creationDate
        };
    }
} module.exports = Task;