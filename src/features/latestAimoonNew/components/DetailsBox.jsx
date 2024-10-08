import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ChartDoughnut from "../../core/components/ChartDoughnut.jsx";
import { dateHelper } from "../../../../utils/helpers/dateHelper.js";
import { cn } from "../../../../utils/lib/cn.js";

import { DEFAULT_AVATAR_IMAGE } from "../../../app/constant/Defaults.js";
import { DEFAULT_PROVIDER_IMAGE } from "../../../app/constant/Defaults.js";
import { DEFAULT_COIN_IMAGE } from "../../../app/constant/Defaults.js";

import { goToAuthorDashboard } from "../../../../utils/lib/author/goToAuthorDashboard.js";
import { goToProviderDashboard } from "../../../../utils/lib/provider/goToProviderDashboard.js";

function DetailsBox(props) {
  const navigate = useNavigate();

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

  return (
    <>
      <div className="bg-white right-0 bottom-0 h-[6rem]">
        <div className="flex flex-col">
          <div className="basis-2/3">
            <div className="flex flex-row items-center">
              <div className="basis-4/5 px-2">
                <div className="flex flex-row pl-1 items-center">
                  <img
                    alt={props?.data.author}
                    src={
                      props?.data.author.local_image
                        ? props?.data.author.local_image
                        : props?.data.author.image
                        ? props?.data.author.image
                        : DEFAULT_AVATAR_IMAGE
                    }
                    onError={(e) => {
                      e.target.src = DEFAULT_AVATAR_IMAGE;
                    }}
                    className="h-5 w-5 rounded-[30px]"
                  />
                  <span className="px-1 text-[0.7rem]">
                    <a
                      className="cursor-pointer hover:text-color-theme"
                      onClick={(event) =>
                        goToAuthorDashboard(
                          navigate,
                          event,
                          props?.data.author,
                          "cryptocurrencies",
                          props?.nav
                        )
                      }
                    >
                      {props?.data.author}
                    </a>
                  </span>
                  <span className="px-1 text-[0.7rem] font-bold">
                    {props.data?.author_info["last_week_count"].toLocaleString() +
                      " / " +
                      props.data?.author_info["AvgNewsPERweek"].toLocaleString()}
                  </span>
                  <div className="flex flex-col my-1 mx-2">
                    <div
                      style={{
                        width: `${
                          (props.data?.author_info["last_week_count"].toLocaleString() /
                            props.data?.author_info["AvgNewsPERweek"].toLocaleString()) *
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
                  <img
                    alt={props?.data.provider}
                    src={
                      props?.data.provider.local_image
                        ? props?.data.provider.local_image
                        : props?.data.provider.image
                        ? props?.data.provider.image
                        : DEFAULT_PROVIDER_IMAGE
                    }
                    onError={(e) => {
                      e.target.src = DEFAULT_PROVIDER_IMAGE;
                    }}
                    className="h-5 w-5 rounded-[30px]"
                  />
                  <span className="px-1 text-[0.7rem]">
                    <a
                      className="cursor-pointer hover:text-color-theme"
                      onClick={(event) =>
                        goToProviderDashboard(
                          navigate,
                          event,
                          props?.data.provider,
                          props?.nav
                        )
                      }
                    >
                      {props.data?.provider}
                    </a>
                  </span>
                  <span className="px-1 text-[0.7rem] font-bold">
                    {props.data?.provider_info["last_week_count"] +
                      " / " +
                      props.data?.provider_info["AvgNewsPERweek"]}
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
                    data={[
                      props.data?.Negative,
                      props.data?.Positive,
                      props.data?.Neutral,
                    ]}
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
                  {props.data?.symbols.map((row, index) =>
                    index <= 2 ? (
                      <div className="" key={index}>
                        <img
                          className="h-[1.25rem] w-[1.25rem]"
                          alt={props?.data.provider}
                          src={
                            row?.local_image
                              ? row?.local_image
                              : row?.image
                              ? row?.image
                              : DEFAULT_COIN_IMAGE
                          }
                          onError={(e) => {
                            e.target.src = DEFAULT_COIN_IMAGE;
                          }}
                        />
                      </div>
                    ) : (
                      ""
                    )
                  )}
                  <div className="flex flex-row text-slate-700 items-center pt-1">
                    {props.data?.symbols.map((row, index) =>
                      index <= 2 ? (
                        <div className="px-1 text-[0.7rem]" key={index}>
                          {row}
                        </div>
                      ) : (
                        ""
                      )
                    )}
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
