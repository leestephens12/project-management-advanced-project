import axios from 'axios';

const baseUrl = "http://localhost:5000";

export function loginUser(email: string, password: string) {
    const url = `${baseUrl}/login`;
    const data = {
        email: email,
        password: password
    };

    axios.post(url, data)
        .then(response => {
            console.log('Login successful:', response.data);
        })
        .catch(error => {
            console.error('Login error:', error);
        });
}
