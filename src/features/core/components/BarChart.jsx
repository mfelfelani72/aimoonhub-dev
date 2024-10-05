import React from "react";
import { TEChart } from "tw-elements-react";

const ChartBar = ({ labels, data }) => {
  return (
    <TEChart
      type="bar"
      data={{
        labels: labels,
        datasets: [
          {
            label: "Traffic",
            data: data,
          },
        ],
      }}
    />
  );
};
export default ChartBar;
