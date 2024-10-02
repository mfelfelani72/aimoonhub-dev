import React from "react";
import { TEChart } from "tw-elements-react";

const ChartBar = () => {
  return (
    <TEChart
      type="bar"
      data={{
        labels: [
          "Mon",
          "Tue",
          "Wedn",
          "Thur",
          "Frid",
          "Satur",
          "Sun",
          "Sun",
          "Sund",
          "Sund",
        ],
        datasets: [
          {
            label: "Traffic",
            data: [2112, 2343, 2545, 3423, 2365, 1985, 987,2243,2234,2243],
          },
        ],
      }}
    />
  );
};
export default ChartBar;
