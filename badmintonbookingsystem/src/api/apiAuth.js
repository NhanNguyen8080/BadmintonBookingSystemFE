import axios from 'axios';

const API_BASE_URL = "https://badmintonbookingsystem-d2d306159d50.herokuapp.com/api";

export const signIn = (email, password) => {
    return axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
    }, {
        headers: {
            'accept': "*/*"
        }
    });
};

export const signUp = (userData) => {
    return axios.post(`${API_BASE_URL}/register`, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const signOut = (token) => {
    return axios.delete(`${API_BASE_URL}/revoke`, {
        headers: {
            'Accept': '*/*',
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
};

export const refreshTokenAPI = (accessToken, refreshToken) => {
    return axios.post(`${API_BASE_URL}/refresh-token`, {
        accessToken,
        refreshToken,
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

