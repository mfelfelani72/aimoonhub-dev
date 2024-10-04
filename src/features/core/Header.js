import React from "react";

import { NavLink } from 'react-router-dom';

import { IoMenu, IoMoon, IoSunny } from "react-icons/io5";
import useAppStore from "../../app/stores/AppStore.js";
import Languages from "./components/Languages.jsx";
import { useTranslation } from "react-i18next";

function handleSwitchTheme() {

    if (document.documentElement.classList.value)
        localStorage.setItem("theme", "");
    else
        localStorage.setItem("theme", "dark");


    document.documentElement.classList.toggle("dark");

}

export function Header(...props) {

    const { t } = useTranslation();

    const { statusSidebar, setStatusSidebar, setLanguageApp, userLocation } = useAppStore((state) => ({
        statusSidebar: state.statusSidebar,
        setStatusSidebar: state.setStatusSidebar,
        progressBar: state.progressBar,
        setLanguageApp: state.setLanguageApp,
        userLocation: state.userLocation,
    }))
    
    return (
        <>
            <div className="fixed top-0 left-0 right-0 shadow-md dark:shadow-slate-500 z-50">

                {/* header */}
                <header className="p-2 bg-gradient-to-b from-gray-600 to-black w-full">
                    <div className="flex flex-row">

                        {/* menu icon */}
                        {/* <div className="hover:cursor-pointer md:hidden text-DT-bright hover:text-color-theme dark:hover:text-D-color-theme font-semibold text-2xl ltr:mr-3 rtl:ml-3"
                            onClick={() => { statusSidebar === "block" ? setStatusSidebar("hidden") : setStatusSidebar("flex") }}>

                            <IoMenu />

                        </div> */}
                        {/* menu icon */}

                        {/* header title */}
                        <h2 className="basis-1/3 hidden ltr:md:ml-[12rem] rtl:md:mr-[12rem] xs:block text-DT-bright font-semibold text-xl"> AimoonHUB</h2>
                        {/* header title */}

                        <div className="basis-2/3 flex flex-row-reverse  text-sm leading-6 font-semibold text-DT-bright ">

                            {/* language */}
                            {/* <div className="hover:text-color-theme dark:hover:text-D-color-theme mx-4 my-auto">
                                <Languages />
                            </div> */}
                            {/* language */}

                            {/* dark - light */}
                            {/* <div className="flex items-center ltr:pl-2 rtl:pr-2 hover:cursor-pointer hover:text-color-theme dark:hover:text-D-color-theme" onClick={() => handleSwitchTheme()}>
                                <span className="hidden dark:block">
                                    <IoSunny />
                                </span>
                                <span className="block dark:hidden">
                                    <IoMoon />
                                </span>
                                
                            </div> */}
                            {/* dark - light */}





                            {/* <div className="text-slate-50 mt-1">{userLocation.countryCode}</div>  */}





                            {/* login - register */}
                            {/* <ul className="flex items-center space-x-1 text-sm ltr:ml-3 rtl:mr-3 ltr:border-r rtl:border-l border-slate-200">
                                <li>
                                    <NavLink className="text-DT-bright hover:text-color-theme dark:hover:text-D-color-theme px-2" to="/login">
                                        {t('login')}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="text-DT-bright hover:text-color-theme dark:hover:text-D-color-theme px-2" to="/register">
                                        {t('register')}
                                    </NavLink>
                                </li>
                            </ul> */}
                            {/* login - register */}

                        </div>
                    </div>
                </header >
                {/* header */}
            </div >
        </>
    );
}