import React, { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { IoMenu, IoMoon, IoSunny } from "react-icons/io5";
import useAppStore from "../../app/stores/AppStore.js";
import Languages from "./components/Languages.jsx";
import { useTranslation } from "react-i18next";

function handleSwitchTheme() {
  if (document.documentElement.classList.value)
    localStorage.setItem("theme", "");
  else localStorage.setItem("theme", "dark");

  document.documentElement.classList.toggle("dark");
}

export function Header(...props) {
  const navigate = useNavigate();

  const [statusMenu, setStatusMenu] = useState("hidden");

  const serviceLogOut = () => {
    sessionStorage.clear();
    setStatusMenu("hidden");
    navigate("/");
  };
  const { t } = useTranslation();

  const {
    statusSidebar,
    setStatusSidebar,
    setLanguageApp,
    userLocation,
    user,
  } = useAppStore((state) => ({
    statusSidebar: state.statusSidebar,
    setStatusSidebar: state.setStatusSidebar,
    progressBar: state.progressBar,
    setLanguageApp: state.setLanguageApp,
    userLocation: state.userLocation,
    user: state.user,
  }));

  return (
    <>
      <div className="fixed top-0 w-full md:w-[30rem] z-50">
        {/* header */}
        <header className="shadow-md dark:shadow-slate-500 z-50 p-2 bg-gradient-to-b from-gray-600 to-black">
          <div className="flex flex-row">
            {/* menu icon */}
            {/* <div className="hover:cursor-pointer md:hidden text-DT-bright hover:text-color-theme dark:hover:text-D-color-theme font-semibold text-2xl ltr:mr-3 rtl:ml-3"
                            onClick={() => { statusSidebar === "block" ? setStatusSidebar("hidden") : setStatusSidebar("flex") }}>

                            <IoMenu />

                        </div> */}
            {/* menu icon */}

            {/* header title */}
            <h2 className="basis-1/3 text-DT-bright font-semibold text-xl">
              {" "}
              AimoonHUB
            </h2>
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
              {/* <ul className="flex items-center space-x-1 text-sm ltr:ml-3 rtl:mr-3 ltr:border-r rtl:border-l border-slate-200"> */}
              <ul className="flex items-center space-x-1 text-sm ltr:ml-3 rtl:mr-3">
                {/* {console.log(user.username)} */}
                {sessionStorage.getItem("token") ? (
                  <>
                    <div className="relative text-left cursor-pointer" onClick={()=>{statusMenu == "hidden" ? setStatusMenu("") : setStatusMenu("hidden")}}>
                      <div className="flex w-full justify-center gap-x-1.5">
                        welcome {user.username}
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="-mr-1 h-5 w-5 text-gray-400"
                        />
                      </div>
                    </div>

                    <div className={"absolute top-8 right-2 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in " + statusMenu}>
                      <div className="py-1">
                    
                        <div
                          className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:text-color-theme"
                          onClick={() => {
                            serviceLogOut();
                          }}
                        >
                          Log Out
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        className="text-DT-bright hover:text-color-theme dark:hover:text-D-color-theme px-2"
                        to="/login"
                      >
                        {t("login")}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="text-DT-bright hover:text-color-theme dark:hover:text-D-color-theme px-2"
                        to="/register"
                      >
                        {t("register")}
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
              {/* login - register */}
            </div>
          </div>
        </header>
        {/* header */}
      </div>
    </>
  );
}
