import React from "react";
import { TEChart } from "tw-elements-react";

const LineChart = ({}) => {
  return (
    <TEChart
      type="line"
      data={{
        labels: [
          "",
          "",
          "",
          "",
          "",
          "",
          "Sunday",
        ],
        datasets: [
          {
            label: "damp5",
            data: [2112, 2343, 2545, 3423, 2365, 1985, 987],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
            ],
            borderWidth: 1,
          },
          {
            label: "damp10",
            data: [435, 4354, 5674, 3466, 2466, 4567, 3870],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }}
      
    />
  );
};
export default LineChart;
