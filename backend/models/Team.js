class Team {
    constructor(name, description, admin, users, tasks) {
        this.name = name;
        this.description = description;
        this.admin = admin;
        this.users = users;
        this.tasks = tasks;
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

    firestoreConverter() {
        return {
            name: this._name,
            description: this._description,
            admin: this._admin,
            users: this._users,
            tasks: this._tasks,
        };
    }
} module.exports = Team;