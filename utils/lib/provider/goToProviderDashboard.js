import React from "react";

import { PROVIDER_INFO } from "../../../src/app/constant/EndPoints.js";
import { getData } from "../../helpers/getData.js";

export function goToProviderDashboard(navigate, event, name, nav) {
  event.preventDefault();

  const parameter = {
    name: name,
  };

  try {
    getData(PROVIDER_INFO, parameter).then((response) => {
      if (response.data.data) {
        console.log("Fetch dataProvider done.");
        // console.log(response.data.data[0]);
        navigate("/provider-dashboard", {
          state: {
            provider: response.data.data[0],
            nav: nav,
          },
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
