import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashBoardChart = () => {
  const data = [
    { month: "January", salary: 3000 },
    { month: "February", salary: 3200 },
    { month: "March", salary: 3500 },
    { month: "April", salary: 3700 },
    { month: "May", salary: 4000 },
    { month: "June", salary: 4500 },
    { month: "July", salary: 4700 },
    { month: "August", salary: 5000 },
    { month: "September", salary: 5300 },
    { month: "October", salary: 5500 },
    { month: "November", salary: 5700 },
    { month: "December", salary: 6000 },
  ];
  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 0,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="salary" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashBoardChart;
