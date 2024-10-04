import { create } from "zustand";

import i18n from "../../../utils/services/i18n";

function configureLang(id, dir) {
  i18n.changeLanguage(id);

  const rootHtml = document.getElementById("root-html");
  localStorage.setItem("currentLngId", [id]);
  localStorage.setItem("currentLngDir", [dir]);

  if (rootHtml && dir == "rtl") rootHtml.setAttribute("dir", "rtl");
  else rootHtml.setAttribute("dir", "ltr");

  return id;
}

function getCountry() {
  // const location = useGeoLocation();
  // console.log(location)
}

const useAppStore = create((set) => ({
  //    splashScreen

  splashScreen: false,
  setSplashScreen: (splashScreen) => set({ splashScreen: splashScreen }),

  //    splashScreen

  //    sidebar

  sidebarLink: "news",
  setSidebarLink: (sidebarLink) => set({ sidebarLink: sidebarLink }),

  statusSidebar: "",
  setStatusSidebar: (statusSidebar) => set({ statusSidebar: statusSidebar }),

  //    sidebar

  //    header

  progressBar: "0",
  setProgressBar: (progressBar) => set({ progressBar: progressBar }),

  //    header

  //    language

  languageApp: "",
  setLanguageApp: (id, dir) =>
    set({
      languageApp: configureLang(id, dir),
    }),

  //    language

  //    UserLocation

  userLocation: "",
  setUserLocation: (userLocation) => set({ userLocation: userLocation }),

  //    UserLocation
}));

export default useAppStore;
