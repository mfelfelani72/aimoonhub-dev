import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { getData } from "../../../utils/helpers/getData.js";
import {goToSymbolDashboard} from "../../../utils/lib/symbol/goToSymbolDashboard.js"

import { SYMBOLS } from "../../app/constant/EndPoints.js";
import { DEFAULT_COIN_IMAGE } from "../../app/constant/Defaults.js";

import { useTranslation } from "react-i18next";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

export function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const nav = [{ title: "home", address: "/" }, { title: "end" }];

  const [symbolsList, setSymbolsList] = useState([]);

  const getSymbolsList = async () => {
    const parameter = {
      priority: 2,
    };

    try {
      getData(SYMBOLS, parameter).then((response) => {
        if (response.data.data) {
          console.log("Fetch dataSymbolsList done.");
        //   console.log(response.data.data);
          setSymbolsList(response.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (symbolsList.length == 0) getSymbolsList();
  }, [symbolsList]);

  return (
    <>
      <footer className="relative border-t border-color-theme-light dark:border-D-color-theme-light bg-B-bright dark:bg-DT-dim z-10">
        <div className="flex flex-row m-3 p-2 border border-slate-300 rounded-xl">
          <Swiper
            modules={[Navigation]}
            spaceBetween={1}
            slidesPerView={4}
            navigation
          >
            {symbolsList.map((row, index) => (
              <SwiperSlide key={index}>
                <>
                  <div className="flex justify-center">
                    <img src={row?.logo} className="h-6 w-6 rounded-full"></img>
                  </div>
                  <div className="pt-1 text-center text-[0.7rem] font-bold">
                    <a
                      className="cursor-pointer hover:text-color-theme"
                      onClick={(event) =>
                        goToSymbolDashboard(
                          navigate,
                          event,
                          row?.name,
                          nav
                        )
                      }
                    >
                      {row?.name}
                    </a>
                  </div>
                </>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="h-16 py-2">
          <div className="text-sm/6  text-center flex-col ltr">
            <p>
              <span className="text-T-bright dark:text-DT-bright">
                © 2024{" "}
                <a
                  href="#"
                  className="text-color-theme dark:text-D-color-theme"
                >
                  AimoonHUB
                </a>
              </span>
            </p>
            <p>
              <span className="text-T-bright dark:text-DT-bright">
                {t("copyright")}
              </span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
