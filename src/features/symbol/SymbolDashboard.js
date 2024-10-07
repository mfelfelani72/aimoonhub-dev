import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { AiOutlineBarChart } from "react-icons/ai";
import { AiOutlineFrown } from "react-icons/ai";
import { AiOutlineSmile } from "react-icons/ai";

import BarChart from "../core/components/BarChart.jsx";
import Button from "../core/components/Button.jsx";
import CardRow from "./components/CardRow.jsx";
import Loader from "../core/components/Loader.jsx";

import { getData } from "../../../utils/helpers/getData";

import { DEFAULT_AVATAR_IMAGE } from "./../../app/constant/Defaults.js";

const lodash = require("lodash");
const PAGE_NUMBER = 1;

function SymbolDashboard() {
  const navigate = useNavigate();

  const location = useLocation();
  const [symbol] = useState(location.state.symbol);
  const [nav] = useState(location.state.nav);
  // for day

  const [dayPercentNewScore, setDayPercentNewScore] = useState();
  const [daySignScore, setDaySignScore] = useState();
  const [dayStatusScore, setDayStatusScore] = useState();
  const [dayClassNameNewScore, setDayClassNameNewScore] = useState();

  // for week

  const [weekPercentNewScore, setWeekPercentNewScore] = useState();
  const [weekSignScore, setWeekSignScore] = useState();
  const [weekStatusScore, setWeekStatusScore] = useState();
  const [weekClassNameNewScore, setWeekClassNameNewScore] = useState();

  const [symbolName, setSymbolName] = useState(symbol?.name);
  const [newsCategory, setNewsCategory] = useState("cryptocurrencies");
  const [newsFrom, setNewsFrom] = useState("1716373411");
  const [newsLlmOnly, setNewsLlmOnly] = useState(false);
  const [newsPageLimit, setNewsPageLimit] = useState(5);
  const [newsPage, setNewsPage] = useState(PAGE_NUMBER);

  const [newsData, setNewsData] = useState([]);
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState();

  const setDayDetailsProgressBar = () => {
    setDayPercentNewScore(
      Math.max(
        symbol?.lastDay_sentiment.negative,
        symbol?.lastDay_sentiment.neutral,
        symbol?.lastDay_sentiment.positive
      )
    );
    console.log();
    if (
      symbol?.lastDay_sentiment.negative == 0 &&
      symbol?.lastDay_sentiment.neutral == 0 &&
      symbol?.lastDay_sentiment.positive == 0
    ) {
      setDayClassNameNewScore("text-center font-bold ");
      setDayStatusScore("");
      setDaySignScore("");
    } else if (
      Math.max(
        symbol?.lastDay_sentiment.negative,
        symbol?.lastDay_sentiment.neutral,
        symbol?.lastDay_sentiment.positive
      ) === symbol?.lastDay_sentiment.negative
    ) {
      setDayClassNameNewScore("text-center font-bold text-rose-300");
      setDayStatusScore("Negative");
      setDaySignScore("-");
    } else if (
      Math.max(
        symbol?.lastDay_sentiment.negative,
        symbol?.lastDay_sentiment.neutral,
        symbol?.lastDay_sentiment.positive
      ) === symbol?.lastDay_sentiment.neutral
    ) {
      setDayClassNameNewScore("text-center font-bold text-slate-300");
      setDayStatusScore("Neutral");
      setDaySignScore(" ");
    } else {
      setDayClassNameNewScore("text-center font-bold text-lime-300");
      setDayStatusScore("Positive");
      setDaySignScore("+");
    }
  };

  const setWeekDetailsProgressBar = () => {
    setWeekPercentNewScore(
      Math.max(
        symbol?.lastWeek_sentiment.negative,
        symbol?.lastWeek_sentiment.neutral,
        symbol?.lastWeek_sentiment.positive
      )
    );
    if (
      symbol?.lastWeek_sentiment.negative == 0 &&
      symbol?.lastWeek_sentiment.neutral == 0 &&
      symbol?.lastWeek_sentiment.positive == 0
    ) {
      setWeekClassNameNewScore("text-center font-bold ");
      setWeekStatusScore("");
      setWeekSignScore("");
    } else if (
      Math.max(
        symbol?.lastWeek_sentiment.negative,
        symbol?.lastWeek_sentiment.neutral,
        symbol?.lastWeek_sentiment.positive
      ) === symbol?.lastWeek_sentiment.negative
    ) {
      setWeekClassNameNewScore("text-center font-bold text-rose-300");
      setWeekStatusScore("Negative");
      setWeekSignScore("-");
    } else if (
      Math.max(
        symbol?.lastWeek_sentiment.negative,
        symbol?.lastWeek_sentiment.neutral,
        symbol?.lastWeek_sentiment.positive
      ) === symbol?.lastWeek_sentiment.neutral
    ) {
      setWeekClassNameNewScore("text-center font-bold text-slate-300");
      setWeekStatusScore("Neutral");
      setWeekSignScore(" ");
    } else {
      setWeekClassNameNewScore("text-center font-bold text-lime-300");
      setWeekStatusScore("Positive");
      setWeekSignScore("+");
    }
  };

  const getNews = async () => {
    const parameter = {
      symbol: symbolName,
      category: newsCategory,
      startDate: newsFrom,
      llmOnly: newsLlmOnly,
      page: newsPage,
      pageLimit: newsPageLimit,
    };

    try {
      getData(LATEST_NEWS_PROVIDER, parameter).then((response) => {
        if (response.data.data.result) {
          console.log("Fetch data symbol news done.");
          // console.log(response.data.data.result);
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
    if (newsData.length == 0) {
      getNews();
    }

    // setDayDetailsProgressBar();
    // setWeekDetailsProgressBar();
  }, [newsData]);
  return (
    <div className="bg-white m-4 rounded-[1rem]">
      {/* header */}
      <h3 className="pt-2 px-2">Symbol Dashboard</h3>
      <div className="text-[0.7rem] text-slate-500 font-bold px-2">
        <span>
          {nav?.map((row, index) => (
            <span key={index}>
              {row?.title !== "end" ? (
                <NavLink key={index} to={row?.address}>
                  <span className="capitalize px-1">{row?.title}</span>
                  <span> {" > "}</span>
                </NavLink>
              ) : (
                <span className=" pl-1 capitalize">symbol dashboard</span>
              )}
            </span>
          ))}
        </span>{" "}
      </div>
      {/* header */}

      <div className="container mx-auto my-3 mb-3">
        <div className="flex mt-1">
          <div className="basis-1/4">
            <div className="">
              <a href={symbol?.biographyUrl} target="_blank">
                <img
                  className="h-[4rem] w-[4rem] rounded-full mx-auto border-2 border-color-theme"
                  alt={symbol?.description}
                  src={
                    symbol?.local_image
                      ? symbol?.local_image
                      : symbol?.logo
                      ? symbol?.logo
                      : DEFAULT_AVATAR_IMAGE
                  }
                  onError={(e) => {
                    e.target.src = DEFAULT_AVATAR_IMAGE;
                  }}
                />
              </a>
            </div>
            <div className="text-[0.8rem] text-slate-800 pt-1 text-center">
              <a href={symbol?.biographyUrl} target="_blank">
                {symbol?.name}
              </a>
            </div>
          </div>
          <div className="basis-3/4 mx-2">
            <div className="text-[0.8rem] text-slate-800 pt-1 px-2 border rounded-md">
              <span className="text-[0.8rem] font-bold">Description</span>
              <a href={symbol?.biographyUrl} target="_blank">
                <div className="text-[0.7rem] text-justify">
                  {symbol?.description}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SymbolDashboard;
