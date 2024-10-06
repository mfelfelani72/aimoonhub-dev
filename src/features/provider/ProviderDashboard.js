import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { AiOutlineBarChart } from "react-icons/ai";
import { AiOutlineFrown } from "react-icons/ai";
import { AiOutlineSmile } from "react-icons/ai";

import BarChart from "../core/components/BarChart.jsx";
import Button from "../core/components/Button.jsx";
import CardRow from "./components/CardRow.jsx";
import Loader from "../core/components/Loader.jsx";

import { getData } from "../../../utils/helpers/getData";
import { LATEST_NEWS_PROVIDER } from "../../app/constant/EndPoints";
import { DEFAULT_PROVIDER_IMAGE } from "./../../app/constant/Defaults.js";

const lodash = require("lodash");
const PAGE_NUMBER = 1;

function ProviderDashboard() {
  const location = useLocation();
  const [provider] = useState(location.state.provider);
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

  const [newsProvider, setNewsProvider] = useState(provider?.name);
  const [newsCategory, setNewsCategory] = useState("cryptocurrencies");
  const [newsFrom, setNewsFrom] = useState("1716373411");
  const [newsLlmOnly, setNewsLlmOnly] = useState(false);
  const [newsPageLimit, setNewsPageLimit] = useState(5);
  const [newsPage, setNewsPage] = useState(PAGE_NUMBER);

  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState();

  const setDayDetailsProgressBar = () => {
    setDayPercentNewScore(
      Math.max(
        provider?.lastDay_sentiment.negative,
        provider?.lastDay_sentiment.neutral,
        provider?.lastDay_sentiment.positive
      )
    );
    console.log();
    if (
      provider?.lastDay_sentiment.negative == 0 &&
      provider?.lastDay_sentiment.neutral == 0 &&
      provider?.lastDay_sentiment.positive == 0
    ) {
      setDayClassNameNewScore("text-center font-bold ");
      setDayStatusScore("");
      setDaySignScore("");
    } else if (
      Math.max(
        provider?.lastDay_sentiment.negative,
        provider?.lastDay_sentiment.neutral,
        provider?.lastDay_sentiment.positive
      ) === provider?.lastDay_sentiment.negative
    ) {
      setDayClassNameNewScore("text-center font-bold text-rose-300");
      setDayStatusScore("Negative");
      setDaySignScore("-");
    } else if (
      Math.max(
        provider?.lastDay_sentiment.negative,
        provider?.lastDay_sentiment.neutral,
        provider?.lastDay_sentiment.positive
      ) === provider?.lastDay_sentiment.neutral
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
        provider?.lastWeek_sentiment.negative,
        provider?.lastWeek_sentiment.neutral,
        provider?.lastWeek_sentiment.positive
      )
    );
    if (
      provider?.lastWeek_sentiment.negative == 0 &&
      provider?.lastWeek_sentiment.neutral == 0 &&
      provider?.lastWeek_sentiment.positive == 0
    ) {
      setWeekClassNameNewScore("text-center font-bold ");
      setWeekStatusScore("");
      setWeekSignScore("");
    } else if (
      Math.max(
        provider?.lastWeek_sentiment.negative,
        provider?.lastWeek_sentiment.neutral,
        provider?.lastWeek_sentiment.positive
      ) === provider?.lastWeek_sentiment.negative
    ) {
      setWeekClassNameNewScore("text-center font-bold text-rose-300");
      setWeekStatusScore("Negative");
      setWeekSignScore("-");
    } else if (
      Math.max(
        provider?.lastWeek_sentiment.negative,
        provider?.lastWeek_sentiment.neutral,
        provider?.lastWeek_sentiment.positive
      ) === provider?.lastWeek_sentiment.neutral
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
      provider: newsProvider,
      category: newsCategory,
      startDate: newsFrom,
      llmOnly: newsLlmOnly,
      page: newsPage,
      pageLimit: newsPageLimit,
    };

    try {
      getData(LATEST_NEWS_PROVIDER, parameter).then((response) => {
        if (response.data.data.result) {
          console.log("Fetch data provider news done.");
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
      <h3 className="pt-2 px-2">Provider Dashboard</h3>
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
                <span className=" pl-1 capitalize">provider dashboard</span>
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
              <a href={provider?.url} target="_blank">
                <img
                  className="h-[4rem] w-[4rem] rounded-full mx-auto border-2 border-color-theme"
                  alt={provider?.name}
                  src={
                    provider?.local_image
                      ? provider?.local_image
                      : provider?.logoUrl
                      ? provider?.logoUrl
                      : DEFAULT_PROVIDER_IMAGE
                  }
                  onError={(e) => {
                    e.target.src = DEFAULT_PROVIDER_IMAGE;
                  }}
                />
              </a>
            </div>
            <div className="text-[0.8rem] text-slate-800 pt-1 text-center">
              <a href={provider?.biographyUrl} target="_blank">
                {provider?.name}
              </a>
            </div>
          </div>
          <div className="basis-3/4 mx-2">
            <div className="text-[0.8rem] text-slate-800 pt-1 px-2 border rounded-md">
              <div className="font-bold">
                <span>Journalist at</span> {provider?.worked}
              </div>
              <span className="text-[0.8rem] font-bold">Biography</span>
              <a href={provider?.biographyUrl} target="_blank">
                <div className="text-[0.7rem] text-justify">
                  {provider?.biography}
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="flex mt-2">
          <div className="bg-indigo-200 border-y-2 border-indigo-400 w-full mt-1 py-1 text-center">
            <span className="text-indigo-700">Provider Statistics</span>
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
              <span className="text-sm font-bold">+{provider?.newsCount}</span>{" "}
              News
            </div>
            <div className="text-sm">
              <span className="text-sm font-bold">
                +{provider?.AvgNewsPERday}
              </span>{" "}
              News Per Day
            </div>
            <div className="text-sm">
              <span className="text-sm font-bold">
                +{provider?.AvgNewsPERweek}
              </span>{" "}
              News Per Week
            </div>
            <div className="text-sm">
              <span className="text-sm font-bold">
                +{provider?.AvgNewsPERMonth}
              </span>{" "}
              News Per Month
            </div>
          </div>
        </div>
        {dayPercentNewScore !== 0 ? (
          <>
            <div className="flex">
              <div className="bg-violet-200 border-y-2 border-violet-400 w-full mt-1 py-1 text-center">
                <span className="text-violet-700">
                  Today Provider Sentiment
                </span>
              </div>
            </div>

            <div className="flex my-2">
              <div className="basis-1/2 self-center">
                <div className="flex w-ful justify-center mx-2 border-2">
                  <div
                    style={{
                      width: `${provider?.lastDay_sentiment.positive * 100}%`,
                    }}
                    className="bg-lime-300 h-6"
                  ></div>
                  <div
                    style={{
                      width: `${provider?.lastDay_sentiment.negative * 100}%`,
                    }}
                    className="bg-rose-300"
                  ></div>
                  <div
                    style={{
                      width: `${provider?.lastDay_sentiment.neutral * 100}%`,
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
                  <span className="font-bod">{provider?.last_day_count}</span>
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

        {weekPercentNewScore !== 0 ? (
          <>
            <div className="flex">
              <div className="bg-violet-100 border-y-2 border-violet-200 w-full mt-1 py-1 text-center">
                <span className="text-violet-500">
                  This Week Provider Sentiment
                </span>
              </div>
            </div>

            <div className="flex my-2">
              <div className="basis-1/2 self-center">
                <div className="flex w-ful justify-center mx-2 border-2">
                  <div
                    style={{
                      width: `${provider?.lastWeek_sentiment.positive * 100}%`,
                    }}
                    className="bg-lime-300 h-6"
                  ></div>
                  <div
                    style={{
                      width: `${provider?.lastWeek_sentiment.negative * 100}%`,
                    }}
                    className="bg-rose-300"
                  ></div>
                  <div
                    style={{
                      width: `${provider?.lastWeek_sentiment.neutral * 100}%`,
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
                    ) : weekSignScore == " " ? (
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
                  <span className="font-bod">{provider?.last_week_count}</span>
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

        {provider?.symbols.length && provider?.symbols.length !== 0 ? (
          <>
            <div className="flex">
              <div className="bg-blue-100 border-y-2 border-blue-200 w-full mt-1 py-1 text-center">
                <span className="text-blue-500">
                  Provider News Distribution Per Coins
                </span>
              </div>
            </div>

            <div className="flex justify-center my-2">
              <div className="mx-2">
                <BarChart
                  labels={lodash
                    .chunk(provider?.symbols, 10)[0]
                    .map((node) => node.coin)}
                  data={lodash
                    .chunk(provider?.symbols, 10)[0]
                    .map((node) => node.news_count)}
                  label={"News Count"}
                ></BarChart>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <div className="flex">
          <div className="bg-orange-100 border-y-2 border-orange-200 w-full mt-1 py-1 text-center">
            <span className="text-orange-500">
              Latest News from{" "}
              <span className="font-bold">{provider?.name}</span>
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
      </div>
    </div>
  );
}

export default ProviderDashboard;
