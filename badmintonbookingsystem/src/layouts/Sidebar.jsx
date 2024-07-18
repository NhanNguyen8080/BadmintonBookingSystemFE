import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHouseCircleCheck } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

export default function SidebarAdmin() {
    return (
        <div className="w-1/6 flex flex-col items-center py-5 px-5">
          <ul className="list-none">
            <li>
              <Link to="/admin/accounts">
              <FontAwesomeIcon icon={faUsers} className="pr-3" />
                Accounts
              </Link>
            </li>
            <li>
              <Link to="/admin/centers">
              <FontAwesomeIcon icon={faHouseCircleCheck} className="pr-3" />
                Centers
              </Link>
            </li>
          </ul>
        </div>
      );
}