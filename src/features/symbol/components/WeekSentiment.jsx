import React from "react";

import { AiOutlineFrown } from "react-icons/ai";
import { AiOutlineSmile } from "react-icons/ai";

import ToolTip from "../../core/components/ToolTip.jsx";

function WeekSentiment(props) {
    
  return (
    <>
      {props?.weekPercentNewScore !== 0 && props?.symbol.latest_news_info ? (
        <>
          <div className="flex mt-2">
            <div className="bg-cyan-200 border-y-2 border-cyan-400 w-full mt-1 py-1 text-center">
              <span className="text-cyan-700">
                Today <span className="font-bold">{props?.symbol.name}</span>{" "}
                Sentiment
              </span>
            </div>
          </div>

          <div className="flex my-2">
            <div className="basis-1/2 self-center">
              <div className="text-center py-2">
                <span>نمودار سنتیمنت</span>
              </div>
              <div className="flex w-ful justify-center mx-2 border-2">
                  <div
                    style={{
                      width: `${
                        props?.symbol.latest_news_info.last_Week_sentiment.positive *
                        100
                      }%`,
                    }}
                    className="bg-lime-300 h-6"
                  >
                    {" "}
                    <ToolTip
                      text={`Positive ${
                        props?.symbol.latest_news_info.last_Week_sentiment.positive *
                        100
                      }%`}
                    >
                      <span className="text-lime-300">p</span>
                    </ToolTip>
                  </div>
                  <div
                    style={{
                      width: `${
                        props?.symbol.latest_news_info.last_Week_sentiment.negative *
                        100
                      }%`,
                    }}
                    className="bg-rose-300"
                  >
                    <ToolTip
                      text={`Negative ${
                        props?.symbol.latest_news_info.last_Week_sentiment.negative *
                        100
                      }%`}
                    >
                      <span className="text-rose-300">n</span>
                    </ToolTip>
                  </div>
                  <div
                    style={{
                      width: `${
                        props?.symbol.latest_news_info.last_Week_sentiment.neutral *
                        100
                      }%`,
                    }}
                    className="bg-slate-300"
                  >
                    <ToolTip
                      text={`Neutral ${
                        props?.symbol.latest_news_info.last_Week_sentiment.neutral *
                        100
                      }%`}
                    >
                      <span className="text-slate-300">n</span>
                    </ToolTip>
                  </div>
                </div>
              <div className={props?.weekClassNameNewScore}>
                {props?.weekSignScore}
                {Math.round(props?.weekPercentNewScore * 100)}%
              </div>
            </div>
            <div className="basis-1/2 p-2 justify-center text-center">
              <div className="flex text-md justify-center">
                <span className="px-2">
                  {props?.weekSignScore == "+" ? (
                    <AiOutlineSmile className="h-7 w-7 rounded-full bg-[#fef08a]" />
                  ) : props?.weekSignScore == " " ? (
                    ""
                  ) : (
                    <AiOutlineFrown className="h-7 w-7 rounded-full bg-[#fef08a]" />
                  )}
                </span>
                <span className="self-center">
                  {props?.weekSignScore}
                  {Math.round(props?.weekPercentNewScore * 100)}%
                </span>
              </div>
              <div className="text-md font-bold mt-1">
                Out of{" "}
                <span className="font-bod">
                  {props?.symbol.latest_news_info.last_week_count.toLocaleString()}
                </span>
              </div>
              <div className="text-lg">
                <span className={props?.weekClassNameNewScore}>{props?.weekStatusScore}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default WeekSentiment;
