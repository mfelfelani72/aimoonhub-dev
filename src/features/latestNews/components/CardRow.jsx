import React from "react";

import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { dateHelper } from "../../../../utils/helpers/dateHelper";

import { DEFAULT_NEW_IMAGE } from "../../../app/constant/Defaults";

import { goToAuthorDashboard } from "../../../../utils/lib/author/goToAuthorDashboard.js";
import { goToProviderDashboard } from "../../../../utils/lib/provider/goToProviderDashboard.js";

const CardRow = (props) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <div className="flex flex-row px-2 ltr:md:pr-6 rtl:md:pl-6 ltr:bi:pr-6 rtl:bi:pl-6 rtl:lg:px-6 pt-2 pb-2 border-b border-color-theme-light dark:border-D-color-theme-light">
      {/* image */}
      <div className="w-[8rem] h-[6rem]">
        <a href={props.row.link} target="_blank">
          <img
            className="w-full !h-full transition duration-300 ease-in-out hover:scale-110"
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
        <div className="px-2">
          <span className="text-[0.7rem]">{t("author")}</span>
          <span className="px-1 text-[0.7rem] font-bold">
            {" "}
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

        {/* provider */}
        <div className="px-2 leading-3">
          <span className="text-[0.7rem]">{t("provider")}</span>
          <span className="px-1 text-[0.7rem] font-bold">
            <a
              className="cursor-pointer hover:text-color-theme"
              onClick={(event) =>
                goToProviderDashboard(
                  navigate,
                  event,
                  props?.row.provider,
                  props?.nav
                )
              }
            >
              {props?.row.provider}
            </a>
          </span>
        </div>
        {/* provider */}

        {/* date */}
        <div className="px-2 text-end">
          <span className="px-1 text-[0.7rem] text-slate-500">
            {" "}
            {dateHelper(props.row.pubDate)}
          </span>
        </div>
        {/* date */}
      </div>
    </div>
  );
};

export default CardRow;
