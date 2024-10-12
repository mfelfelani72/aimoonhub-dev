import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { getData } from "../../../utils/helpers/getData.js";

import { PROVIDERS } from "../../app/constant/EndPoints.js";
import { DEFAULT_PROVIDER_IMAGE } from "../../app/constant/Defaults.js";
import { DEFAULT_COIN_IMAGE } from "../../app/constant/Defaults.js";

import Button from "../core/components/Button.jsx";

function ProvidersList() {
  const nav = [
    { title: "home", address: "/" },
    { title: "providers list", address: "/providers-list" },
    { title: "end" },
  ];
  const [providersList, setProvidersList] = useState([]);
  const [category, setCategory] = useState("cryptocurrencies");
  const [priority, setPriority] = useState(2);

  const getProvidersList = async () => {
    const parameter = {
      category: category,
      priority: priority,
    };

    try {
      getData(PROVIDERS, parameter).then((response) => {
        if (response.data.data) {
          console.log("Fetch dataProvidersList done.");
          // console.log(response.data.data.provider_list)
          setProvidersList(response.data.data.provider_list);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // if (providersList.length == 0) {
    if (providersList.length == 0) {
      
      getProvidersList()
    };
  
  }, [providersList]);

  const navigate = useNavigate();
  const goto = (row, event) => {
    event.preventDefault();
    navigate("/provider-dashboard", { state: { provider: row, nav: nav } });
  };
  return (
    <div className="bg-white m-4 rounded-[1rem]">
      {/* header */}
      <h2 className="pt-1 px-2">Providers List</h2>
      <div className="text-[0.7rem] text-slate-500 font-bold px-2">
        <span>
          <NavLink to="/">Home</NavLink>
        </span>
        <span className="pl-2"> {" > "}</span>
        <span className="pl-2">Providers List</span>
      </div>

      {/* header */}
      <div className="container p-2 mx-auto">
      <div className="grid grid-cols-1 gap-2 ">
          {/* card */}
          {providersList.length !== 0 && providersList?.map((row, index) => (
            <div key={index} className="border-2 rounded-xl p-2 pt-3">
              <div className="h-[6rem]">
                <div className="flex flex-row">
                  <div className="basis-2/5">
                    <div className="">
                      <a href={row?.url} target="_blank">
                        <img
                          className="h-[4rem] w-[4rem] rounded-full mx-auto border-2 border-color-theme"
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
                      </a>
                    </div>
                    <div className="text-[0.8rem] text-slate-800 pt-1 text-center">
                      <a href={row?.url} target="_blank">
                        {row?.name}
                      </a>
                    </div>
                  </div>
                  <div className="basis-3/5 text-center self-center">
                    <div className="text-[0.8rem]">
                      <span className="font-bold">+{parseInt(row?.newsCount).toLocaleString()}</span> news
                    </div>
                    <div className="mt-5">
                      <Button
                        className="bg-color-theme hover:bg-color-theme dark:bg-D-color-theme dark:hover:bg-D-color-theme text-[0.8rem] px-3"
                        onClick={(event) => goto(row, event)}
                      >
                        Dashboard
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-center mt-1">
                {row?.symbols
                  ? row?.symbols.map((element, index) =>
                      index <= 4 ? (
                        <div key={index}>
                          <img
                            className="h-[2rem] w-[2rem] rounded-full mx-auto"
                            alt="coin"
                            src={
                              row?.coin?.local_image
                                ? row?.coin?.local_image
                                : row?.coin?.logoUrl
                                ? row?.coin?.logoUrl
                                : DEFAULT_COIN_IMAGE
                            }
                            onError={(e) => {
                              e.target.src = DEFAULT_COIN_IMAGE;
                            }}
                          />
                          <div className="text-[0.65rem] text-center font-bold">
                            +{element.news_count.toLocaleString()}
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </div>
            </div>
          ))}

          {/* card */}
        </div>
      </div>
    </div>
  );
}
1;
export default ProvidersList;
