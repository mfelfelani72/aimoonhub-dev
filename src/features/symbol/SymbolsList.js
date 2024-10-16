import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { getData } from "../../../utils/helpers/getData.js";

import { SYMBOLS } from "../../app/constant/EndPoints.js";
import { DEFAULT_COIN_IMAGE } from "../../app/constant/Defaults.js";

import Button from "../core/components/Button.jsx";

function SymbolsList() {
  const nav = [
    { title: "home", address: "/" },
    { title: "symbols list", address: "/symbols-list" },
    { title: "end" },
  ];
  const [symbolsList, setSymbolsList] = useState([]);
  const [symbolsListTemp, setSymbolsListTemp] = useState([]);
  const [priority, setPriority] = useState(0);

  const searchSymbols = (value) => {
    setSymbolsList(symbolsListTemp.filter(item => item.name.replace("-USDT","").toLowerCase().includes(value.toLowerCase())));
  };

  const getSymbolsList = async () => {
    const parameter = {
      priority: priority,
    };
    let token = "";

    if (sessionStorage.getItem("token"))
      token = sessionStorage.getItem("token");

    try {
      getData(SYMBOLS, parameter, token).then((response) => {
        if (response.data.data) {
          console.log("Fetch dataSymbolsList done.");
          // console.log(response.data.data);
          setSymbolsList(response.data.data);
          setSymbolsListTemp(response.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (symbolsList.length == 0) getSymbolsList();
  }, [symbolsList]);

  const navigate = useNavigate();

  return (
    <div className="bg-white m-4 rounded-[1rem]">
      {/* header */}
      <h2 className="pt-1 px-2">Symbols List</h2>
      <div className="text-[0.7rem] text-slate-500 font-bold px-2">
        <span>
          <NavLink to="/">Home</NavLink>
        </span>
        <span className="pl-2"> {" > "}</span>
        <span className="pl-2">Symbols List</span>
      </div>

      {/* header */}

      <div className="flex p-2 mt-2 mx-2">
        <div className="basis-2/5">
          <Button className={"bg-color-theme hover:bg-color-theme"}>
            {" "}
            معرفی سرویس{" "}
          </Button>
        </div>
        <div className="basis-3/5">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-color-theme">
            <input
              id="search"
              name="search"
              type="text"
              onChange={(e) => searchSymbols(e.target.value)}
              className="w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
            <span className="flex select-none items-center pr-3 text-gray-500 sm:text-sm">
              search
            </span>

            {/* </div> */}
          </div>
        </div>
      </div>

      <div className="container p-2 mx-auto">
        <div className="grid grid-cols-3 gap-2 ">
          {/* card */}
          {symbolsList?.map((row, index) => (
            <div key={index} className=" rounded-xl p-2 pt-3">
              <a
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/symbol-dashboard", {
                    state: { symbol: row, nav: nav },
                  });
                }}
              >
                <div className="h-[6rem] cursor-pointer">
                  <div className="">
                    <img
                      className="h-[4rem] w-[4rem] rounded-full mx-auto border-2 border-color-theme transition duration-500 hover:rotate-360"
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
                  <div className="text-[0.8rem] text-slate-800 pt-1 text-center hover:text-color-theme">
                    {row?.name.replace(row?.name.slice(-5), "")}
                  </div>

                  {/* <div className="basis-3/5 text-center self-center">
                    <div className="text-[0.8rem]">
                      <span className="font-bold"></span>
                    </div>
                    <div className="">
                      <Button
                        className="bg-color-theme hover:bg-color-theme dark:bg-D-color-theme dark:hover:bg-D-color-theme text-[0.8rem] px-3"
                        onClick={(event) => {
                          event.preventDefault();
                          navigate("/symbol-dashboard", {
                            state: { symbol: row, nav: nav },
                          });
                        }}
                      >
                        Dashboard
                      </Button>
                    </div>
                  </div> */}
                </div>
              </a>
            </div>
          ))}

          {/* card */}
        </div>
      </div>
    </div>
  );
}
1;
export default SymbolsList;
