import React, { useState, useEffect } from "react";
import { dateHelper } from "../../../../utils/helpers/dateHelper.js";
import { stringHelper } from "../../../../utils/helpers/stringHelper.js";
import { useTranslation } from "react-i18next";

import logo from "../../../../assets/images/logo-shape.png";

import ProgressBar from "./ProgressBar.jsx";

const CardRow = (props) => {
  const [percentNewScore, setPercentNewScore] = useState();
  const [classNameNewScore, setClassNameNewScore] = useState();

  const setDetailsProgressBar = () => {
    setPercentNewScore(
      Math.max(props.row.Negative, props.row.Neutral, props.row.Positive)
    );

    if (
      Math.max(props.row.Negative, props.row.Neutral, props.row.Positive) ===
      props.row.Negative
    )
      setClassNameNewScore("bg-rose-300 dark:bg-rose-300");
    else if (
      Math.max(props.row.Negative, props.row.Neutral, props.row.Positive) ===
      props.row.Neutral
    )
      setClassNameNewScore("bg-slate-800 dark:bg-slate-300");
    else setClassNameNewScore("bg-lime-500 dark:bg-lime-500");
  };

  const { t } = useTranslation();
  let defaultImage = "https://flowbite.com/docs/images/blog/image-1.jpg";

  useEffect(() => {
    setDetailsProgressBar();
  }, [percentNewScore, classNameNewScore]);

  return (
    <div className="flex flex-row px-2 ltr:md:pr-6 rtl:md:pl-6 ltr:bi:pr-6 rtl:bi:pl-6 rtl:lg:px-6 pt-1 pb-2 border-b border-color-theme-light dark:border-D-color-theme-light">
      <img
        className="float-left h-36 w-36 pt-2 pr-2 pb-1"
        src={props.row?.thImage == " " ? defaultImage : props.row?.thImage}
        alt={props.row.title}
      />

      <div className="grid grid-cols-1 place-content-stretch rtl:ltr pt-2 text-sm">
        {/* title */}
        <a href={props.row.link} target="_blank" className="text-color-theme dark:text-D-color-theme">
          {props.row.title}
        </a>

        <div className="">
          {/* provider */}
          <div>
            <span className="text-sm">{t("provider")}</span>
            <span className="px-1 text-sm font-bold">
              {" "}
              {props.row.provider}
            </span>
            <span className="text-sm">
              {" "}
              {"( " +
                props.row.provider_info["last_week_count"] +
                " | " +
                props.row.provider_info["AvgNewsPERweek"] +
                " )"}
            </span>
          </div>

          {/* author */}
          <div>
            <span className="text-sm">{t("author")}</span>
            <span className="px-1 text-sm font-bold"> {props.row.author}</span>
            <span className="text-sm font-bold">
              {" "}
              {"( " +
                props.row.author_info["last_week_count"] +
                " | " +
                props.row.author_info["AvgNewsPERweek"] +
                " )"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRow;
