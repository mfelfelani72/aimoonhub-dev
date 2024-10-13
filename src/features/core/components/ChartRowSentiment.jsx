import React from "react";
import ToolTip from "../../core/components/ToolTip.jsx";

function ChartRowSentiment(props) {
  return (
    <>
      <div className="flex w-ful justify-center mx-2 border-2">
        <div
          style={{
            width: `${props?.sentiment.positive * 100}%`,
          }}
          className="bg-lime-300 h-6"
        >
          <ToolTip
            text={`Positive ${props?.sentiment.positive * 100}%`}
          >
            <span className="text-lime-300">p</span>
          </ToolTip>
        </div>
        <div
          style={{
            width: `${props?.sentiment.negative * 100}%`,
          }}
          className="bg-rose-300"
        >
          <ToolTip
            text={`Negative ${props?.sentiment.negative * 100}%`}
          >
            <span className="text-rose-300">n</span>
          </ToolTip>
        </div>
        <div
          style={{
            width: `${props?.sentiment.neutral * 100}%`,
          }}
          className="bg-slate-300"
        >
          <ToolTip
            text={`Neutral ${props?.sentiment.neutral * 100}%`}
          >
            <span className="text-slate-300">n</span>
          </ToolTip>
        </div>
      </div>
      <div className={props?.classNameNewScore}>
        {props?.signScore}
        {Math.round(props?.percentNewScore * 100)}%
      </div>
    </>
  );
}

export default ChartRowSentiment;
