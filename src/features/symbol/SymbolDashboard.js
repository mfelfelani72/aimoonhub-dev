import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Toast } from "flowbite-react";
import { HiFire } from "react-icons/hi";

import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineFund } from "react-icons/ai";
import { AiOutlineOpenAI } from "react-icons/ai";
import { AiOutlineFieldTime } from "react-icons/ai";

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

import Info from "./components/Info.jsx";
import Based from "./components/Based.jsx";
import TodaySentiment from "./components/TodaySentiment.jsx";
import WeekSentiment from "./components/WeekSentiment.jsx";

const lodash = require("lodash");

const PAGE_NUMBER = 1;

function SymbolDashboard() {
  const location = useLocation();
  const [symbol, setSymbol] = useState(location.state.symbol);
  const [nav] = useState(location.state.nav);

  const [loadPage, setLoadPage] = useState(true);

  const [newsData, setNewsData] = useState(["free"]);
  const [coinAnalyze, setCoinAnalyze] = useState();

  const [loading, setLoading] = useState();
  const [visibleUpdateCoinAnalysis, setVisibleUpdateCoinAnalysis] = useState();
  const [statusMessageUpdateCoinAnalysis, setStatusMessageUpdateCoinAnalysis] =
    useState();
  const [messageUpdateCoinAnalysis, setMessageUpdateCoinAnalysis] = useState();
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
  const [dayStatusScore, setDayStatusScore] = useState();
  const [dayClassNameNewScore, setDayClassNameNewScore] = useState();
  const [daySignScore, setDaySignScore] = useState();

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
          symbol?.latest_news_info.last_week_sentiment.negative,
          symbol?.latest_news_info.last_week_sentiment.neutral,
          symbol?.latest_news_info.last_week_sentiment.positive
        )
      );
      if (
        symbol?.latest_news_info.last_week_sentiment.negative == 0 &&
        symbol?.latest_news_info.last_week_sentiment.neutral == 0 &&
        symbol?.latest_news_info.last_week_sentiment.positive == 0
      ) {
        setWeekClassNameNewScore("text-center font-bold ");
        setWeekStatusScore("");
        setWeekSignScore("");
      } else if (
        Math.max(
          symbol?.latest_news_info.last_week_sentiment.negative,
          symbol?.latest_news_info.last_week_sentiment.neutral,
          symbol?.latest_news_info.last_week_sentiment.positive
        ) === symbol?.latest_news_info.last_week_sentiment.negative
      ) {
        setWeekClassNameNewScore("text-center font-bold text-rose-300");
        setWeekStatusScore("Negative");
        setWeekSignScore("-");
      } else if (
        Math.max(
          symbol?.latest_news_info.last_week_sentiment.negative,
          symbol?.latest_news_info.last_week_sentiment.neutral,
          symbol?.latest_news_info.last_week_sentiment.positive
        ) === symbol?.latest_news_info.last_week_sentiment.neutral
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

    setTimeout(function () {
      stopLoopToGetCoinAnalysis(intervalId);
    }, 20000);
  };

  const loopToGetCoinAnalysis = (task_id, intervalId) => {
    try {
      // getData(COIN_LLM_RESPONSE, { task_id: "67064f24505340f037e1f65d" }).then(
      getData(COIN_LLM_RESPONSE, { task_id: task_id }).then((res) => {
        if (res.data.data) {
          console.log(res.data.data[0].status);

          if (res.data.data[0].status == "completed") {
            console.log("update coin analysis : " + res.data.data[0].status);
            // console.log(res.data.data);

            setCoinAnalyze(res.data.data[0].result);

            setLoading(false);
            setVisibleUpdateCoinAnalysis("");

            setStatusMessageUpdateCoinAnalysis(true);
            setMessageUpdateCoinAnalysis("Coin Analysis Updated.");
            clearInterval(intervalId);
            document
              .getElementById("root")
              .scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const stopLoopToGetCoinAnalysis = (intervalId) => {
    setLoading(false);
    setVisibleUpdateCoinAnalysis("");
    setStatusMessageUpdateCoinAnalysis(true);
    setMessageUpdateCoinAnalysis("fail to update analysis");
    clearInterval(intervalId);
    document.getElementById("root").scrollIntoView({ behavior: "smooth" });
  };

  if (symbol.name !== location.state.symbol.name) {
    setSymbol(location.state.symbol);
    setLoadPage(true);
    setNewsData([]);
    setCoinAnalyze()
    getNews();
  }

  useEffect(() => {
    if (loadPage) {
      // console.log(newsData)
      if (newsData[0] === "free") {
        getNews();
        newsData.shift();
      }

      if (!coinAnalyze || loadPage) {
        getOfflineCoinAnalyze();
      }

      setDayDetailsProgressBar();
      setWeekDetailsProgressBar();
    }

    setLoadPage(false);
  });
  return (
    <div className="relative bg-white m-4 rounded-[1rem] pb-2">
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
        <Info symbol={symbol} />

        {/* fundamental */}

        {coinAnalyze?.response && (
          <>
            <div className="flex mt-2">
              <div className="bg-amber-200 border-y-2 border-amber-400 w-full mt-1 py-1 text-center">
                <span className="text-amber-700">
                  Aimoon Fundamental Analysis
                </span>
              </div>
            </div>

            {coinAnalyze?.word_frequencies &&
            coinAnalyze?.word_frequencies.length !== 0 ? (
              <>
                <div className="text-center m-4 rtl">
                  <span>نمودار ابر کلمات جفت ارز</span>
                  <span className="px-2 text-[0.8rem] font-bold">
                    {symbol?.name}
                  </span>
                </div>
                <div className="relative my-3 mx-2">
                  <WordCloud data={coinAnalyze?.word_frequencies} />

                  <div className="absolute bottom-0 pt-2 flex flex-row-reverse bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg  border-t-2">
                    <div className="basis-1/6 self-start">
                      <div className=" h-[3rem] w-[3rem] mx-auto rounded-[25%] border-2 border-color-theme">
                        <AiOutlineEdit className="h-[2rem] w-[2rem] m-auto mt-1 text-color-theme" />
                      </div>
                    </div>
                    <div className="basis-5/6">
                      <div className="text-[0.9rem] text-slate-800 pt-1 px-2 text-right">
                        <span className="font-bold">{symbol?.name}</span>
                        <span className="pl-1">خلاصه خبرهای</span>
                      </div>

                      <div className="text-[0.7rem] text-slate-800 pt-1 px-2 text-justify rtl">
                        <p>{coinAnalyze?.response.summaryFa}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bottom-0 pt-2 flex flex-row-reverse bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg  border-t-2">
                <div className="basis-1/6 self-start">
                  <div className=" h-[3rem] w-[3rem] mx-auto rounded-[25%] border-2 border-color-theme">
                    <AiOutlineEdit className="h-[2rem] w-[2rem] m-auto mt-1 text-color-theme" />
                  </div>
                </div>
                <div className="basis-5/6">
                  <div className="text-[0.9rem] text-slate-800 pt-1 px-2 text-right">
                    <span className="font-bold">{symbol?.name}</span>
                    <span className="pl-1">خلاصه خبرهای</span>
                  </div>

                  <div className="text-[0.7rem] text-slate-800 pt-1 px-2 text-justify rtl">
                    <p>{coinAnalyze?.response.summaryFa}</p>
                  </div>
                </div>
              </div>
            )}

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
                {dateHelper(coinAnalyze?.response.timestamp, "difference")}
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
            {statusMessageUpdateCoinAnalysis && (
              <div
                className={"flex absolute top-0 " + messageUpdateCoinAnalysis}
              >
                <Toast>
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                    <HiFire className="h-5 w-5" />
                  </div>
                  <div className="ml-3 text-sm font-normal">
                    {messageUpdateCoinAnalysis}
                  </div>
                  <Toast.Toggle />
                </Toast>
              </div>
            )}
          </>
        )}

        {/* fundamental */}

        <Based symbol={symbol} />

        <TodaySentiment
          symbol={symbol}
          dayClassNameNewScore={dayClassNameNewScore}
          daySignScore={daySignScore}
          dayPercentNewScore={dayPercentNewScore}
          dayStatusScore={dayStatusScore}
        />

        <WeekSentiment
          symbol={symbol}
          weekClassNameNewScore={weekClassNameNewScore}
          weekSignScore={weekSignScore}
          weekPercentNewScore={weekPercentNewScore}
          weekStatusScore={weekStatusScore}
        />

        {symbol?.daily_timeseries && (
          <>
            <MoodTimeSeries data={symbol?.daily_timeseries} />

            <NewsTimeSeries data={symbol?.daily_timeseries} />
          </>
        )}

        {/* latest news */}

        {newsData.length !== 0 && (
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
        )}

        {/* latest news */}
      </div>
    </div>
  );
}

export default SymbolDashboard;
