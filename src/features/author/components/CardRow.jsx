import React from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { dateHelper } from "../../../../utils/helpers/dateHelper";

import { DEFAULT_NEW_IMAGE } from "../../../app/constant/Defaults";
import { DEFAULT_PROVIDER_IMAGE } from "../../../app/constant/Defaults";

import { goToProviderDashboard } from "../../../../utils/lib/provider/goToProviderDashboard.js";

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

        {/* provider */}
        <div className="flex px-2 pt-4">
          <span>
            <img
              alt={props?.row.provider}
              src={
                props?.row.provider_info.local_image
                  ? props?.row.provider_info.local_image
                  : props?.row.provider_info.logoUrl
                  ? props?.row.provider_info.logoUrl
                  : DEFAULT_PROVIDER_IMAGE
              }
              onError={(e) => {
                e.target.src = DEFAULT_PROVIDER_IMAGE;
              }}
              className="h-5 w-5 rounded-[30px]"
            />
          </span>
          <span className="px-1 text-[0.7rem] self-center">{t("provider")}</span>
          <span className="px-1 text-[0.7rem] font-bold self-center">
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
            {dateHelper(props.row.pubDate, "difference")}
          </span>
        </div>
        {/* date */}
      </div>
    </div>
  );
};

export default CardRow;
