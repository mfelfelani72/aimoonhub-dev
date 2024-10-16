import React from "react";

import { SYMBOL_INFO } from "../../../src/app/constant/EndPoints.js";
import { getData } from "../../helpers/getData.js";

export function goToSymbolDashboard(navigate, event, name, nav) {
  // event.preventDefault();

  const parameter = {
    name: name,
  };

  let token = "";
  if (sessionStorage.getItem("token")) token = sessionStorage.getItem("token");

  try {
    getData(SYMBOL_INFO, parameter, token).then((response) => {
      if (response.data.data) {
        console.log("Fetch dataAuthor done.");
        // console.log(response.data.data[0]);
        navigate("/symbol-dashboard", {
          state: {
            symbol: response.data.data[0],
            nav: nav,
          },
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
