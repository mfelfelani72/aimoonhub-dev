import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { getData } from "../../../utils/helpers/getData.js";
import { PROVIDERS } from "../../app/constant/EndPoints.js";
import ChartPie from "../core/components/ChartPie.jsx";

import { DEFAULT_PROVIDER_IMAGE } from "../../app/constant/Defaults.js";

function ProviderAnalysis() {
  const { t } = useTranslation();

  const [providers, setProviders] = useState([]);
  const [totalStat, setTotalStat] = useState([]);
  const [category, setCategory] = useState("cryptocurrencies");
  const [priority, setPriority] = useState(1);

  const getProviders = async () => {
    const parameter = {
      category: category,
      priority: priority,
    };

    try {
      getData(PROVIDERS, parameter).then((response) => {
        if (response.data.data) {
          console.log("Fetch dataProvider done.");
          // console.log(response.data.data);
          setProviders(response.data.data.provider_list);
          setTotalStat(response.data.data.total_stat);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (providers.length == 0) getProviders();
  }, [providers, totalStat]);
  return (
    <div className="bg-white m-4 rounded-[1rem]">
      {/* title */}
      <h2 className="p-2">{t("Aimoon Providers Analysis")}</h2>
      {/* title */}

      <div className="container mx-auto">
        {/* providers images */}
        <div className="self-center pl-2">
          <div className="text-[0.8rem] font-bold pb-1">Renowned Provider</div>
          <div className="flex flex-col items-end">
            <div className="relative h-10 w-[17rem] mx-auto">
              {providers.map((row, index) => (
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
                        : row?.logoUrl
                        ? row?.logoUrl
                        : DEFAULT_PROVIDER_IMAGE
                    }
                    onError={(e) => {
                      e.target.src = DEFAULT_PROVIDER_IMAGE;
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 mx-2">
              <NavLink
                to="/providers-list"
                className="mb-0 inline-flex items-center px-3 py-2 font-medium text-center text-white rounded-lg bg-color-theme hover:bg-color-theme-light text-[0.75rem] h-7 cursor-pointer"
              >
                Providers List
              </NavLink>
            </div>
          </div>
        </div>
        {/* providers images */}

        <div className="flex flex-row mt-4 py-2 px-[0.29rem]">
          <div className="basis-1/2 text-md content-center text-T-bright">
            <div className="h-[6rem] w-[6rem] mx-auto -mt-[1rem] mb-2">
              <ChartPie
                data={[
                  totalStat?.crypto_provider_counts,
                  totalStat?.forex_provider_counts,
                  totalStat?.commodity_provider_counts,
                ]}
                colors={["#06b6d4", "#a855f7", "#fde047"]}
                //   labels={[`+${totalStat?.crypto_provider_counts} Cryptocurrencies`,`+${totalStat?.forex_provider_counts} Forex`,`+${totalStat?.commodity_provider_counts} Commodity`]}
              />
            </div>
            <div className="text-sm text-center font-bold">
              Provider distribution chart in categories
            </div>
          </div>
          {/* <div className="basis-1/2">
            <div className="flex flex-col content-center justify-center">
              <div className="basis-1/2">
                <div className="flex flex-row">
                  <div className="basis-1/4">
                    <div className="bg-[#06b6d4] w-[2rem] h-2 my-1"></div>
                    <div className="bg-[#a855f7] w-[2rem] h-2 my-3"></div>
                    <div className="bg-[#fde047] w-[2rem] h-2 my-1"></div>
                  </div>
                  <div className="basis-3/4 text-[0.7rem] text-slate-800">
                    <div>
                      <span className="font-bold">
                        {" "}
                        +
                        {parseInt(
                          totalStat?.crypto_provider_counts
                        ).toLocaleString()}
                      </span>{" "}
                      Cryptocurrencies
                    </div>
                    <div className="mt-[0.25rem]">
                      <span className="font-bold">
                        +
                        {parseInt(
                          totalStat?.forex_provider_counts
                        ).toLocaleString()}
                      </span>{" "}
                      Forex
                    </div>
                    <div className="mt-[0.25rem]">
                      <span className="font-bold">
                        +
                        {parseInt(
                          totalStat?.commodity_provider_counts
                        ).toLocaleString()}
                      </span>{" "}
                      Commodities
                    </div>
                  </div>
                </div>
              </div>
              <div className="basis-1/2">
                <div className="text-lime-500 text-center text-md mt-[1.7rem]">
                  <span className="font-bold">
                    +{parseInt(totalStat?.total_provider).toLocaleString()}
                  </span>{" "}
                  Total Provider
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ProviderAnalysis;
