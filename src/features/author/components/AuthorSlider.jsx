import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { DEFAULT_AVATAR_IMAGE } from "../../../app/constant/Defaults.js";

import Button from "../../core/components/Button.jsx";

import { goToAuthorDashboard } from "../../../../utils/lib/author/goToAuthorDashboard.js";

function AuthorSlider(props) {
  return (
    <>
      <div className="flex flex-row">
        <Swiper
          modules={[Navigation]}
          spaceBetween={1}
          slidesPerView={4}
          navigation
        >
          {props?.authorsList.map((row, index) => (
            <SwiperSlide key={index}>
              <>
                <div className="flex justify-center">
                  <img
                    className="h-8 w-8 rounded-full"
                    alt={row?.name}
                    src={
                      row?.local_image
                        ? row?.local_image
                        : row?.picUrl
                        ? row?.picUrl
                        : DEFAULT_AVATAR_IMAGE
                    }
                    onError={(e) => {
                      e.target.src = DEFAULT_AVATAR_IMAGE;
                    }}
                  />
                </div>
                <div className="pt-1 text-center text-[0.7rem] font-bold">
                  <a
                    className="cursor-pointer hover:text-color-theme"
                    onClick={(event) =>
                      goToAuthorDashboard(
                        props?.navigate,
                        event,
                        row?.name,
                        "cryptocurrencies",
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
            props?.navigate("/authors-list", {
              state: { nav: props?.nav },
            });
          }}
        >
          Authors List
        </Button>
      </div>
    </>
  );
}

export default AuthorSlider;
