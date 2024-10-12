import React from "react";
import { TEChart } from "tw-elements-react";
import { dateHelper } from "../../../../utils/helpers/dateHelper.js";

function NewsTimeSeries(props) {
  return (
    <>
      <div className="flex mt-2">
        <div className="bg-pink-200 border-y-2 border-pink-400 w-full mt-1 py-1 text-center">
          <span className="text-pink-700">News Count Time Series</span>
        </div>
      </div>
      <div className="text-center py-2">
        <span>نمودار شمارش اخبار سری زمانی</span>
      </div>
      <div className="flex mx-3 mb-6">
        <TEChart
          type={"line"}
          data={{
            labels: props.data.timestamp.map((row) => dateHelper(row, "chart")),
            datasets: [
              {
                label: "News count",
                data: props.data.newsCount,
                pointRadius: 0,
                backgroundColor: ["rgb(153, 102, 255, 0.2)"],
                borderColor: ["rgba(153, 102, 255,1)"],
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
                stacked: false,
                grid: {
                  display: true,
                },
                ticks: {
                  display: true,
                  color: "rgba(0,0,0, 0.5)",
                },
              },
            },
          }}
        />
      </div>
    </>
  );
}

export default NewsTimeSeries;
