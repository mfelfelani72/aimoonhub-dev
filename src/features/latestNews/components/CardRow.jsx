import React, { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";

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
    <div className="flex flex-row px-2 ltr:md:pr-6 rtl:md:pl-6 ltr:bi:pr-6 rtl:bi:pl-6 rtl:lg:px-6 pt-2 pb-2 border-b border-color-theme-light dark:border-D-color-theme-light">
      {/* image */}
      <div className="w-[8rem] h-[6rem]">
        <a href={props.row.link} target="_blank">
          <img
            class="w-full !h-full transition duration-300 ease-in-out hover:scale-110"
            src={props.row?.thImage == " " ? defaultImage : props.row?.thImage}
            alt={props.row.title}
          />
        </a>
      </div>
      {/* image */}

      <div className="flex flex-col w-full">
        {/* title */}
        <div className="rtl:ltr px-2 text-sm">
          <a
            href={props.row.link}
            target="_blank"
            className="text-color-theme dark:text-D-color-theme"
          >
            {props.row.title}
          </a>
        </div>
        {/* title */}

        {/* provider */}
        <div className="px-2 pt-2">
          <span className="text-sm">{t("provider")}</span>
          <span className="px-1 text-sm font-bold"> {props.row.provider}</span>
        </div>
        {/* provider */}

        {/* author */}
        <div className="px-2">
          <span className="text-sm">{t("author")}</span>
          <span className="px-1 text-sm font-bold"> {props.row.author}</span>
        </div>
        {/* author */}
      </div>
    </div>
  );
};

export default CardRow;
