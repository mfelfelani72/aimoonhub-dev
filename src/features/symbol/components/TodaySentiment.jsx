import React from "react";

import { AiOutlineFrown } from "react-icons/ai";
import { AiOutlineSmile } from "react-icons/ai";

import ChartRowSentiment from "../../core/components/ChartRowSentiment.jsx";

function TodaySentiment(props) {
  return (
    <>
      {props?.dayPercentNewScore !== 0 && props?.symbol.latest_news_info ? (
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
            
              <ChartRowSentiment
                sentiment={props?.symbol.latest_news_info.last_day_sentiment}
                classNameNewScore={props?.dayClassNameNewScore}
                signScore={props?.daySignScore}
                percentNewScore={props?.dayPercentNewScore}
              />
            </div>
            <div className="basis-1/2 p-2 justify-center text-center">
              <div className="flex text-md justify-center">
                <span className="px-2">
                  {props?.daySignScore == "+" ? (
                    <AiOutlineSmile className="h-7 w-7 rounded-full bg-[#fef08a]" />
                  ) : props?.daySignScore == " " ? (
                    ""
                  ) : (
                    <AiOutlineFrown className="h-7 w-7 rounded-full bg-[#fef08a]" />
                  )}
                </span>
                <span className="self-center">
                  {props?.daySignScore}
                  {Math.round(props?.dayPercentNewScore * 100)}%
                </span>
              </div>
              <div className="text-md font-bold mt-1">
                Out of{" "}
                <span className="font-bod">
                  {props?.symbol.latest_news_info.last_day_count.toLocaleString()}
                </span>
              </div>
              <div className="text-lg">
                <span className={props?.dayClassNameNewScore}>
                  {props?.dayStatusScore}
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

export default TodaySentiment;
