import React from "react";

import { AiOutlineFrown } from "react-icons/ai";
import { AiOutlineSmile } from "react-icons/ai";

import ChartRowSentiment from "../../core/components/ChartRowSentiment.jsx";

function WeekSentiment(props) {
  return (
    <>
      {props?.weekPercentNewScore !== 0 && props?.symbol.latest_news_info ? (
        <>
          <div className="flex">
            <div className="bg-violet-100 border-y-2 border-violet-200 w-full mt-1 py-1 text-center">
              <span className="text-violet-500">
                This Week Provider Sentiment
              </span>
            </div>
          </div>

          <div className="flex my-2">
            <div className="basis-1/2 self-center">
              <div className="text-center py-2">
                <span>نمودار سنتیمنت</span>
              </div>
              <ChartRowSentiment
                sentiment={props?.symbol.latest_news_info.last_week_sentiment}
                classNameNewScore={props?.weekClassNameNewScore}
                signScore={props?.weekSignScore}
                percentNewScore={props?.weekPercentNewScore}
              />
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
                <span className={props?.weekClassNameNewScore}>
                  {props?.weekStatusScore}
                </span>
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
