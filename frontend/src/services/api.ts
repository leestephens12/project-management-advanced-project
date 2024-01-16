import axios from 'axios';

const baseUrl = "http://localhost:3000";

export async function loginUser(email: string, password: string) {
    const url = `${baseUrl}/login`;
    const data = {
        email: email,
        password: password
    };

    return axios.post(url, data);
}

export async function registerUser(email: string, password: string) {
    const url = `${baseUrl}/register`;
    const data = {
        email: email,
        password: password
    };

    return axios.post(url, data);
}
