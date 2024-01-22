class Task {

    constructor(name, assignee, description, status, dueDate, completionDate, creationDate) {
        this.name = name;
        this.assignee = assignee;
        this.description = description;
        this.status = status;
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
        /**
         * Regex for an email address:
         * / / -> enclosed by these slashes
         * ^ start of the string has to match either lower case letter, upper case or numbers 0-9
         * has to be followed by a @ symbol then followed by lower, upper case or nubmers
         * has to be followed by a period with a trailing 2-4 letters like .com or .ca
         * $ end of string
         */
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2-4}$/;
        if (value.match(emailRegex)) {
            this._assignee = value;
        }
        else {
            throw "This email does not follow the proper format";
        }
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
        return ["In Progress", "Not Started", "Complete", "On Hold"];
    }
    

} module.exports = Task;