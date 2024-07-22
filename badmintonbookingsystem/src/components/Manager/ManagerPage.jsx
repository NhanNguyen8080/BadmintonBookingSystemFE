import React from "react";
import HeaderAdmin from "../../layouts/HeaderAdmin";
import { useLocation } from "react-router-dom";
// import Centers from "./Center/Center";
import Courts from "./Court/Court";
import SidebarAdmin from "../../layouts/Sidebar";
import TimeSlots from "./TimeSlot/TimeSlot";
import Bookings from "./Booking/Booking";

export default function ManagerPage() {
  const location = useLocation()
  let content;
  if (location.pathname === "/manager/courts") {
    content = <Courts />;
  }
  else if (location.pathname === "/manager/timeslots") {
    content = <TimeSlots />;
  }
  else {
    content = <Bookings />
  }

  return (
    <>
      <HeaderAdmin />
      <div className='flex h-full'>
        <SidebarAdmin />
        <div className='flex-grow border-l-2'>
          {content}
        </div>
      </div>
    </>
  );
}
// admin@gmail.com
// admin123