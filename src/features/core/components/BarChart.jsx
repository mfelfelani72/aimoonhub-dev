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
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
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
