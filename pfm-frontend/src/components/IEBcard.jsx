import React, { useEffect, useState } from "react";
import DashBoardChart from "./DashBoardChart";
import { Link } from "react-router-dom";
import { userProfile } from "../services/AuthServices";
import { useSelector } from "react-redux";

const IEBcard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  const [tabIndex, setTabIndex] = useState(1);

  const tabClick = (tab) => {
    setTabIndex(tab);
  };

  const fetchProfile = () => {
    const payload = {
      id: userId
    }
    const response = userProfile(payload);
    
    if(response?.status === 200) {
      
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="mx-5 xl:mx-10">
      <div className="grid grid-row-3 gap-3 xl:grid-cols-3 xl:gap-[50px] mt-5">
        <Link
          to="#"
          onClick={() => tabClick(1)}
          className="bg-green-100 px-5 py-4 rounded-md"
        >
          <h1 className="font-titlefont">Total Income</h1>
          <h1 className="text-3xl font-primaryfont font-bold text-green-500">
            10000
          </h1>
        </Link>
        <Link
          to="#"
          onClick={() => tabClick(2)}
          className="bg-red-100 px-5 py-4 rounded-md"
        >
          <h1 className="font-titlefont">Total Expense</h1>
          <h1 className="text-3xl font-primaryfont font-bold text-red-500">
            10000
          </h1>
        </Link>
        <Link
          to="#"
          onClick={() => tabClick(3)}
          className="bg-blue-100 px-5 py-4 rounded-md"
        >
          <h1 className="font-titlefont">Total Balance</h1>
          <h1 className="text-3xl font-primaryfont font-bold text-blue-500">
            10000
          </h1>
        </Link>
      </div>
      <DashBoardChart tabIndex={tabIndex} />
    </div>
  );
};

export default IEBcard;
