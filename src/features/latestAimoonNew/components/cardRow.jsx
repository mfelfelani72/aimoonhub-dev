import React, { useState } from "react";
import DetailsBox from "../components/DetailsBox.jsx";

import { DEFAULT_NEW_IMAGE } from "../../../app/constant/Defaults.js";

function cardRow(props) {
  const [lang, setLang] = useState(true);
  const toggleLang = (event) => {
    if (event.detail == 2) setLang((prev) => !prev);
  };

  return (
    <div className="relative h-[17rem] border rounded-lg">
      <div className="h-[13rem]">
        <a href={props?.row.link} target="_blank">
          <img
            className="h-[13rem] w-full border border-transparent rounded-lg "
            alt={props?.row.title}
            src={
              props?.row.local_image
                ? props?.row.local_image
                : props?.row?.thImage
                ? props?.row?.thImage
                : DEFAULT_NEW_IMAGE
            }
            onError={(e) => {
              e.target.src = DEFAULT_NEW_IMAGE;
            }}
          />
        </a>
        <div className="absolute top-0 left-0 m-5 mt-10 border rounded-xl bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg h-[6.7rem] w-[16rem] text-[0.8rem] p-2 text-justify text-slate-800 mx-2">
          <a onClick={(event) => toggleLang(event)} className="cursor-pointer">
            {lang ? (
              <div className="rtl">{props?.row.summaryFa}</div>
            ) : (
              props?.row.summaryEn
            )}
          </a>
        </div>
        <div className="absolute right-0 top-0 m-2 bg-D-color-theme rounded-md">
          <div className="p-[0.2rem] text-[0.8rem] font-bold text-white">
            {props?.row.category}
          </div>
        </div>
      </div>
      <div className="absolute top-[10rem] w-full">
        <DetailsBox data={props?.row} lineChartWidth="w-[2rem]" />
      </div>
    </div>
  );
}

export default cardRow;
