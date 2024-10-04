import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import useAppStore from "../../stores/AppStore.js";
import i18n from "../../../../utils/services/i18n";
// get Country

import useGeoLocation from "../../../../utils/lib/useGeoLocation.js";

// get Country

import "../../styles/app/app.css";

import GuestRoutes from "../../routes/GuestRoutes";
import { Header } from "../../../features/core/Header";
import { Footer } from "../../../features/core/Footer.js";
import Page404 from "../../../features/core/components/Page404.jsx";
import SplashScreen from "../../../features/core/SplashScreen.js";

import { GUESTS_ROUTES } from "../../constant/Routes.js";

// This will be our Task
class Task {
  constructor({ action }) {
    // This will be a closure function that will be executed
    this.action = action;
  }
}

const App = () => {

  // initial country

  useGeoLocation();

  // initial country

  // { load Global States from zustand
  const { splashScreen, setProgressBar } =
    useAppStore((state) => ({
      progressBar: state.progressBar,
      setProgressBar: state.setProgressBar,
      splashScreen: state.splashScreen,
      setUserLocation: state.setUserLocation,
      userLocation: state.userLocation,
    }));
  // load Global States from zustand }

  // { task for splashScreen
  const tasks = [
    new Task({
      action: () => new Promise((resolve) => setTimeout(resolve, 2000)),
    }),
    new Task({
      action: () => new Promise((resolve) => setTimeout(resolve, 3000)),
    }),
  ];
  // task for splashScreen }


  useEffect(() => {
   
    // { initial language

    const rootHtml = document.getElementById("root-html");

    if (
      rootHtml &&
      localStorage.getItem("currentLngId") &&
      localStorage.getItem("currentLngDir")
    ) {
      i18n.changeLanguage(localStorage.getItem("currentLngId"));
      rootHtml.setAttribute("dir", localStorage.getItem("currentLngDir"));
    }

    // initial language }

    // { initial theme mode (dark or light)

    if (
      (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) ||
      localStorage.getItem("theme") === "dark"
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // initial theme mode }
  }, []);

  // { define public or private routes (guest or admin)

  const location = useLocation();
  const { pathname } = location;

  // const AdminRoutes = ["/dashboard"];

  // define public or private routes }

  // { guest routes

  if (GUESTS_ROUTES.includes(pathname)) {
    return (
      <div className="font-main">
        {
          splashScreen ? (
            // { first splashScreen app

            <div className="h-screen w-screen flex items-center justify-center px-16 bg-B-V-bright dark:bg-DB-bright">
              <SplashScreen tasks={tasks} />
            </div>
          ) : (
            // first splashScreen app }
            // { load app for guest users

            <>
              <Header />

              <div className="mt-12 bg-B-V-bright dark:bg-DB-dim">
                <GuestRoutes />
              </div>

              <Footer />
            </>
          )

          // load app for guest users }
        }
      </div>
    );
  }

  // guest routes }

  // { admin routes

  // else if (adminRoutes.includes(pathname)) {

  //     return (
  //         <AdminRoutes />
  //     );
  // }

  // admin routes }

  // { page 404
  else
    return (
      <Routes>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    );
  // page 404 }
};

export default App;
