import React, { useState } from "react";
import { dateHelper } from "../../../../utils/helpers/dateHelper.js";
import { stringHelper } from "../../../../utils/helpers/stringHelper.js";

import logo from "../../../../assets/images/logo-shape.png";
import avatar from "../../../../assets/images/avatar.png";
import Botton from "../../core/components/Button.jsx"

import useNewsStore from "../../../../utils/stores/NewsStore.js"

const CardRow = (props) => {

    let defaultImage = "https://flowbite.com/docs/images/blog/image-1.jpg";

    const { setViewNews } = useNewsStore((state) => ({
        setViewNews: state.setViewNews,
    }))

    const [active, setActive] = useState(false);

    return (
        <div className={active ? "bg-color-theme-light dark:bg-D-color-theme-light" : "bg-slate-50 dark:bg-DB-dim"}>
            <div className="px-3 pt-1 pb-2 border-b border-color-theme-light dark:border-D-color-theme-light">
                <div className="px-2 pt-2 cursor-pointer text-T-dim dark:text-DT-title hover:text-color-theme dark:hover:text-D-color-theme">
                    <a className="text-color-theme"
                        onClick={() => { setViewNews(props.row); document.getElementById('viewNews').scrollTop = 0; setActive(true) }}>{props.row.title}</a>
                </div>
                <div className="px-2 text-sm">{stringHelper(props.row.articleBody, 30)}</div>

                <div className="px-1 pt-2 text-sm font-semibold">
                    <span className="px-1 text-T-bright/60 dark:text-DT-bright/60"> {props.row.category}</span>
                    <span className="px-1 text-T-bright/80 dark:text-DT-bright/80">
                        <a className="cursor-pointer hover:text-color-theme dark:hover:text-D-color-theme"
                            href={props.row.link} target="blank">
                            {props.row.provider}</a>
                    </span>
                </div>

                <div className="flex flex-row px-2 pt-4">
                    <span className=""><img src={avatar} className="h-10 w-10 rounded-lg" /></span>
                    <div className="flex flex-col">
                        <span className="px-3 text-sm font-bold"> {props.row.author}</span>
                        <span className="px-3 text-sm"> {dateHelper(props.row.pubDate)}</span>
                    </div>
                </div>

                <div className="lg:hidden">
                    <div className={active ? "block" : "hidden"}>
                        <div className="w-[96%] p-1 m-2 mt-2 bg-slate-50 dark:bg-DB-bright">


                            <img className="float-left h-36 w-48 pt-4 px-3 pb-1" src={props.row?.thImage == " " ? defaultImage : props.row?.thImage} alt="" />

                            {props.row?.summaryEn || props.row?.summaryFa ?

                                <div className="p-3"><span className="text-color-theme text-sm font-semibold">LLM AI : </span>
                                    {localStorage.getItem("currentLngId") === 'fa' ? props.row?.summaryFa : props.row?.summaryEn}

                                </div>

                                :

                                ""
                            }

                            <div className="p-3">{props.row?.articleBody}</div>

                            <div className="text-right p-4 ">
                                <Botton
                                    href={props.row?.link}
                                    target="_blank"
                                    className="bg-color-theme/70 hover:bg-color-theme dark:bg-D-color-theme/70 dark:hover:bg-D-color-theme">
                                    Read more
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ltr:ms-2 rtl:me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </Botton>
                            </div>
                        </div>
                    </div>
                </div>

                {props.row?.summaryEn || props.row?.summaryFa ?
                    <div className="flex justify-end items-center px-1 font-bold text-[0.75rem]">
                        <span className="" >Analyzed by LLM AI</span>
                        <span className="px-1 pb-2" ><img src={logo} className="h-4 w-5" /></span>
                    </div>
                    : ""
                }
            </div>
        </div>
    );
}

export default CardRow;