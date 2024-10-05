import React from "react";
import { TEChart } from "tw-elements-react";

const ChartBar = ({ labels, data, label }) => {
  return (
    <TEChart
      type="bar"
      data={{
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
          },
        ],
      }}
    />
  );
};
export default ChartBar;
