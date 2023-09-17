import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";


export default function ChartThree(props) {
  return (
    <PieChart width={500} height={500}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={props.data}
        cx={250}
        cy={250}
        outerRadius={150}
        fill="#8884d8"
        label
      />
      
      <Tooltip />
    </PieChart>
  );
}
