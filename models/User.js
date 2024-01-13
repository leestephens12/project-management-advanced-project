class User {
    constructor(firstName, lastName, occupation, company, admin, email, teams) {
        this.firstName = firstName;
        this.lastName = lastName
        this.occupation = occupation;
        this.company = company;
        this.admin = admin;
        this.email = email;
        this.teams = teams;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get occupation() {
        return this._occupation;
    }

    set occupation(value) {
        this._occupation = value;
    }

    get company() {
        return this._company;
    }

    set company(value) {
        this._company = value;
    }

    get admin() {
        return this._admin;
    }

    set admin(value) {
        this._admin = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email= value;
    }

    get teams() {
        return this._teams;
    }

    set teams(value) {
        this._teams = value;
    }

    
} module.exports = User;