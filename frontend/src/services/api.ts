import axios from 'axios';
import {User} from "../models/User";
import {Task} from "../models/Task";
import {Team} from "../models/Team";

const baseUrl = "http://localhost:3000";

export async function editTask(task: Task) {
    const url = `${baseUrl}/editTask`;
    return axios.post(url);
}

export async function getAssignees() {
    const url = `${baseUrl}/addTask`;
    return axios.get(url);
}

export async function createTeam(team: Team) {
    const url = `${baseUrl}/createTeam`
    return axios.post(url, team);
}

export async function getTeams() {
    const url = `${baseUrl}/getTeams`;
    return axios.get(url);
}

export async function createTask(task: Task) {
    const url = `${baseUrl}/addTask`
    return axios.post(url, task);
}

export async function getDashboard() {
    const url = `${baseUrl}/getTasks`;
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
