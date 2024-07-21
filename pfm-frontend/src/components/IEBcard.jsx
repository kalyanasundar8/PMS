import React from "react";

const IEBcard = () => {
  return (
    <div className="mx-5 xl:mx-10">
      <div className="grid grid-rows-3 gap-3 xl:grid-cols-3 xl:gap-[50px] mt-5">
        <section className="bg-green-100 px-5 py-4 rounded-md">
          <h1 className="font-titlefont">Total Income</h1>
          <h1 className="text-3xl font-primaryfont font-bold text-green-500">10000</h1>
        </section>
        <section className="bg-red-100 px-5 py-4 rounded-md">
          <h1 className="font-titlefont">Total Expense</h1>
          <h1 className="text-3xl font-primaryfont font-bold text-red-500">10000</h1>
        </section>
        <section className="bg-blue-100 px-5 py-4 rounded-md">
          <h1 className="font-titlefont">Total Balance</h1>
          <h1 className="text-3xl font-primaryfont font-bold text-blue-500">10000</h1>
        </section>
      </div>
    </div>
  );
};

export default IEBcard;
