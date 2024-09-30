import React from "react";
import { TEChart } from "tw-elements-react";

const ChartDoughnut = ({ data, colors }) => {
  return (
    <TEChart
      type="doughnut"
      data={{
        // labels: [
        //   "Monday",
        //   "Tuesday",
        //   "Wednesday"
        // ],
        datasets: [
          {
            // label: "Traffic",
            data: data,
            // data: [0.1, 0.8, 0.1],
            backgroundColor: colors,
            // "rgba(255, 0, 0, 0.5)",
            // "rgba(0, 255, 0, 0.5)",
            // "rgba(64, 64, 64, 0.5)",
          },
        ],
      }}
    />
  );
};

export default ChartDoughnut;
