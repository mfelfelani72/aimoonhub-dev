import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { AiOutlineBarChart } from "react-icons/ai";
import { AiOutlineFrown } from "react-icons/ai";
import { AiOutlineSmile } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineFund } from "react-icons/ai";
import { AiOutlineOpenAI } from "react-icons/ai";
import { AiOutlineFieldTime } from "react-icons/ai";

import { DEFAULT_COIN_IMAGE } from "../../app/constant/Defaults.js";
import { DEFAULT_COIN_FUNDAMENTAL_IMAGE } from "../../app/constant/Defaults.js";

import CardRow from "./components/CardRow.jsx";
import Button from "../core/components/Button.jsx";
import Loader from "../core/components/Loader.jsx";
import Loader2 from "../core/components/Loader.jsx";

import MoodTimeSeries from "./components/MoodTimeSeries.jsx";
import NewsTimeSeries from "./components/NewsTimeSeries.jsx";

import { getData } from "../../../utils/helpers/getData";
import { dateHelper } from "../../../utils/helpers/dateHelper.js";

import { LATEST_NEWS } from "../../app/constant/EndPoints";
import { OFFLINE_COIN_ANALYZE } from "../../app/constant/EndPoints";
import { COIN_ANALYZE } from "../../app/constant/EndPoints";
import { COIN_LLM_RESPONSE } from "../../app/constant/EndPoints";

import WordCloud from "react-d3-cloud";

const lodash = require("lodash");

const PAGE_NUMBER = 1;

function SymbolDashboard() {
  const location = useLocation();
  const [symbol] = useState(location.state.symbol);
  const [nav] = useState(location.state.nav);

  const [newsData, setNewsData] = useState([]);
  const [coinAnalyze, setCoinAnalyze] = useState();

  const [loading, setLoading] = useState();
  const [visibleUpdateCoinAnalysis, setVisibleUpdateCoinAnalysis] = useState();
  const [loading2, setLoading2] = useState();
  const [wordCloud, setWordCloud] = useState([]);

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
          setCoinAnalyze(response.data.data);
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
          setLoading2(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetNews = async () => {
    setLoading2(true);
   
    if (newsPage !== 1 || newsPage !== 2) lodashGetNews();
  };

  const lodashGetNews = lodash.debounce(function () {
    getNews();
  }, 100);

  const handleUpdateCoinAnalysis = async () => {
    setLoading(true);
    setVisibleUpdateCoinAnalysis("hidden");

    const parameter = {
      symbol: symbol?.name,
      useNews: true,
      useMarketData: true,
      useIndicator: false,
      timeframe: "4h",
      candleCount: 10,
    };

    try {
      getData(COIN_ANALYZE, parameter).then((response) => {
        if (response.data.return && response.data.data) {
          updateCoinAnalysis(response.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateCoinAnalysis = (task_id) => {
    let intervalId = setInterval(() => {
      loopToGetCoinAnalysis(task_id, intervalId);
    }, 5000);
  };

  const loopToGetCoinAnalysis = (task_id, intervalId) => {
    try {
      // getData(COIN_LLM_RESPONSE, { task_id: "67066df0505340f037e20fea" }).then(
      getData(COIN_LLM_RESPONSE, { task_id: "67064f24505340f037e1f65d" }).then((res) => {
        console.log(res.data.data[0].status);

        if (res.data.data[0].status == "completed") {
          console.log("update coin analysis : " + res.data.data[0].status);
          // console.log(res.data.data);

          setCoinAnalyze(res.data.data[0].result);
          drawWordCloud();

          setLoading(false);
          setVisibleUpdateCoinAnalysis("");

          clearInterval(intervalId);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const drawWordCloud = () => {
    const words = [];
    coinAnalyze.newsTiltes.map((row) => words.push({ word: row.split(" ") }));
    const words2 = [];
    words.map((element) => words2.push(...element.word));
    const data = words2.map((row) => ({
      text: row,
      value: Math.floor(Math.random() * 5000),
    }));
    // console.log(data)

    setWordCloud(data);
  };
  useEffect(() => {
    if (newsData.length == 0) {
      getNews();
    }

    if (!coinAnalyze) {
      getOfflineCoinAnalyze();
    }
    if (coinAnalyze) {
      drawWordCloud();
    }

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
        {coinAnalyze?.response ? (
          <>
            <div className="flex mt-2">
              <div className="bg-amber-200 border-y-2 border-amber-400 w-full mt-1 py-1 text-center">
                <span className="text-amber-700">
                  Aimoon Fundamental Analysis
                </span>
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
                  <p>{coinAnalyze?.response.summaryFa}</p>
                </div>
              </div>
            </div>
            <div className="my-3 mx-2 border border-lg">
              <WordCloud data={wordCloud} />
            </div>
            <div className="relative my-3">
              <img
                src={DEFAULT_COIN_FUNDAMENTAL_IMAGE}
                className="rounded-lg h-[14rem] w-full"
              />
              <div className="absolute top-2 bottom-2 my-auto left-10 right-10 mx-auto m-2 p-2 border rounded-xl bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg h-[10rem] rtl">
                <div className="flex flex-col text-slate-800 h-[7.5rem] justify-between">
                  <div className="flex mx-2">
                    <AiOutlineFund className="h-[2rem] w-[2rem] text-color-theme" />
                    <div className="self-center px-3 ">
                      <span>الگوی چارت : </span>
                      <span>{coinAnalyze?.response.chart_Pattern}</span>
                    </div>
                  </div>
                  <div className="flex mx-2">
                    <AiOutlineOpenAI className="h-[2rem] w-[2rem] text-color-theme" />
                    <div className="self-center px-3">
                      {" "}
                      <span>پیشنهاد آیمون : </span>
                      <span>{coinAnalyze?.response.rec_position}</span>
                    </div>
                  </div>
                  <div className="flex mx-2">
                    <AiOutlineFieldTime className="h-[2rem] w-[2rem] text-color-theme" />
                    <div className="self-center px-3">
                      <span> مدت زمان : </span>
                      <span>{coinAnalyze?.response.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-10 mb-3 mx-2 border rounded-xl">
              <div className="absolute bg-white border rounded-md -top-4 right-[5rem] left-[5rem]">
                <div className="flex-wrap text-center py-1">تحلیل آیمون</div>
              </div>

              <div className="py-2 px-3 mt-6 text-justify text-[0.8rem] rtl">
                {" "}
                {coinAnalyze?.response.analysis}
              </div>
              <div className="py-2 px-3 text-justify text-[0.8rem] text-rose-600 ltr">
                {" "}
                {dateHelper(coinAnalyze?.response.timestamp)}
              </div>
            </div>

            <div className="flex">
              <div className="mx-2">
                <Button
                  className={
                    "bg-color-theme hover:bg-color-theme " +
                    visibleUpdateCoinAnalysis
                  }
                  onClick={() => handleUpdateCoinAnalysis()}
                >
                  Update Analysis
                </Button>
              </div>
              <div className="mx-auto -my-5">{loading && <Loader />}</div>
            </div>
          </>
        ) : (
          ""
        )}

        {/* fundamental */}

        {/* section based */}

        {symbol?.latest_news_info ? (
          <>
            <div className="flex mt-4">
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
        )}

        {/* section based */}

        {/* today */}

        {dayPercentNewScore !== 0 && symbol?.latest_news_info ? (
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
        )}

        {/* today */}

        {/* week */}

        {weekPercentNewScore !== 0 && symbol?.latest_news_info ? (
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
        )}

        {/* week */}

        {symbol?.daily_timeseries ? (
          <>
            <MoodTimeSeries data={symbol?.daily_timeseries} />

            <NewsTimeSeries data={symbol?.daily_timeseries} />
          </>
        ) : (
          ""
        )}

        {/* latest news */}

        {newsData.length !== 0 ? (
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

              {loading2 && <Loader2 />}
            </div>
          </>
        ) : (
          ""
        )}

        {/* latest news */}
      </div>
    </div>
  );
}

export default SymbolDashboard;
