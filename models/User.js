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
        return this.firstName;
    }

    set firstName(value) {
        this.firstName = value;
    }

    get lastName() {
        return this.lastName;
    }

    set lastName(value) {
        this.lastName = value;
    }

    get occupation() {
        return this.occupation;
    }

    set occupation(value) {
        this.occupation = value;
    }

    get company() {
        return this.company;
    }

    set company(value) {
        this.company = value;
    }

    get admin() {
        return this.admin;
    }

    set admin(value) {
        this.admin = value;
    }

    get email() {
        return this.email;
    }

    set email(value) {
        this.email= value;
    }

    get teams() {
        return this.teams;
    }

    set teams(value) {
        this.teams = value;
    }

    
} module.exports = User;