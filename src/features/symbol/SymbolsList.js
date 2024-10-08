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
  const [priority, setPriority] = useState(0);

  const getSymbolsList = async () => {
    const parameter = {
      priority: priority,
    };

    try {
      getData(SYMBOLS, parameter).then((response) => {
        if (response.data.data) {
          console.log("Fetch dataSymbolsList done.");
          // console.log(response.data.data);
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
      <div className="container p-2 mx-auto">
        <div className="grid grid-cols-1 gap-2 ">
          {/* card */}
          {symbolsList?.map((row, index) => (
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
                              : row?.logo
                              ? row?.logo
                              : DEFAULT_COIN_IMAGE
                          }
                          onError={(e) => {
                            e.target.src = DEFAULT_COIN_IMAGE;
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
                  </div>
                </div>
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
export default SymbolsList;
