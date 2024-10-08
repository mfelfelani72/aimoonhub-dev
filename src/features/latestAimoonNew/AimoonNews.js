import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { getData } from "../../../utils/helpers/getData";
import { LATEST_NEWS } from "../../app/constant/EndPoints";

import Button from "../core/components/Button.jsx";
import Loader from "../core/components/Loader.jsx";

import CardRow from "../latestAimoonNew/components/cardRow.jsx";

const lodash = require("lodash");
const PAGE_NUMBER = 1;

function AimoonNews() {
  const location = useLocation();
  const endDate = useState(location.state.endDate);
  const [nav] = useState(location.state.nav);

  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState();
  const [newsCategory, setNewsCategory] = useState("cryptocurrencies");
  const [newsSymbols, setNewsSymbols] = useState("all");
  const [newsFrom, setNewsFrom] = useState("1716373411");
  const [newsEnd, setNewsEnd] = useState(endDate[0]);
  const [newsPage, setNewsPage] = useState(PAGE_NUMBER);
  const [newsPageLimit, setNewsPageLimit] = useState(10);

  const getNews = async () => {
    const parameter = {
      category: newsCategory,
      symbols: newsSymbols,
      startDate: newsFrom,
      endDate: newsEnd,
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
          {nav?.map((row, index) => (
            <span key={index}>
              {row?.title !== "end" ? (
                <NavLink key={index} to={row?.address}>
                  <span className="capitalize pr-1">{row?.title}</span>
                  <span> {" > "}</span>
                </NavLink>
              ) : (
                <span className="pl-1 capitalize">Aimoon News</span>
              )}
            </span>
          ))}
        </span>{" "}
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
