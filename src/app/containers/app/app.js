import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import useAppStore from "../../stores/AppStore.js";
import i18n from "../../../../utils/services/i18n";
// get Country

import useGeoLocation from "../../../../utils/lib/useGeoLocation.js";

// get Country

import "../../styles/app/app.css";

import { GUESTS_ROUTES, REGISTER_ROUTES } from "../../constant/Routes.js";
import Middleware from "./Middleware.jsx";

const App = () => {
  // initial country

  useGeoLocation();

  // initial country

  // { load Global States from zustand
  const {setProgressBar, allowed } = useAppStore((state) => ({
    progressBar: state.progressBar,
    setProgressBar: state.setProgressBar,
    setUserLocation: state.setUserLocation,
    userLocation: state.userLocation,
    allowed: state.allowed,
  }));
  // load Global States from zustand }



  useEffect(() => {
    // { initial language

    const rootHtml = document.getElementById("root-html");

    // if (
    //   rootHtml &&
    //   localStorage.getItem("currentLngId") &&
    //   localStorage.getItem("currentLngDir")
    // ) {
    //   i18n.changeLanguage(localStorage.getItem("currentLngId"));
    //   rootHtml.setAttribute("dir", localStorage.getItem("currentLngDir"));
    // }

    // initial language }

    // { initial theme mode (dark or light)

    // if (
    //   (window.matchMedia &&
    //     window.matchMedia("(prefers-color-scheme: dark)").matches) ||
    //   localStorage.getItem("theme") === "dark"
    // ) {
    //   document.documentElement.classList.add("dark");
    // } else {
    //   document.documentElement.classList.remove("dark");
    // }

    // initial theme mode }
  }, []);

 
  // { Middleware

  const location = useLocation();
  const { pathname } = location;

  if (GUESTS_ROUTES.includes(pathname) && !allowed) {
    return (
     <Middleware level={"guest"} pathname={pathname}/>
    );
  }

  
  else if (REGISTER_ROUTES.includes(pathname) && allowed) {
    return (
      <Middleware level={"register"} pathname={pathname} />
    );
  }
  
  else
    return (
      <Middleware level={"404"} />
    );
 
  //  Middleware }
};

export default App;
