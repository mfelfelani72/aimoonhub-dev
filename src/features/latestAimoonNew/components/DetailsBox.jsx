import React, { useEffect, useState } from "react";

import avatar from "../../../../assets/images/avatar.png";

import ChartDoughnut from "../../core/components/ChartDoughnut.jsx";
import { dateHelper } from "../../../../utils/helpers/dateHelper.js";
import { cn } from "../../../../utils/lib/cn.js";

function DetailsBox(props) {
  const [percentNewScore, setPercentNewScore] = useState();
  const [classNameNewScore, setClassNameNewScore] = useState();

  const setDetailsProgressBar = () => {
    setPercentNewScore(
      Math.max(props.data?.Negative, props.data?.Neutral, props.data?.Positive)
    );

    if (
      Math.max(
        props.data?.Negative,
        props.data?.Neutral,
        props.data?.Positive
      ) === props.data?.Negative
    )
      setClassNameNewScore("text-rose-500 text-[0.8rem] text-center");
    else if (
      Math.max(
        props.data?.Negative,
        props.data?.Neutral,
        props.data?.Positive
      ) === props.data?.Neutral
    )
      setClassNameNewScore("text-slate-500 text-[0.8rem] text-center");
    else setClassNameNewScore("text-lime-500 text-[0.8rem] text-center");
  };

  useEffect(() => {
    setDetailsProgressBar();
  }, [percentNewScore, classNameNewScore]);

  let defaultImage =
    "https://cdn3d.iconscout.com/3d/premium/thumb/bitcoin-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--logo-btc-gold-symbol-sign-crpto-glossy-crypto-pack-science-technology-illustrations-3591010.png?f=webp";

  return (
    <>
      <div className="bg-white right-0 bottom-0 h-[6rem]">
        <div className="flex flex-col">
          <div className="basis-2/3">
            <div className="flex flex-row items-center">
              <div className="basis-4/5 px-2">
                <div className="flex flex-row pl-1 items-center">
                  <img src={avatar} className="h-5 w-5 rounded-[30px]" />
                  <span className="px-1 text-[0.7rem]">
                    {props.data?.provider}
                  </span>
                  <span className="px-1 text-[0.7rem] font-bold">
                    {"( " +
                      props.data?.author_info["last_week_count"] +
                      " / " +
                      props.data?.author_info["AvgNewsPERweek"] +
                      " )"}
                  </span>
                  <div className="flex flex-col my-1 mx-2">
                    <div
                      style={{
                        width: `${
                          (props.data?.author_info["last_week_count"] /
                            props.data?.author_info["AvgNewsPERweek"]) *
                          100
                        }%`,
                      }}
                      className="bg-teal-200 h-[0.5rem]"
                    ></div>
                    <div
                      className={cn(
                        "bg-teal-500 h-[0.5rem]",
                        props.lineChartWidth
                      )}
                    ></div>
                  </div>
                </div>

                <div className="flex flex-row pt-1 pl-1 items-center">
                  <img src={avatar} className="h-5 w-5 rounded-[30px]" />
                  <span className="px-1 text-[0.7rem]">
                    {props.data?.author}
                  </span>
                  <span className="px-1 text-[0.7rem] font-bold">
                    {"( " +
                      props.data?.provider_info["last_week_count"] +
                      " / " +
                      props.data?.provider_info["AvgNewsPERweek"] +
                      " )"}
                  </span>
                  <div className="flex flex-col my-1 mx-2">
                    <div
                      style={{
                        width: `${
                          (props.data?.provider_info["last_week_count"] /
                            props.data?.provider_info["AvgNewsPERweek"]) *
                          100
                        }%`,
                      }}
                      className="bg-fuchsia-200 h-[0.5rem]"
                    ></div>
                    <div
                      className={cn(
                        "bg-fuchsia-500 h-[0.5rem]",
                        props.lineChartWidth
                      )}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="basis-1/5 -mt-1">
                <div className="h-[3.6rem] w-[3.6rem] mx-auto">
                  <ChartDoughnut
                    data={[props.data?.Negative, props.data?.Positive, props.data?.Neutral]}
                    colors={[
                      "rgba(255, 0, 0, 0.5)",
                      "rgba(0, 255, 0, 0.5)",
                      "rgba(64, 64, 64, 0.5)",
                    ]}
                  />
                </div>
                <div className={classNameNewScore}>
                  {percentNewScore * 100}%
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-1/3">
          <div className="flex flex-row px-2">
            <div className="basis-2/3">
              {props.data?.symbols && props.data?.symbols[0] ? (
                <div className="flex flex-row items-center">
                  {props.data?.symbols.map((row, index) => (
                    <div className="" key={index}>
                      <img
                        className="h-[1.25rem] w-[1.25rem]"
                        src={defaultImage}
                      />
                    </div>
                  ))}
                  <div className="flex flex-row text-slate-700 items-center pt-1">
                    {props.data?.symbols.map((row, index) => (
                      <div className="px-1 text-[0.7rem]" key={index}>
                        {row}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="basis-1/3 ">
              <div className="pt-1 text-[0.7rem] text-slate-500 text-end">
                {dateHelper(props.data?.pubDate)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsBox;
