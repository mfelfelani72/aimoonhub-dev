import React from "react";
import { TEChart } from "tw-elements-react";
import { dateHelper } from "../../../../utils/helpers/dateHelper.js";

function MoodTimeSeries(props) {
  return (
    <>
      <div className="flex mt-2">
          <div className="bg-fuchsia-200 border-y-2 border-fuchsia-400 w-full mt-1 py-1 text-center">
            <span className="text-fuchsia-700">Mood Time Series</span>
          </div>
        </div>
        <div className="flex mx-3 my-6">
          <TEChart
            type={"line"}
            data={{
              labels: props.data.timestamp.map((row) =>
                dateHelper(row, "AD-date", "date")
              ),
              datasets: [
                {
                  label: "damp 05",
                  data: props.data.damp_5,
                  pointRadius: 0,
                  backgroundColor: ["rgba(222, 49, 99, 0.2)"],
                  borderColor: ["rgba(222, 49, 99,1)"],
                  borderWidth: 1,
                },
                {
                  label: "damp 10",
                  data: props.data.damp_10,
                  pointRadius: 0,
                  backgroundColor: ["rgba(255, 127, 80, 0.2)"],
                  borderColor: ["rgba(255, 127, 80, 1)"],
                  borderWidth: 1,
                },
                {
                  label: "damp 15",
                  data: props.data.damp_15,
                  pointRadius: 0,
                  backgroundColor: ["rgba(159, 226, 191, 0.2)"],
                  borderColor: ["rgba(159, 226, 191, 1)"],
                  borderWidth: 1,
                },
                {
                  label: "damp 20",
                  data: props.data.damp_20,
                  pointRadius: 0,
                  backgroundColor: ["rgba(100, 149, 237 , 0.2)"],
                  borderColor: ["rgba(100, 149, 237 , 1)"],
                  borderWidth: 1,
                },
                {
                  label: "damp 30",
                  data: props.data.damp_30,
                  pointRadius: 0,
                  backgroundColor: ["rgba(28, 40, 51, 0.2)"],
                  borderColor: ["rgba(28, 40, 51, 1)"],
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

export default MoodTimeSeries;
