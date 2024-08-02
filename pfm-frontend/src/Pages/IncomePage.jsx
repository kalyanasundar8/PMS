import React from "react";

const IncomePage = () => {
  return (
    <div className="flex flex-col items-start justify-center mx-[200px] mt-10">
      <main className="">
        <form className="flex items-center space-x-7">
          <div>
            <input
              type="text"
              placeholder="Amount"
              className="border-2 rounded-md border-gray-200 px-2 py-1 "
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Source"
              className="border-2 rounded-md border-gray-200 px-3 py-1 "
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Description"
              className="border-2 rounded-md border-gray-200 px-3 py-1 "
            />
          </div>
          <div>
            <input
              type="date"
              className="border-2 rounded-md border-gray-200 px-3 py-1 "
            />
          </div>
          <button className="bg-[#0E21A0] text-white font-bold px-5 py-1 rounded-md hover:bg-[#4D2DB7]">
            Add
          </button>
        </form>
      </main>
      <main className="mt-10 w-[100%]">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Incomes</h1>
          <form className="flex items-center space-x-5">
            <p>Filter</p>
            <select name="" id="">
              <option value="">Freelance</option>
            </select>
            <input type="date" />
          </form>
        </div>
        <section className="mt-10">
          <h1>List</h1>
          <h1>chart</h1>
        </section>
      </main>
    </div>
  );
};

export default IncomePage;
