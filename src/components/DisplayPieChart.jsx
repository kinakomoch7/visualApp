import React from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

export const DisplayPieChart = (props) => {
  const [formattedData] = props;
  return (
    <div style={{ width: "100%", height: "200px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formattedData}
            dataKey="value"
            nameKey="支出金"
            cx="50%"
            cy="50%"
            fill={"#" + Math.floor(Math.random() * 16777215).toString(16)}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
