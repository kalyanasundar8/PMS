import React, { useState } from "react";
import DashBoardChart from "./DashBoardChart";
import {Link} from "react-router-dom";

const IEBcard = () => {

  const [tabIndex, setTabIndex] = useState(1);

  const tabClick = (tab) => {
    setTabIndex(tab)
  }

  console.log(tabIndex)

  return (
    <div className="mx-5 xl:mx-10">
      <div className="grid grid-row-3 gap-3 xl:grid-cols-3 xl:gap-[50px] mt-5">
        <Link to="#" onClick={() => tabClick(1)} className="bg-green-100 px-5 py-4 rounded-md">
          <h1 className="font-titlefont">Total Income</h1>
          <h1 className="text-3xl font-primaryfont font-bold text-green-500">10000</h1>
        </Link>
        <Link  to="#" onClick={() => tabClick(2)} className="bg-red-100 px-5 py-4 rounded-md">
          <h1 className="font-titlefont">Total Expense</h1>
          <h1 className="text-3xl font-primaryfont font-bold text-red-500">10000</h1>
        </Link>
        <Link  to="#" onClick={() => tabClick(3)} className="bg-blue-100 px-5 py-4 rounded-md">
          <h1 className="font-titlefont">Total Balance</h1>
          <h1 className="text-3xl font-primaryfont font-bold text-blue-500">10000</h1>
        </Link>
      </div>
      <DashBoardChart tabIndex={tabIndex}/>
    </div>
  );
};

export default IEBcard;
