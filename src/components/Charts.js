import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

export default function ChartOne(props) {
  return (
    <RadarChart
      cx={250}
      cy={250}
      outerRadius={150}
      width={500}
      height={500}
      data={props.data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="type" />
      <PolarRadiusAxis />
      <Radar
        name="Mike"
        dataKey="amount"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
}