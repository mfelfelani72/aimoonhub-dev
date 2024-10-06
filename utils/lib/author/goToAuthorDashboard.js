import React from "react";

import { AUTHOR_INFO } from "../../../src/app/constant/EndPoints.js";
import { getData } from "../../helpers/getData.js";

export function goToAuthorDashboard(navigate, event, name, category) {
  event.preventDefault();

  const parameter = {
    category: category,
    name: name,
  };

  try {
    getData(AUTHOR_INFO, parameter).then((response) => {
      if (response.data.data) {
        console.log("Fetch dataAuthor done.");
        // console.log(response.data.data[0]);
        navigate("/author-dashboard", {
          state: {
            author: response.data.data[0],
            nav: [
              { title: "home", address: "/" },
              { title: "author dashboard" },
            ],
          },
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
