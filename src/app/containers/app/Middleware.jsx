import React, { useState } from "react";

import useAppStore from "../../stores/AppStore.js";
import SplashScreen from "../../../features/core/SplashScreen.js";
import { Header } from "../../../features/core/Header.js";
import { Footer } from "../../../features/core/Footer";

import GuestRoutes from "../../routes/GuestRoutes.js";
import RegisterRoutes from "../../routes/RegisterRoutes.js";
import Page404 from "../../../features/core/components/Page404.jsx";

// This will be our Task
class Task {
  constructor({ action }) {
    // This will be a closure function that will be executed
    this.action = action;
  }
}

function setRoutes(level) {
  if (level === "guest") return <GuestRoutes />;
  else if (level === "register") return <RegisterRoutes />;
  else if (level === "404") return <Page404 />;
}

function decideForShowFooter(pathname) {

  const without_footer = ["/login", "/register"];

  if (!without_footer.includes(pathname)) {
    return <Footer />;
  }
}

function Middleware({ level, pathname }) {
  let classNameString =
    "md:container md:mx-auto md:w-[30rem] bg-gray-100 mt-12 pt-1";
  if (pathname === "/login" || pathname === "/register")
    classNameString = "md:container md:mx-auto md:w-[30rem] bg-gray-100";
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

  const { splashScreen } = useAppStore((state) => ({
    splashScreen: state.splashScreen,
  }));
  return (
    <div className="font-main">
      {splashScreen ? (
        <div className="h-screen w-screen flex items-center justify-center px-16 bg-B-V-bright dark:bg-DB-bright ">
          <SplashScreen tasks={tasks} />
        </div>
      ) : (
        <>
          <div className={classNameString}>
            <Header />
            {setRoutes(level)}
            {decideForShowFooter(pathname)}
          </div>
        </>
      )}
    </div>
  );
}

export default Middleware;
