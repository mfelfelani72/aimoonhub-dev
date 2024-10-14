import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { getData } from "../../../utils/helpers/getData.js";
import { SYMBOLS } from "../../app/constant/EndPoints.js";

import CoinSlider from "./components/CoinSlider.jsx";

function SymbolAnalysis() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const nav = [{ title: "home", address: "/" }, { title: "end" }];

  const [symbols, setSymbols] = useState([]);
  const [priority, setPriority] = useState(2);

  const getSymbols = async () => {
    const parameter = {
      priority: priority,
    };

    let token = "";

    if (sessionStorage.getItem("token"))
      token = sessionStorage.getItem("token");

    try {
      getData(SYMBOLS, parameter, token).then((response) => {
        
        if (response.data.data) {
          console.log("Fetch dataSymbol done.");
          // console.log(response.data.data);
          setSymbols(response.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (symbols.length == 0) getSymbols();
  }, [symbols]);
  return (
    <div className="bg-white m-4 rounded-[1rem] pb-4">
      {/* title */}
      <h2 className="p-2">{t("Aimoon Coins Analysis")}</h2>
      {/* title */}

      <div className="container mx-auto">
        <div className="text-[0.8rem] font-bold pb-1 px-2">Renowned Coin</div>
        <div className="w-full px-4">
          <CoinSlider symbolsList={symbols} navigate={navigate} nav={nav} />
        </div>
      </div>
    </div>
  );
}

export default SymbolAnalysis;
