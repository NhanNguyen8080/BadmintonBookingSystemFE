import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../../redux/slices/authSlice";
import { signOutUser } from "../../services/authService";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const handleLogout = async () => {
        const token = window.localStorage.getItem('token');
        const refreshToken = window.localStorage.getItem('refreshToken');
        if (!token || !refreshToken) {
            console.error('Token or RefreshToken is missing!');
            return;
        }

        try {
            await signOutUser(token, dispatch, navigate);
            console.log(location.pathname);
            // toast.success("You have signed out successfully");
            // dispatch(logout());
            // localStorage.clear();
            // navigate('/');

        } catch (error) {
            console.error('There was an error making the request!', error);
            console.error('Response data:', error.response?.data);
        }
    };

    return (
        <button onClick={handleLogout} className="logout-button text-gray-700 transition-colors duration-300 rounded-md hover:text-black hover:bg-gray-100 py-2 px-4">
            Logout
        </button>
    );
};

export default Logout;
