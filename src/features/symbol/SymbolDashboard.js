import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { AiOutlineBarChart } from "react-icons/ai";
import { AiOutlineFrown } from "react-icons/ai";
import { AiOutlineSmile } from "react-icons/ai";

import TWChart from "../core/components/charts/TWChart.jsx";
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

  // console.log(symbol);

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
        symbol?.latest_news_info.last_day_sentiment.negative,
        symbol?.latest_news_info.last_day_sentiment.neutral,
        symbol?.latest_news_info.last_day_sentiment.positive
      )
    );

    if (
      symbol?.latest_news_info.last_day_sentiment.negative == 0 &&
      symbol?.latest_news_info.last_day_sentiment.neutral == 0 &&
      symbol?.latest_news_info.last_day_sentiment.positive == 0
    ) {
      setDayClassNameNewScore("text-center font-bold ");
      setDayStatusScore("");
      setDaySignScore("");
    } else if (
      Math.max(
        symbol?.latest_news_info.last_day_sentiment.negative,
        symbol?.latest_news_info.last_day_sentiment.neutral,
        symbol?.latest_news_info.last_day_sentiment.positive
      ) === symbol?.latest_news_info.last_day_sentiment.negative
    ) {
      setDayClassNameNewScore("text-center font-bold text-rose-300");
      setDayStatusScore("Negative");
      setDaySignScore("-");
    } else if (
      Math.max(
        symbol?.latest_news_info.last_day_sentiment.negative,
        symbol?.latest_news_info.last_day_sentiment.neutral,
        symbol?.latest_news_info.last_day_sentiment.positive
      ) === symbol?.latest_news_info.last_day_sentiment.neutral
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
        symbol?.latest_news_info.last_Week_sentiment.negative,
        symbol?.latest_news_info.last_Week_sentiment.neutral,
        symbol?.latest_news_info.last_Week_sentiment.positive
      )
    );
    if (
      symbol?.latest_news_info.last_Week_sentiment.negative == 0 &&
      symbol?.latest_news_info.last_Week_sentiment.neutral == 0 &&
      symbol?.latest_news_info.last_Week_sentiment.positive == 0
    ) {
      setWeekClassNameNewScore("text-center font-bold ");
      setWeekStatusScore("");
      setWeekSignScore("");
    } else if (
      Math.max(
        symbol?.latest_news_info.last_Week_sentiment.negative,
        symbol?.latest_news_info.last_Week_sentiment.neutral,
        symbol?.latest_news_info.last_Week_sentiment.positive
      ) === symbol?.latest_news_info.last_Week_sentiment.negative
    ) {
      setWeekClassNameNewScore("text-center font-bold text-rose-300");
      setWeekStatusScore("Negative");
      setWeekSignScore("-");
    } else if (
      Math.max(
        symbol?.latest_news_info.last_Week_sentiment.negative,
        symbol?.latest_news_info.last_Week_sentiment.neutral,
        symbol?.latest_news_info.last_Week_sentiment.positive
      ) === symbol?.latest_news_info.last_Week_sentiment.neutral
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

    setDayDetailsProgressBar();
    setWeekDetailsProgressBar();
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
        {/* section info */}

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

        {/* section info */}

        {/* section based */}

        <div className="flex mt-2">
          <div className="bg-emerald-200 border-y-2 border-emerald-400 w-full mt-1 py-1 text-center">
            <span className="text-emerald-700">
              {symbol?.name} News Based Statistics
            </span>
          </div>
        </div>

        <div className="flex my-2">
          <div className="basis-2/5 self-center">
            <div className="h-[3rem] w-[3rem] mx-auto rounded-full border-2 border-color-theme">
              <AiOutlineBarChart className="h-[2rem] w-[2rem] m-auto mt-1 text-color-theme" />
            </div>
          </div>
          <div className="basis-3/5 p-2 justify-center">
            <div className="text-sm">
              <span className="text-sm font-bold">
                +{symbol?.latest_news_info.news_count}
              </span>{" "}
              News
            </div>
            <div className="text-sm">
              <span className="text-sm font-bold">
                +{symbol?.latest_news_info.avg_news_day}
              </span>{" "}
              News Per Day
            </div>
            <div className="text-sm">
              <span className="text-sm font-bold">
                +{symbol.latest_news_info?.avg_news_week}
              </span>{" "}
              News Per Week
            </div>
            <div className="text-sm">
              <span className="text-sm font-bold">
                +{symbol.latest_news_info?.avg_news_month}
              </span>{" "}
              News Per Month
            </div>
          </div>
        </div>
        {/* section based */}

        {/* today */}
        {dayPercentNewScore !== 0 ? (
          <>
            <div className="flex mt-2">
              <div className="bg-cyan-200 border-y-2 border-cyan-400 w-full mt-1 py-1 text-center">
                <span className="text-cyan-700">
                  Today Currency Pair Sentiment
                </span>
              </div>
            </div>

            <div className="flex my-2">
              <div className="basis-1/2 self-center">
                <div className="flex w-ful justify-center mx-2 border-2">
                  <div
                    style={{
                      width: `${
                        symbol?.latest_news_info.last_day_sentiment.positive *
                        100
                      }%`,
                    }}
                    className="bg-lime-300 h-6"
                  ></div>
                  <div
                    style={{
                      width: `${
                        symbol?.latest_news_info.last_day_sentiment.negative *
                        100
                      }%`,
                    }}
                    className="bg-rose-300"
                  ></div>
                  <div
                    style={{
                      width: `${
                        symbol?.latest_news_info.last_day_sentiment.neutral *
                        100
                      }%`,
                    }}
                    className="bg-slate-300"
                  ></div>
                </div>
                <div className={dayClassNameNewScore}>
                  {daySignScore}
                  {Math.round(dayPercentNewScore * 100)}%
                </div>
              </div>
              <div className="basis-1/2 p-2 justify-center text-center">
                <div className="flex text-md justify-center">
                  <span className="px-2">
                    {daySignScore == "+" ? (
                      <AiOutlineSmile className="h-7 w-7 rounded-full bg-[#fef08a]" />
                    ) : daySignScore == " " ? (
                      ""
                    ) : (
                      <AiOutlineFrown className="h-7 w-7 rounded-full bg-[#fef08a]" />
                    )}
                  </span>
                  <span className="self-center">
                    {daySignScore}
                    {Math.round(dayPercentNewScore * 100)}%
                  </span>
                </div>
                <div className="text-md font-bold mt-1">
                  Out of{" "}
                  <span className="font-bod">
                    {symbol?.latest_news_info.last_day_count}
                  </span>
                </div>
                <div className="text-lg">
                  <span className={dayClassNameNewScore}>{dayStatusScore}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        {/* today */}

        {/* week */}

        <div className="flex mt-2">
          <div className="bg-violet-200 border-y-2 border-violet-400 w-full mt-1 py-1 text-center">
            <span className="text-violet-700">
              This Week Currency Pair Sentiment
            </span>
          </div>
        </div>

        <div className="flex my-2">
          <div className="basis-1/2 self-center">
            <div className="flex w-ful justify-center mx-2 border-2">
              <div
                style={{
                  width: `${
                    symbol?.latest_news_info.last_Week_sentiment.positive * 100
                  }%`,
                }}
                className="bg-lime-300 h-6"
              ></div>
              <div
                style={{
                  width: `${
                    symbol?.latest_news_info.last_Week_sentiment.negative * 100
                  }%`,
                }}
                className="bg-rose-300"
              ></div>
              <div
                style={{
                  width: `${
                    symbol?.latest_news_info.last_Week_sentiment.neutral * 100
                  }%`,
                }}
                className="bg-slate-300"
              ></div>
            </div>
            <div className={weekClassNameNewScore}>
              {weekSignScore}
              {Math.round(weekPercentNewScore * 100)}%
            </div>
          </div>
          <div className="basis-1/2 p-2 justify-center text-center">
            <div className="flex text-md justify-center">
              <span className="px-2">
                {daySignScore == "+" ? (
                  <AiOutlineSmile className="h-7 w-7 rounded-full bg-[#fef08a]" />
                ) : daySignScore == " " ? (
                  ""
                ) : (
                  <AiOutlineFrown className="h-7 w-7 rounded-full bg-[#fef08a]" />
                )}
              </span>
              <span className="self-center">
                {weekSignScore}
                {Math.round(weekPercentNewScore * 100)}%
              </span>
            </div>
            <div className="text-md font-bold mt-1">
              Out of{" "}
              <span className="font-bod">
                {symbol?.latest_news_info.last_week_count}
              </span>
            </div>
            <div className="text-lg">
              <span className={weekClassNameNewScore}>{weekStatusScore}</span>
            </div>
          </div>
        </div>

        {/* week */}

        {/* mood */}
        <div className="flex mt-2">
          <div className="bg-fuchsia-200 border-y-2 border-fuchsia-400 w-full mt-1 py-1 text-center">
            <span className="text-fuchsia-700">Mood Time Series</span>
          </div>
        </div>
        <div className="flex justify-center my-2">
          <div className="mx-2">
            <TWChart
              type={"line"}
              data={{
                labels: [
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                ],
                datasets: [
                  {
                    label: "damp 05",
                    data: symbol?.daily_timeseries.damp_5
                      .filter((num) => num !== 0)
                      .slice(-15),
                    backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                    borderColor: ["rgba(255,99,132,1)"],
                    borderWidth: 1,
                  },
                  {
                    label: "damp 10",
                    data: symbol?.daily_timeseries.damp_10
                      .filter((num) => num !== 0)
                      .slice(-15),
                    backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                    borderColor: ["rgba(54, 162, 235, 1)"],
                    borderWidth: 1,
                  },
                  {
                    label: "damp 15",
                    data: symbol?.daily_timeseries.damp_15
                      .filter((num) => num !== 0)
                      .slice(-15),
                    backgroundColor: ["rgba(255, 206, 86, 0.2)"],
                    borderColor: ["rgba(255, 206, 86, 1)"],
                    borderWidth: 1,
                  },
                  {
                    label: "damp 20",
                    data: symbol?.daily_timeseries.damp_20
                      .filter((num) => num !== 0)
                      .slice(-15),
                    backgroundColor: ["rgba(75, 192, 192, 0.2)"],
                    borderColor: ["rgba(75, 192, 192, 1)"],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </div>
        {/* mood */}
      </div>
    </div>
  );
}

export default SymbolDashboard;
