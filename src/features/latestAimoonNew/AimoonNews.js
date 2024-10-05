import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { getData } from "../../../utils/helpers/getData";
import { LATEST_NEWS } from "../../app/constant/EndPoints";

import Button from "../core/components/Button.jsx";
import Loader from "../core/components/Loader.jsx";

import CardRow from "../latestAimoonNew/components/cardRow.jsx";

const lodash = require("lodash");
const PAGE_NUMBER = 2;

function AimoonNews() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState();
  const [newsCategory, setNewsCategory] = useState("cryptocurrencies");
  const [newsSymbols, setNewsSymbols] = useState("all");
  const [newsFrom, setNewsFrom] = useState("1716373411");
  const [newsTo, setNewsTo] = useState("1725633001");
  const [newsPage, setNewsPage] = useState(PAGE_NUMBER);
  const [newsPageLimit, setNewsPageLimit] = useState(10);

  const getNews = async () => {
    const parameter = {
      category: newsCategory,
      symbols: newsSymbols,
      startDate: newsFrom,
      // "endDate": newsTo,
      page: newsPage,
      pageLimit: newsPageLimit,
      llmOnly: true,
    };

    try {
      getData(LATEST_NEWS, parameter).then((response) => {
        if (response.data.data.result) {
          console.log("Fetch dataLlm done.");
          //   console.log(response.data.data.result);
          setNewsData((prev) => {
            return [...prev, ...response.data.data.result];
          });

          setNewsPage((prev) => prev + 1);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetNews = async () => {
    setLoading(true);

    if (newsPage !== 1 || newsPage !== 2) lodashGetNews();
  };

  const lodashGetNews = lodash.debounce(function () {
    getNews();
  }, 100);

  useEffect(() => {
    if (newsData.length == 0) getNews();
  }, [newsData]);

  return (
    <div className="bg-white mx-4 rounded-[1rem]">
      {/* header */}
      <h2 className="p-2">Aimoon News</h2>
      <div className="text-[0.7rem] text-slate-500 font-bold px-2">
        <span>
          <NavLink to="/">Home</NavLink>
        </span>
      </div>
      {/* header */}

      <div className="container p-2 mx-auto">
        <div className="grid grid-cols-1 gap-2 ">
          {newsData?.map((row, index) => (
            <CardRow key={index} row={row} />
          ))}
        </div>
        <div className="text-end">
          <Button
            onClick={() => handleGetNews()}
            className="m-3 bg-color-theme hover:bg-color-theme dark:bg-D-color-theme dark:hover:bg-D-color-theme"
          >
            More
          </Button>
        </div>
        {loading && <Loader />}
      </div>
    </div>
  );
}

export default AimoonNews;
