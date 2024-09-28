import React from "react";

import Botton from "../../core/components/Button.jsx"

const ViewNews = (props) => {

    let defaultImage = "https://flowbite.com/docs/images/blog/image-1.jpg";

    return (
        <>
            <div style={{ maxHeight: `calc(100% - 5rem)` }}
                className="fixed overflow-auto text-center text-sm" id="viewNews">
                <div className="">
                    <img className="h-[150px] w-[100%]" src={props.new.thImage == " " ? defaultImage : props.new.thImage} alt="" />
                </div>
                {props.new?.summaryEn || props.new?.summaryFa ?

                    <div className="p-3"><span className="text-color-theme text-sm font-semibold">LLM AI : </span>
                        {localStorage.getItem("currentLngId") === 'fa' ? props.new?.summaryFa : props.new?.summaryEn}
                    </div>

                    :

                    ""
                }

                <div className="p-3">{props.new?.articleBody}</div>
                <div className="text-right p-4 ">
                    <Botton
                        href={props.new?.link}
                        target="_blank"
                        className="bg-color-theme/70 hover:bg-color-theme dark:bg-D-color-theme/70 dark:hover:bg-D-color-theme">
                        Read more
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ltr:ms-2 rtl:me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Botton>
                </div>

            </div>
        </>
    );
}

export default ViewNews;