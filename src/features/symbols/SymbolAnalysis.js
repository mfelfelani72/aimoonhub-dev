import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { getData } from "../../../utils/helpers/getData.js";
import { SYMBOLS } from "../../app/constant/EndPoints.js";
import ChartPie from "../core/components/ChartPie.jsx";

import { DEFAULT_PROVIDER_IMAGE } from "../../app/constant/Defaults.js";

function SymbolAnalysis() {
  const { t } = useTranslation();

  const [symbols, setSymbols] = useState([]);

  const [priority, setPriority] = useState(1);

  const getSymbols = async () => {
    const parameter = {
      priority: priority,
    };

    try {
      getData(SYMBOLS, parameter).then((response) => {
        if (response.data.data) {
          console.log("Fetch dataSymbol done.");
          console.log(response.data.data);
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
        {/* symbols images */}
        <div className="self-center">
          <div className="text-[0.8rem] font-bold pb-1 px-2">Renowned Coin</div>
          <div className="flex flex-col items-center">
            <div className="relative h-10 w-[17rem] px-auto">
              <div className="text-center">
                {symbols.map((row, index) => (
                  <div
                    style={{
                      left: `${index * 2 + 3}rem`,
                    }}
                    className="absolute top-0"
                    key={index}
                  >
                    <img
                      className="h-12 w-12 rounded-full"
                      alt={row?.name}
                      src={
                        row?.local_image
                          ? row?.local_image
                          : row?.logo
                          ? row?.logo
                          : DEFAULT_PROVIDER_IMAGE
                      }
                      onError={(e) => {
                        e.target.src = DEFAULT_PROVIDER_IMAGE;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 mx-2">
              <NavLink
                to="/symbols-list"
                className="mb-0 inline-flex items-center px-3 py-2 font-medium text-center text-white rounded-lg bg-color-theme hover:bg-color-theme-light text-[0.75rem] h-7 cursor-pointer"
              >
                Coins List
              </NavLink>
            </div>
          </div>
        </div>
        {/* symbols images */}
      </div>
    </div>
  );
}

export default SymbolAnalysis;
