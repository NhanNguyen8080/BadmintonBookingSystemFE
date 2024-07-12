import { refreshTokenAPI, signIn, signOut, signUp } from '../api/apiAuth';
import { jwtDecode } from 'jwt-decode';
import { login, logout } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

export const authenticatedUser = async (dispatch, data) => {
    try {
        const response = await signIn(data.email, data.password);
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        const decoded = jwtDecode(response.data.accessToken);
        dispatch(login(decoded));
        toast.success("Login successfully!")
        return decoded;
    } catch (error) {
        console.error("Login failed", error);
        toast.error("Login failed!");
        throw error;
    }
}

export const signUpUser = async (userData) => {
    try {
        const response = await signUp(userData);
        return response.data;
    } catch (error) {
        console.error('Error during sign-up:', error);
        throw error;
    }
};

export const signOutUser = async (data) => {
    try {
        const response = await signOut(data);
        return response;
    } catch (error) {
        console.error('Error during sign-out:', error);
        throw error;
    }
};


export const checkAndRefreshToken = async () => {
    let token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!token || !refreshToken) {
        throw new Error('No token or refresh token found');
    }

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
        try {
            const response = await refreshTokenAPI(token, refreshToken);
            const newToken = response.data.data.token;
            const newRefreshToken = response.data.data.refreshToken;
            localStorage.setItem('token', newToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            token = newToken; // update token to return the new token
        } catch (error) {
            console.error('Token refresh failed', error);
            throw error;
        }
    }

    return token;
};