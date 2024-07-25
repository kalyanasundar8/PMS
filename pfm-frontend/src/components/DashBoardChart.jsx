import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashBoardChart = ({ tabIndex }) => {
  if (tabIndex === 1) {
    console.log("Income");
  } else if (tabIndex === 2) {
    console.log("Expense");
  }

  const data = [
    { month: "January", salary: 4000 },
    { month: "February", salary: 5000 },
    { month: "March", salary: 2000 },
  ];
  return (
    <div className="">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 80, right: 20, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="salary"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashBoardChart;
