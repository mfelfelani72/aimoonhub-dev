// wrote by mohammad felfelani
import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

// { out modules

import { AiOutlineBarChart } from "react-icons/ai";
import { AiOutlineFrown } from "react-icons/ai";
import { AiOutlineSmile } from "react-icons/ai";

// out modules }

// { app modules

import BarChart from "../core/components/BarChart.jsx";
import ChartRowSentiment from "../core/components/ChartRowSentiment.jsx";
import Button from "../core/components/Button.jsx";
import CardRow from "./components/CardRow.jsx";
import Loader from "../core/components/Loader.jsx";

// app modules }

// { app function

import { getData } from "../../../utils/helpers/getData";
import { goToAuthorDashboard } from "../../../utils/lib/author/goToAuthorDashboard.js";

// app function }

// { const

import { PROVIDER_AUTHORS } from "../../app/constant/EndPoints";
import { LATEST_NEWS_PROVIDER } from "../../app/constant/EndPoints";

import { DEFAULT_PROVIDER_IMAGE } from "./../../app/constant/Defaults.js";
import { DEFAULT_AVATAR_IMAGE } from "./../../app/constant/Defaults.js";

const lodash = require("lodash");
const PAGE_NUMBER = 1;

// const }

function ProviderDashboard() {
  // for initial page

  const location = useLocation();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(location.state.provider);
  const [nav] = useState(location.state.nav);
  const [loadPage, setLoadPage] = useState(true);
  const [loadedAllData, setLoadedAllData] = useState(false);

  // for day

  const [dayPercentNewScore, setDayPercentNewScore] = useState();
  const [daySignScore, setDaySignScore] = useState();
  const [dayStatusScore, setDayStatusScore] = useState();
  const [dayClassNameNewScore, setDayClassNameNewScore] = useState();

  const setDayDetailsProgressBar = () => {
    setDayPercentNewScore(
      Math.max(
        provider?.last_day_sentiment.negative,
        provider?.last_day_sentiment.neutral,
        provider?.last_day_sentiment.positive
      )
    );
    console.log();
    if (
      provider?.last_day_sentiment.negative == 0 &&
      provider?.last_day_sentiment.neutral == 0 &&
      provider?.last_day_sentiment.positive == 0
    ) {
      setDayClassNameNewScore("text-center font-bold ");
      setDayStatusScore("");
      setDaySignScore("");
    } else if (
      Math.max(
        provider?.last_day_sentiment.negative,
        provider?.last_day_sentiment.neutral,
        provider?.last_day_sentiment.positive
      ) === provider?.last_day_sentiment.negative
    ) {
      setDayClassNameNewScore("text-center font-bold text-rose-300");
      setDayStatusScore("Negative");
      setDaySignScore("-");
    } else if (
      Math.max(
        provider?.last_day_sentiment.negative,
        provider?.last_day_sentiment.neutral,
        provider?.last_day_sentiment.positive
      ) === provider?.last_day_sentiment.neutral
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

  // for week

  const [weekPercentNewScore, setWeekPercentNewScore] = useState();
  const [weekSignScore, setWeekSignScore] = useState();
  const [weekStatusScore, setWeekStatusScore] = useState();
  const [weekClassNameNewScore, setWeekClassNameNewScore] = useState();

  const setWeekDetailsProgressBar = () => {
    setWeekPercentNewScore(
      Math.max(
        provider?.last_week_sentiment.negative,
        provider?.last_week_sentiment.neutral,
        provider?.last_week_sentiment.positive
      )
    );
    if (
      provider?.last_week_sentiment.negative == 0 &&
      provider?.last_week_sentiment.neutral == 0 &&
      provider?.last_week_sentiment.positive == 0
    ) {
      setWeekClassNameNewScore("text-center font-bold ");
      setWeekStatusScore("");
      setWeekSignScore("");
    } else if (
      Math.max(
        provider?.last_week_sentiment.negative,
        provider?.last_week_sentiment.neutral,
        provider?.last_week_sentiment.positive
      ) === provider?.last_week_sentiment.negative
    ) {
      setWeekClassNameNewScore("text-center font-bold text-rose-300");
      setWeekStatusScore("Negative");
      setWeekSignScore("-");
    } else if (
      Math.max(
        provider?.last_week_sentiment.negative,
        provider?.last_week_sentiment.neutral,
        provider?.last_week_sentiment.positive
      ) === provider?.last_week_sentiment.neutral
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

  // for news

  const [newsData, setNewsData] = useState([]);
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState();

  const [newsCategory, setNewsCategory] = useState("cryptocurrencies");
  const [newsFrom, setNewsFrom] = useState("1716373411");
  const [newsLlmOnly, setNewsLlmOnly] = useState(false);
  const [newsPageLimit, setNewsPageLimit] = useState(5);
  const [newsPage, setNewsPage] = useState(PAGE_NUMBER);

  const getNews = async (name, newsPage = PAGE_NUMBER) => {
    const parameter = {
      provider: name,
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
          // console.log(newsPage);
          setNewsPage((prev) => prev + 1);
          setLoading(false);
          setLoadedAllData(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSymbols = async () => {
    const parameter = {
      name: location.state.provider.name,
    };

    try {
      getData(PROVIDER_AUTHORS, parameter).then((response) => {
        if (response.data.data) {
          console.log("Fetch data provider authors done.");
          // console.log(response.data.data);
          setSymbols(response.data.data);
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
    getNews(location.state.provider.name, newsPage);
  }, 100);

  //  For initial data when this page is loaded from the footer

  if (provider.name !== location.state.provider.name) {
    setProvider(location.state.provider);
    setLoadPage(true);
    setNewsData([]);
    setNewsPage(PAGE_NUMBER);
    getNews(location.state.provider.name, 1);
    setLoadedAllData(false);
  }

  useEffect(() => {
    if (loadPage) {
      if (newsData.length == 0) {
        getNews(location.state.provider.name);
      }

      if (symbols.length == 0) {
        getSymbols();
      }

      setDayDetailsProgressBar();
      setWeekDetailsProgressBar();
    }
    setLoadPage(false);
  }, [symbols]);
  return (
    <>
      {loadedAllData && (
        <div className="bg-white m-4 rounded-[1rem]">
          {/* header */}
          <h3 className="pt-2 px-2">Provider Dashboard</h3>
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
                    <span className=" pl-1 capitalize">provider dashboard</span>
                  )}
                </span>
              ))}
            </span>{" "}
          </div>
          {/* header */}

          <div className="container mx-auto my-3 mb-3">
            <div className="mt-1 px-3">
              <div className="flex ">
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
                <div className="text-[0.8rem] text-slate-800 pt-1 self-center mx-4">
                  <a href={provider?.url} target="_blank">
                    {provider?.name}
                  </a>
                </div>
              </div>

              <div className="text-[0.8rem] my-4">
                Renowned Authors in{" "}
                <span className="font-bold">{provider?.name}</span>
              </div>

              <div className="basis-3/4">
                <div className="grid grid-cols-5 gap-0">
                  {symbols?.map((row, index) =>
                    index <= 9 ? (
                      <div key={index} className="">
                        <img
                          className="h-12 w-12 rounded-full mx-auto border-2"
                          alt={row?.name}
                          src={
                            row?.local_image
                              ? row?.local_image
                              : row?.picUrl
                              ? row?.picUrl
                              : DEFAULT_AVATAR_IMAGE
                          }
                          onError={(e) => {
                            e.target.src = DEFAULT_AVATAR_IMAGE;
                          }}
                        />
                        <div className="text-[0.7rem] font-bold py-1 text-center">
                          <a
                            className="cursor-pointer hover:text-color-theme"
                            onClick={(event) =>
                              goToAuthorDashboard(
                                navigate,
                                event,
                                row?.name,
                                "cryptocurrencies",
                                nav
                              )
                            }
                          >
                            {row?.name}
                          </a>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                </div>
              </div>
            </div>

            {/* statistics */}

            <div className="flex mt-2">
              <div className="bg-indigo-200 border-y-2 border-indigo-400 w-full mt-1 py-1 text-center">
                <span className="text-indigo-700"><span className="font-bold">{provider?.name}</span>{" "} Statistics</span>
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
                    +{provider?.newsCount.toLocaleString()}
                  </span>{" "}
                  News
                </div>
                <div className="text-sm">
                  <span className="text-sm font-bold">
                    +{provider?.AvgNewsPERday.toLocaleString()}
                  </span>{" "}
                  News Per Day
                </div>
                <div className="text-sm">
                  <span className="text-sm font-bold">
                    +{provider?.AvgNewsPERweek.toLocaleString()}
                  </span>{" "}
                  News Per Week
                </div>
                <div className="text-sm">
                  <span className="text-sm font-bold">
                    +{provider?.AvgNewsPERMonth.toLocaleString()}
                  </span>{" "}
                  News Per Month
                </div>
              </div>
            </div>

            {/* statistics */}

            {dayPercentNewScore !== 0 ? (
              <>
                <div className="flex">
                  <div className="bg-violet-200 border-y-2 border-violet-400 w-full mt-1 py-1 text-center">
                    <span className="text-violet-700">
                      Today <span className="font-bold">{provider?.name}</span>{" "} Sentiment
                    </span>
                  </div>
                </div>

                <div className="flex my-2">
                  <div className="basis-1/2 self-center">
                    <div className="text-center py-2">
                      <span>نمودار سنتیمنت</span>
                    </div>
                    <ChartRowSentiment
                      sentiment={provider?.last_day_sentiment}
                      classNameNewScore={dayClassNameNewScore}
                      signScore={daySignScore}
                      percentNewScore={dayPercentNewScore}
                    />
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
                        {provider?.last_day_count.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-lg">
                      <span className={dayClassNameNewScore}>
                        {dayStatusScore}
                      </span>
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
                      This Week <span className="font-bold">{provider?.name}</span>{" "} Sentiment
                    </span>
                  </div>
                </div>

                <div className="flex my-2">
                  <div className="basis-1/2 self-center">
                    <div className="text-center py-2">
                      <span>نمودار سنتیمنت</span>
                    </div>
                    <ChartRowSentiment
                      sentiment={provider?.last_week_sentiment}
                      classNameNewScore={weekClassNameNewScore}
                      signScore={weekSignScore}
                      percentNewScore={weekPercentNewScore}
                    />
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
                      <span className="font-bod">
                        {provider?.last_week_count.toLocaleString()}
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

            {provider?.symbols.length && provider?.symbols.length !== 0 ? (
              <>
                <div className="flex">
                  <div className="bg-blue-100 border-y-2 border-blue-200 w-full mt-1 py-1 text-center">
                    <span className="text-blue-500">
                    <span className="font-bold">{provider?.name}</span>{" "} News Distribution Per Coins
                    </span>
                  </div>
                </div>
                <div className="text-center py-3">
                  <span>نمودار توزیع به سکه اخبار خبرگزاری</span>
                </div>
                <div className="flex justify-center mx-2">
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
              </>
            ) : (
              ""
            )}
            {newsData.length !== 0 ? (
              <>
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
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProviderDashboard;
