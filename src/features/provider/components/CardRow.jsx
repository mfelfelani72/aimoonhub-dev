import React from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { dateHelper } from "../../../../utils/helpers/dateHelper";

import { DEFAULT_NEW_IMAGE } from "../../../app/constant/Defaults";
import { DEFAULT_AVATAR_IMAGE } from "../../../app/constant/Defaults";

import { goToAuthorDashboard } from "../../../../utils/lib/author/goToAuthorDashboard.js";

const CardRow = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-row p-2 border-b border-color-theme-light dark:border-D-color-theme-light">
      {/* image */}
      <div className="w-[8rem] h-[6rem]">
        <a href={props.row.link} target="_blank">
          <img
            className="w-full !h-full transition duration-300 ease-in-out hover:scale-110 rounded-2xl rounded-bl-none"
            alt={props.row.title}
            src={
              props.row?.local_image
                ? props.row?.local_image
                : props.row?.thImage
                ? props.row?.thImage
                : DEFAULT_NEW_IMAGE
            }
            onError={(e) => {
              e.target.src = DEFAULT_NEW_IMAGE;
            }}
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

        {/* author */}
        <div className="flex px-2 pt-4">
          <span>
            <img
              alt={props?.row.author}
              src={
                props?.row.author_info.local_image
                  ? props?.row.author_info.local_image
                  : props?.row.author_info.picUrl
                  ? props?.row.author_info.picUrl
                  : DEFAULT_AVATAR_IMAGE
              }
              onError={(e) => {
                e.target.src = DEFAULT_AVATAR_IMAGE;
              }}
              className="h-5 w-5 rounded-[30px]"
            />
          </span>
          <span className="px-1 text-[0.7rem] self-center">{t("author")}</span>
          <span className="px-1 text-[0.7rem] font-bold self-center">
            <a
              className="cursor-pointer hover:text-color-theme"
              onClick={(event) =>
                goToAuthorDashboard(
                  navigate,
                  event,
                  props?.row.author,
                  "cryptocurrencies",
                  props?.nav
                )
              }
            >
              {props.row.author}
            </a>
          </span>
        </div>
        {/* author */}

        {/* date */}
        <div className="px-2 text-end">
          <span className="px-1 text-[0.7rem] text-slate-500">
            {" "}
            {dateHelper(props.row.pubDate, "difference")}
          </span>
        </div>
        {/* date */}
      </div>
    </div>
  );
};

export default CardRow;
