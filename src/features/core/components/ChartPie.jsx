import React from "react";
import { TEChart } from "tw-elements-react";

const ChartPie = ({ data, colors,labels }) => {
  return (
    <TEChart
      type="pie"
      data={{
        labels: labels,
        datasets: [
          {
            // label: "Traffic",
            data: data,
            backgroundColor: colors,
          },
        ],
      }}
    />
  );
};
export default ChartPie;
