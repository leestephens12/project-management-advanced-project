import axios from 'axios';
import {User} from "../models/User";

const baseUrl = "http://localhost:3000";

export async function getDashboard() {
    const url = `${baseUrl}/dashboard`;
    return axios.get(url);
}

export async function loginUser(email: string, password: string) {
    const url = `${baseUrl}/login`;
    const data = {
        email: email,
        password: password
    };

    return axios.post(url, data);
}

export async function registerUser(user: User) {
    const url = `${baseUrl}/register`;
    const data = {
        admin: user.admin,
        firstName: user.firstName,
        lastName: user.lastName,
        occupation: user.occupation,
        company: user.company,
        email: user.email,
        password: user.password,
    };

    return axios.post(url, data);
}
