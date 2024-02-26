import axios from 'axios';
import {User} from "../models/User";
import {Task} from "../models/Task";

const baseUrl = "http://localhost:3000";

export async function getAssignees() {
    const url = `${baseUrl}/addTask`;
    return axios.get(url);
}

export async function getTeams() {
    const url = `${baseUrl}/teamDashboard`;
    return axios.get(url);
}

export async function createTask(task: Task) {
    const url = `${baseUrl}/addTask`
    return axios.post(url, task);
}

export async function getDashboard() {
    const url = `${baseUrl}/dashboard`;
    return axios.get(url);
}

export async function loginUser(email: string, password: string) {
    const url = `${baseUrl}/login`;
    const data = {
        email,
        password,
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
