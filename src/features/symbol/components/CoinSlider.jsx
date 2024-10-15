import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { FaLock } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { DEFAULT_COIN_IMAGE } from "../../../app/constant/Defaults.js";

import Button from "../../core/components/Button.jsx";

import { goToSymbolDashboard } from "../../../../utils/lib/symbol/goToSymbolDashboard.js";
import ModalDialogs from "../../core/components/ModalDialogs.jsx";

function handleClick(event, status, setShowModal, props) {
  if (status === "lock") setShowModal(true);
  else {
    event.preventDefault();
    props?.navigate("/symbols-list", {
      state: { nav: props?.nav },
    });
  }
}

function CoinModal({ showModal, setShowModal }) {
  return (
    <>
      <ModalDialogs
        showModal={showModal}
        setShowModal={setShowModal}
        title={"هشدار"}
        text={"برای مشاهده‌ی این بخش باید لاگین شوید"}
        type="info"
      />
    </>
  );
}

function CoinSlider(props) {
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  let state = location.state;

  let status = "lock";
  let btnClass = "bg-color-theme-light hover:bg-color-theme-light";

  // if (state !== null && state.landing_symbol_analysis === "unlock") {
  if (sessionStorage.getItem("token")) {
    status = "unlock";
    btnClass = "bg-color-theme hover:bg-color-theme";
  }

  return (
    <>
      {showModal && (
        <CoinModal showModal={showModal} setShowModal={setShowModal} />
      )}

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
      <div className="self-center mt-4">
        <Button
          className={"text-[0.8rem] px-3 " + btnClass}
          onClick={(event) => {
            handleClick(event, status, setShowModal, props);
          }}
        >
          <span className="pt-1">Coins List </span>{" "}
          {status === "lock" && (
            <span className="pl-2 text-md text-white">
              {" "}
              <FaLock />{" "}
            </span>
          )}
        </Button>
      </div>
    </>
  );
}

export default CoinSlider;
