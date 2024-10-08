import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { AiOutlineBarChart } from "react-icons/ai";
import { AiOutlineFrown } from "react-icons/ai";
import { AiOutlineSmile } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";

import { DEFAULT_COIN_IMAGE } from "../../app/constant/Defaults.js";

import CardRow from "./components/CardRow.jsx";
import Button from "../core/components/Button.jsx";
import Loader from "../core/components/Loader.jsx";

import MoodTimeSeries from "./components/MoodTimeSeries.jsx";
import NewsTimeSeries from "./components/NewsTimeSeries.jsx";

import { getData } from "../../../utils/helpers/getData";
import { LATEST_NEWS } from "../../app/constant/EndPoints";
import { OFFLINE_COIN_ANALYZE } from "../../app/constant/EndPoints";

const lodash = require("lodash");

const PAGE_NUMBER = 1;

function SymbolDashboard() {
  const location = useLocation();
  const [symbol] = useState(location.state.symbol);
  const [nav] = useState(location.state.nav);

  const [newsData, setNewsData] = useState([]);
  const [offlineCoinAnalyze, setOfflineCoinAnalyze] = useState();
  const [loading, setLoading] = useState();

  const [newsCategory, setNewsCategory] = useState("cryptocurrencies");
  const [newsSymbols, setNewsSymbols] = useState(symbol?.name);
  const [newsFrom, setNewsFrom] = useState("1716373411");
  // const [newsTo, setNewsTo] = useState("1725633001");
  const [newsPageLimit, setNewsPageLimit] = useState(10);
  const [newsPage, setNewsPage] = useState(PAGE_NUMBER);

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

  const setDayDetailsProgressBar = () => {
    if (symbol?.latest_news_info) {
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
    }
  };

  const setWeekDetailsProgressBar = () => {
    if (symbol?.latest_news_info) {
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
    }
  };

  const getOfflineCoinAnalyze = async () => {
    const parameter = {
      symbol: symbol?.name,
    };

    try {
      getData(OFFLINE_COIN_ANALYZE, parameter).then((response) => {
        if (response.data.return && response.data.data) {
          console.log("Fetch data  offlinecoins done.");
          // console.log(response.data.data)
          setOfflineCoinAnalyze(response.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getNews = async () => {
    const parameter = {
      category: newsCategory,
      symbols: newsSymbols,
      startDate: newsFrom,
      // "endDate": newsTo,
      page: newsPage,
      pageLimit: newsPageLimit,
    };

    try {
      getData(LATEST_NEWS, parameter).then((response) => {
        // console.log(response.data.return);
        if (response.data.return && response.data.data.result) {
          console.log("Fetch data coins done.");
          // console.log(response.data.data.result)
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

    if (!offlineCoinAnalyze) {
      getOfflineCoinAnalyze();
    }
    console.log(offlineCoinAnalyze);

    setDayDetailsProgressBar();
    setWeekDetailsProgressBar();
  }, [newsData]);
  return (
    <div className="bg-white m-4 rounded-[1rem] pb-2">
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
                      : DEFAULT_COIN_IMAGE
                  }
                  onError={(e) => {
                    e.target.src = DEFAULT_COIN_IMAGE;
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
            <div className="text-[0.8rem] text-slate-800 py-1 px-2 border rounded-md">
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

        {/* fundamental */}

        <div className="flex mt-2">
          <div className="bg-amber-200 border-y-2 border-amber-400 w-full mt-1 py-1 text-center">
            <span className="text-amber-700">Aimoon Fundamental Analysis</span>
          </div>
        </div>

        <div className="flex flex-row-reverse mt-4">
          <div className="basis-1/4">
            <div className="h-[3rem] w-[3rem] mx-auto rounded-[25%] border-2 border-color-theme">
              <AiOutlineEdit className="h-[2rem] w-[2rem] m-auto mt-1 text-color-theme" />
            </div>
          </div>
          <div className="basis-3/4 mx-2 pb-1 border rounded-md">
            <div className="text-[0.9rem] text-slate-800 pt-1 px-2 text-right">
              <span className="font-bold">{symbol?.name}</span>
              <span className="pl-1">خلاصه خبرهای</span>
            </div>

            <div className="text-[0.7rem] text-slate-800 pt-1 px-2 text-justify rtl">
              <p>{offlineCoinAnalyze?.response.summaryFa}</p>
            </div>

            <div className="text-slate-800 pt-1 px-2">
              <div className="text-[0.9rem] text-right pb-1">خبرها</div>

              {offlineCoinAnalyze?.newsTiltes.map((row, index) => (
                <div key={index} className="text-[0.8rem] py-1">
                  {" "}
                  - {index + 1 + " "} {row}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* fundamental */}

        {/* section based */}

        {/* {symbol?.latest_news_info ? (
          <>
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
                    +{symbol?.latest_news_info.news_count.toLocaleString()}
                  </span>{" "}
                  News
                </div>
                <div className="text-sm">
                  <span className="text-sm font-bold">
                    +{symbol?.latest_news_info.avg_news_day.toLocaleString()}
                  </span>{" "}
                  News Per Day
                </div>
                <div className="text-sm">
                  <span className="text-sm font-bold">
                    +{symbol.latest_news_info.avg_news_week.toLocaleString()}
                  </span>{" "}
                  News Per Week
                </div>
                <div className="text-sm">
                  <span className="text-sm font-bold">
                    +{symbol.latest_news_info?.avg_news_month.toLocaleString()}
                  </span>{" "}
                  News Per Month
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )} */}

        {/* section based */}

        {/* today */}

        {/* {dayPercentNewScore !== 0 && symbol?.latest_news_info ? (
          <>
            <div className="flex mt-2">
              <div className="bg-cyan-200 border-y-2 border-cyan-400 w-full mt-1 py-1 text-center">
                <span className="text-cyan-700">
                  Today <span className="font-bold">{symbol?.name}</span>{" "}
                  Sentiment
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
                    {symbol?.latest_news_info.last_day_count.toLocaleString()}
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
        )} */}

        {/* today */}

        {/* week */}

        {/* {weekPercentNewScore !== 0 && symbol?.latest_news_info ? (
          <>
            <div className="flex mt-2">
              <div className="bg-violet-200 border-y-2 border-violet-400 w-full mt-1 py-1 text-center">
                <span className="text-violet-700">
                  This Week <span className="font-bold">{symbol?.name}</span>{" "}
                  Sentiment
                </span>
              </div>
            </div>

            <div className="flex my-2">
              <div className="basis-1/2 self-center">
                <div className="flex w-ful justify-center mx-2 border-2">
                  <div
                    style={{
                      width: `${
                        symbol?.latest_news_info.last_Week_sentiment.positive *
                        100
                      }%`,
                    }}
                    className="bg-lime-300 h-6"
                  ></div>
                  <div
                    style={{
                      width: `${
                        symbol?.latest_news_info.last_Week_sentiment.negative *
                        100
                      }%`,
                    }}
                    className="bg-rose-300"
                  ></div>
                  <div
                    style={{
                      width: `${
                        symbol?.latest_news_info.last_Week_sentiment.neutral *
                        100
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
                    {weekSignScore == "+" ? (
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
                    {symbol?.latest_news_info.last_week_count.toLocaleString()}
                  </span>
                </div>
                <div className="text-lg">
                  <span className={weekClassNameNewScore}>
                    {weekStatusScore}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )} */}

        {/* week */}

        {/* {symbol?.daily_timeseries ? (
          <>
            <MoodTimeSeries data={symbol?.daily_timeseries} />

            <NewsTimeSeries data={symbol?.daily_timeseries} />
          </>
        ) : (
          ""
        )} */}

        {/* latest news */}

        {/* {newsData.length !== 0 ? (
          <>
            <div className="flex">
              <div className="bg-orange-100 border-y-2 border-orange-200 w-full mt-1 py-1 text-center">
                <span className="text-orange-500">
                  Latest News from{" "}
                  <span className="font-bold">{symbol?.name}</span>
                </span>
              </div>
            </div>

            <div className="my-2">
              {newsData.map((row, index) => (
                <CardRow row={row} key={index} nav={nav} />
              ))}
              <div className="ltr:text-right rtl:text-left">
                <Button
                  onClick={() => handleGetNews()}
                  className="m-3 bg-color-theme hover:bg-color-theme dark:bg-D-color-theme dark:hover:bg-D-color-theme"
                >
                  More
                </Button>
              </div>

              {loading && <Loader />}
            </div>
          </>
        ) : (
          ""
        )} */}

        {/* latest news */}
      </div>
    </div>
  );
}

export default SymbolDashboard;
