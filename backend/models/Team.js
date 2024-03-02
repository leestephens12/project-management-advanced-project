class Team {
  constructor(name, description, admin, users, tasks, teamID) {
    this.name = name;
    this.description = description;
    this.admin = admin;
    this.users = users;
    this.tasks = tasks;
    this.teamID = teamID;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  get admin() {
    return this._admin;
  }

  set admin(value) {
    this._admin = value;
  }

  get users() {
    return this._users;
  }

  set users(value) {
    this._users = value;
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(value) {
    this._tasks = value;
  }

  get teamID() {
    return this._teamID;
  }

  set teamID(value) {
    this._teamID = value;
  }

  firestoreConverter() {
    return {
      name: this._name,
      description: this._description,
      admin: this._admin,
      users: this._users,
      tasks: this._tasks,
      teamID: this._teamID,
    };
  }
}
module.exports = Team;
