import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHouseCircleCheck, faLocationDot, faCheckToSlot, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";

export default function SidebarAdmin() {
  const user = useSelector(selectUser);

  const commonStyles = "flex items-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200";

  if (user.role === "Manager") {
    return (
      <div className="w-1/5 bg-gray-100 h-full flex flex-col items-center py-5 px-5 shadow-lg">
        <ul className="list-none w-full">
          <li className="mb-4">
            <Link to="/manager/courts" className={commonStyles}>
              <FontAwesomeIcon icon={faLocationDot} className="pr-3" />
              Quản lý sân
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/manager/timeslots" className={commonStyles}>
              <FontAwesomeIcon icon={faCheckToSlot} className="pr-3" />
              Quản lý slot
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/manager/bookings" className={commonStyles}>
              <FontAwesomeIcon icon={faCalendarCheck} className="pr-3" />
              Quản lý đặt sân
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  
  return (
    <div className="w-1/6 bg-gray-100 h-full flex flex-col items-center py-5 px-5 shadow-lg">
      <ul className="list-none w-full">
        <li className="mb-4">
          <Link to="/admin/accounts" className={commonStyles}>
            <FontAwesomeIcon icon={faUsers} className="pr-3" />
            Accounts
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/admin/centers" className={commonStyles}>
            <FontAwesomeIcon icon={faHouseCircleCheck} className="pr-3" />
            Centers
          </Link>
        </li>
      </ul>
    </div>
  );
}