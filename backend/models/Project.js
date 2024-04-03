class Project {
    constructor (name, projectId, teamId, startDate, endDate, tasks, members) {
        this.name = name;
        this.projectId = projectId;
        this.teamId = teamId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.tasks = tasks;
        this.members = members;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    } 

    get projectId() {
        return this._projectId;
    }

    set projectId(value) {
        this._projectId = value;
    } 

    get teamId() {
        return this._teamId;
    }

    set teamId(value) {
        this._teamId = value;
    } 

    get startDate() {
        return this._startDate;
    }

    set startDate(value) {
        this._startDate = value;
    } 

    get endDate() {
        return this._endDate;
    }

    set endDate(value) {
        this._endDate = value;
    } 

    get members() {
        return this._members;
    }

    set members(value) {
        this._members = value
    }

    get tasks() {
        return this._tasks;
    }

    set tasks(value) {
        this._tasks = value;
    }

    firestoreConverter() {
        return {
          name: this._name,
          projectId: this._projectId,
          teamId: this._teamId,
          startDate: this._startDate,
          endDate: this._endDate,
          members: this._members,
          tasks: this._tasks
        };
      }


} module.exports = Project;