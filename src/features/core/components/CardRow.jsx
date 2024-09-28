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

        setPercentNewScore(Math.max(props.row.Negative, props.row.Neutral, props.row.Positive));

        if (Math.max(props.row.Negative, props.row.Neutral, props.row.Positive) === props.row.Negative)
            setClassNameNewScore("bg-rose-300 dark:bg-rose-300");

        else if (Math.max(props.row.Negative, props.row.Neutral, props.row.Positive) === props.row.Neutral)
            setClassNameNewScore("bg-slate-800 dark:bg-slate-300");

        else
            setClassNameNewScore("bg-lime-500 dark:bg-lime-500");

    }

    const { t } = useTranslation();
    let defaultImage = "https://flowbite.com/docs/images/blog/image-1.jpg";

    useEffect(() => {

        setDetailsProgressBar();

    }, [percentNewScore, classNameNewScore]);

    return (
        <div className="flex flex-col px-2 ltr:md:pr-6 rtl:md:pl-6 ltr:bi:pr-6 rtl:bi:pl-6 rtl:lg:px-6 pt-1 pb-2 border-b bg-slate-50 dark:bg-DB-dim border-color-theme-light dark:border-D-color-theme-light">

            <div className="">
                <img className="float-left h-36 w-48 pt-2 pr-2 pb-1" src={props.row?.thImage == " " ? defaultImage : props.row?.thImage} alt="" />

                <div className="rtl:ltr pt-2 text-T-dim dark:text-DT-title hover:text-color-theme dark:hover:text-D-color-theme">
                    <a href={props.row.link} target="_blank" className="text-color-theme">{props.row.title}</a>
                </div>
                <div className="rtl:ltr pt-2 text-sm text-justify">{props.row.articleBody == " " ? "" : stringHelper(props.row.articleBody, 30)}</div>
            </div>

            <div className="">
                <div className="rtl:ltr pt-2 text-sm font-semibold">
                    <span className="text-sm">
                        {localStorage.getItem("currentLngId") === 'fa' ? dateHelper(props.row.pubDate, "SH-date") : dateHelper(props.row.pubDate)}
                    </span>
                </div>

                <div className="flex flex-col pt-4">
                    <div className="flex flex-row pb-1">
                        <span className="text-sm">{t('author')}</span>
                        <span className="px-3 text-sm font-bold"> {props.row.author}</span>
                        <span className="text-sm font-bold"> {"( " + props.row.author_info['last_week_count'] + " | " + props.row.author_info['AvgNewsPERweek'] + " )"}</span>
                    </div>
                    <div className="flex flex-row pb-1">
                        <span className="text-sm">{t('provider')}</span>
                        <span className="px-3 text-sm font-bold"> {props.row.provider}</span>
                        <span className="text-sm font-bold"> {"( " + props.row.provider_info['last_week_count'] + " | " + props.row.provider_info['AvgNewsPERweek'] + " )"}</span>
                    </div>
                    <div className="flex flex-row pb-1">
                        <span className="text-sm">{t('category')}</span>
                        <span className="px-3 text-sm font-bold"> {props.row.category}</span>
                    </div>
                    {props.row.importanceScore ?
                        <div className="flex flex-row items-center pb-1">
                            <div className="text-sm">{t('newScore')}</div>

                            <div className="w-28 mx-3">
                                <ProgressBar classNameParent="h-4" classNameChild={classNameNewScore} percentage={percentNewScore * 100}>
                                    {percentNewScore}
                                </ProgressBar>
                            </div>
                        </div>
                        :
                        ""
                    }
                    {props.row.symbols && props.row.symbols[0] ?
                        <div className="flex flex-row pb-1">
                            <span className="text-sm">{t('relatedPair')}</span>
                            <span className="px-3 text-sm font-bold"> {props.row.symbols[0]}</span>
                        </div>
                        :
                        ""
                    }
                    {props.row?.summaryEn || props.row?.summaryFa ?
                        <div className="py-3 text-justify">
                            <span className="text-sm font-bold "> {localStorage.getItem("currentLngId") === 'fa' ? props.row?.summaryFa : props.row?.summaryEn}</span>
                        </div>
                        :
                        ""
                    }

                </div>
            </div>

            {props.row?.summaryEn || props.row?.summaryFa ?
                <div className="flex justify-end items-center px-1 font-bold text-[0.75rem]">
                    <span className="px-2" >{t('aimoonHub')}</span>
                    <span className="pb-2" ><img src={logo} className="h-4 w-5" /></span>
                </div>
                : ""
            }
        </div>
    );
}

export default CardRow;