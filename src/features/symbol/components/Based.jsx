import React from "react";

import { AiOutlineBarChart } from "react-icons/ai";

function Based(props) {


  return (
    <>
      {props?.symbol.latest_news_info && (
        <>
          <div className="flex mt-4">
            <div className="bg-emerald-200 border-y-2 border-emerald-400 w-full mt-1 py-1 text-center">
              <span className="text-emerald-700">
                {props?.symbol.name} News Based Statistics
              </span>
            </div>
          </div>

          <div className="flex my-2">
            <div className="basis-2/5 self-center">
              <div className="h-[3rem] w-[3rem] mx-auto rounded-full border-2 border-color-theme">
                <AiOutlineBarChart className="h-[2rem] w-[2rem] m-auto mt-1 text-color-theme" />
              </div>
            </div>
            <div className="basis-3/5 p-2 justify-center">
              <div className="text-sm">
                <span className="text-sm font-bold">
                  +{props?.symbol.latest_news_info.news_count.toLocaleString()}
                </span>{" "}
                News
              </div>
              <div className="text-sm">
                <span className="text-sm font-bold">
                  +{props?.symbol.latest_news_info.avg_news_day.toLocaleString()}
                </span>{" "}
                News Per Day
              </div>
              <div className="text-sm">
                <span className="text-sm font-bold">
                  +{props?.symbol.latest_news_info.avg_news_week.toLocaleString()}
                </span>{" "}
                News Per Week
              </div>
              <div className="text-sm">
                <span className="text-sm font-bold">
                  +{props?.symbol.latest_news_info?.avg_news_month.toLocaleString()}
                </span>{" "}
                News Per Month
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Based;
