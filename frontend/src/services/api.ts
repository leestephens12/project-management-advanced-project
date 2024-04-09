import axios from 'axios';
import {User} from "../models/User";
import {Task, TaskStatus} from "../models/Task";
import {Team} from "../models/Team";
import {Project} from "../models/Project";

const baseUrl = "http://localhost:3000";

export async function updateTask(task: Task) {
    const url = `${baseUrl}/editTask`;
    return axios.post(url, {
        ...task
    });
}

export async function getOverview() {
    const url = `${baseUrl}/getOverview`;
    return axios.get(url);
}

export async function createProject(project: {
    name: string,
    teamId: string,
    members: string[],
    startDate: string,
    endDate: string,
}) {
    const url = `${baseUrl}/addProject`;
    return axios.post(url, project);
}

export async function getProjectsByTeamId(teamId: string) {
    const url = `${baseUrl}/getProjects?teamId=${teamId}`;
    return axios.get(url);
}

export async function getProjectOverview(projectId: string) {
    const url = `${baseUrl}/projectOverview?projectId=${projectId}`;
    return axios.get(url);
}

export async function getAssignees() {
    const url = `${baseUrl}/addTask`;
    return axios.get(url);
}

export async function getAllUsers() {
    const url = `${baseUrl}/getUser`;
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

export async function getTasksByProjectId(projectId: string) {
    const url = `${baseUrl}/getTasks?projectId=${projectId}`;
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
