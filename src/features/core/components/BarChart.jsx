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
      options={{
        indexAxis: "x",
        plugins: {
          legend: {
            position: "top",
            // labels: {
            //   color: "green",
            // },
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: {
              display: true,
              borderDash: [2],
              zeroLineColor: "rgba(0,0,0,0)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
            ticks: {
              color: "rgba(0,0,0, 0.5)",
            },
          },
          y: {
            stacked: true,
            grid: {
              display: true,
            },
            ticks: {
              color: "rgba(0,0,0, 0.5)",
            },
          },
        },
      }}
    />
  );
};
export default ChartBar;
