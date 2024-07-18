import React from "react";
import HeaderAdmin from "../../layouts/HeaderAdmin";
import SidebarAdmin from "../../layouts/Sidebar";
import Accounts from "./Account/Account";
import { useLocation } from "react-router-dom";
import Centers from "./Center/Center";

export default function AdminPage() {
  const location = useLocation()
  let content;
  if (location.pathname === "/admin/accounts") {
    content = <Accounts />;
  } else {
    content = <Centers />;
  }

  return (
    <>
    <HeaderAdmin/>
      <div className='flex h-full'>
        <SidebarAdmin/>
        <div className='flex-grow border-l-2'>
         {content}
        </div>
        </div>
    </>
  );
}
// admin@gmail.com
// admin123