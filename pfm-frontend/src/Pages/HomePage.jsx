import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faListDots,
  faMoneyBill,
  faMoneyBill1Wave,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ProfilePage from "./ProfilePage";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    <div>
      {/* Top navigation bar */}
      <nav className="bg-orange-500 text-white font-primaryfont flex items-center justify-between px-10 py-3">
        <div className="flex items-center space-x-5">
          <FontAwesomeIcon icon={faListDots} />
          <h1 className="text-xl font-bold font-titlefont">PFM</h1>
        </div>
        <div className="flex items-center space-x-3">
          <h1>{ user ? user.userName : "PFMUser"}</h1>
          <p className="text-orange-500 bg-orange-100 border-2 border-orange-300 rounded-full px-3 py-1">{ user ? user.userName.charAt(0) : ""}</p>
        </div>
      </nav>
      {/* Top navigation bar end */}

      {/* Sidebar */}
      <nav className="bg-orange-100 py-3 font-primaryfont">
        <ul className="flex items-center justify-around">
          <li className="flex items-center space-x-2 cursor-pointer">
            <FontAwesomeIcon icon={faUser} />
            <h1>Profile</h1>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer">
            <FontAwesomeIcon icon={faMoneyBill} />
            <h1>Income</h1>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer">
            <FontAwesomeIcon icon={faMoneyBill1Wave} />
            <h1>Expense</h1>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer">
            <FontAwesomeIcon icon={faChartBar} />
            <h1>Stats</h1>
          </li>
        </ul>
      </nav>
      {/* Sidenavabr end */}
      <section className="">
        <ProfilePage />
      </section>
    </div>
  );
};

export default HomePage;
