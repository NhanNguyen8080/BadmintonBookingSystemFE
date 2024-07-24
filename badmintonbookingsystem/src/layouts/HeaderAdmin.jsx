import React, { useEffect, useState } from "react";
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
import { fetchBadmintonCenterByManager } from "../services/centerService";

function HeaderAdmin() {
    const [center, setCenter] = useState(null);
    const [open, setOpen] = useState(false);
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCenterData = async () => {
            try {
                if (token) {
                    const centerData = await fetchBadmintonCenterByManager(token);
                    console.log('Fetched Center Data:', centerData);
                    if (centerData) {
                        setCenter(centerData[0]);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchCenterData();
    }, [token]);

    useEffect(() => {
        console.log('Center State Updated:', center);
    }, [center]); //add some logging and ensure the state is updated correctly

    if (user.role === "Manager") {
        return (
            <div className="justify-between flex items-center py-5 space-x-4 border-2">
                <div className="pl-10 flex">
                    <img
                        src="/images/logo.png"
                        alt="badmintonShop"
                        className="object-scale-down w-14 mr-60"
                    />
                    <div className="w-fit flex items-center rounded font-bold bg-transparent">
                        <p className="text-black-500 pr-2 text-lg">Sân cầu lông: </p>
                        {center && <p className="text-black-500">{center.name}</p>}
                    </div>
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
                    </div>
                </div>
            </div>
        );
    }

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
                </div>
            </div>
        </div>
    );
}

export default HeaderAdmin;
