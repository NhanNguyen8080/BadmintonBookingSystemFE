import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faMagnifyingGlass,
    faBell,
    faCaretDown,
} from "@fortawesome/free-solid-svg-icons";


import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Auth/Logout";



function HeaderAdmin() {

    const [open, setOpen] = useState(false);
    const user = useSelector(selectUser)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    return (
        <div className="justify-between flex items-center py-5 space-x-4 border-2">
            <div className="pl-10">
                <img
                    src="/images/logo.png"
                    alt="badmintonShop"
                    className="object-scale-down w-14"
                />
            </div>
            <div className="flex">
                <div className="flex items-center pr-5">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
                </div>
                <div className="flex items-center pr-5">
                    <FontAwesomeIcon icon={faBell} className="text-xl" />
                </div>
                <div className="w-fit flex items-center rounded font-bold pr-5 bg-transparent">
                    <p className="text-black-500 pr-2">{user.role}:</p>
                    <p className="text-orange-500">{user.name}</p>
                    <Logout />
                    {/* <button
                            onClick={handleLogout}
                            className="logout-button text-gray-700 transition-colors duration-300 rounded-md hover:text-black hover:bg-gray-100 py-2 px-4"
                            
                        >
                            Logout
                        </button> */}
                </div>
            </div>

        </div>
    );
}

export default HeaderAdmin;
