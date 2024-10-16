import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import useAppStore from "../../../app/stores/AppStore.js";

import { FaLock } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { DEFAULT_COIN_IMAGE } from "../../../app/constant/Defaults.js";

import Button from "../../core/components/Button.jsx";

import { goToSymbolDashboard } from "../../../../utils/lib/symbol/goToSymbolDashboard.js";
import ModalDialogs from "../../core/components/ModalDialogs.jsx";

function handleClickDashboard(
  event,
  status,
  setModalDashboard,
  row,
  props
) {
  if (status === "lock") {
    setModalDashboard(true);
  } else {
    goToSymbolDashboard(props?.navigate, event, row?.name, props?.nav);
  }
}

function handleClick(event, status, setModalCoin, props) {
  if (status === "lock") {
    setModalCoin(true);
  } else {
    event.preventDefault();
    props?.navigate("/symbols-list", {
      state: { nav: props?.nav },
    });
  }
}

function CoinModal({ modalCoin, setModalCoin }) {
  return (
    <>
      <ModalDialogs
        showModal={modalCoin}
        setShowModal={setModalCoin}
        title={"هشدار"}
        text={"برای مشاهده‌ی این بخش باید لاگین شوید"}
        type="info"
      />
    </>
  );
}
function CoinDashboardModal({ modalDashboard, setModalDashboard }) {
  return (
    <>
      <ModalDialogs
        showModal={modalDashboard}
        setShowModal={setModalDashboard}
        title={"هشدار"}
        text={"برای مشاهده‌ی این بخش باید لاگین شوید"}
        type="info-login"
      />
    </>
  );
}

function CoinSlider(props) {
  const { allowed } = useAppStore((state) => ({
    allowed: state.allowed,
  }));
  
  const [modalCoin, setModalCoin] = useState(false);
  const [modalDashboard, setModalDashboard] = useState(false);

  const location = useLocation();
  let state = location.state;

  let status = "lock";
  let btnClass = "bg-color-theme-light hover:bg-color-theme-light";

  // if (state !== null && state.landing_symbol_analysis === "unlock") {
  if (allowed) {
    status = "unlock";
    btnClass = "bg-color-theme hover:bg-color-theme";
  }

  return (
    <>
      {modalDashboard && (
        <CoinDashboardModal modalDashboard={modalDashboard} setModalDashboard={setModalDashboard} />
      )}
      {modalCoin && (
        <CoinModal modalCoin={modalCoin} setModalCoin={setModalCoin} />
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
                      handleClickDashboard(event, status, setModalDashboard, row, props)
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
            handleClick(event, status, setModalCoin, props);
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
