import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { DEFAULT_COIN_IMAGE } from "../../../app/constant/Defaults.js";

import Button from "../../core/components/Button.jsx";

import { goToSymbolDashboard } from "../../../../utils/lib/symbol/goToSymbolDashboard.js";

function CoinSlider(props) {
  return (
    <>
      <div className="flex flex-row">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={1}
          slidesPerView={4}
          navigation
          autoplay={{ delay: 1000 }}
        >
          {props?.symbolsList.map((row, index) => (
            <SwiperSlide key={index}>
              <>
                <div className="flex justify-center">
                  <img
                    className="h-6 w-6 rounded-full"
                    alt={row?.name}
                    src={
                      row?.local_image
                        ? row?.local_image
                        : row?.logo
                        ? row?.logo
                        : DEFAULT_COIN_IMAGE
                    }
                    onError={(e) => {
                      e.target.src = DEFAULT_COIN_IMAGE;
                    }}
                  />
                </div>
                <div className="pt-1 text-center text-[0.7rem] font-bold">
                  <a
                    className="cursor-pointer hover:text-color-theme"
                    onClick={(event) =>
                      goToSymbolDashboard(
                        props?.navigate,
                        event,
                        row?.name,
                        props?.nav
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
      <div className="mt-4">
        <Button
          className="bg-color-theme hover:bg-color-theme dark:bg-D-color-theme dark:hover:bg-D-color-theme text-[0.8rem] px-3"
          onClick={(event) => {
            event.preventDefault();
            props?.navigate("/symbols-list", {
              state: { nav: props?.nav },
            });
          }}
        >
          Coins List
        </Button>
      </div>
    </>
  );
}

export default CoinSlider;
