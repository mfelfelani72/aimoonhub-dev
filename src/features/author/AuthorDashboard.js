import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import avatar from "../../../assets/images/avatar.png";

import { AiOutlineBarChart } from "react-icons/ai";
import { AiOutlineFrown } from "react-icons/ai";
import { AiOutlineSmile } from "react-icons/ai";

import BarChart from "../core/components/BarChart.jsx";
import Button from "../core/components/Button.jsx";
import CardRow from "./components/CardRow.jsx";
import Loader from "../core/components/Loader.jsx";

import { getData } from "../../../utils/helpers/getData";
import { LATEST_NEWS_AUTHOR } from "../../app/constant/EndPoints";

const lodash = require("lodash");
const PAGE_NUMBER = 1;

function AuthorDashboard() {
  const location = useLocation();
  const [author] = useState(location.state.author);
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

  const [newsAuthor, setNewsAuthor] = useState(author?.name);
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
        author?.lastDay_sentiment.negative,
        author?.lastDay_sentiment.neutral,
        author?.lastDay_sentiment.positive
      )
    );
    if (
      author?.lastDay_sentiment.negative == 0 &&
      author?.lastDay_sentiment.neutral == 0 &&
      author?.lastDay_sentiment.positive == 0
    ) {
      setDayClassNameNewScore("text-center font-bold ");
      setDayStatusScore("");
      setDaySignScore("");
    } else if (
      Math.max(
        author?.lastDay_sentiment.negative,
        author?.lastDay_sentiment.neutral,
        author?.lastDay_sentiment.positive
      ) === author?.lastDay_sentiment.negative
    ) {
      setDayClassNameNewScore("text-center font-bold text-rose-300");
      setDayStatusScore("Negative");
      setDaySignScore("-");
    } else if (
      Math.max(
        author?.lastDay_sentiment.negative,
        author?.lastDay_sentiment.neutral,
        author?.lastDay_sentiment.positive
      ) === author?.lastDay_sentiment.neutral
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
        author?.lastWeek_sentiment.negative,
        author?.lastWeek_sentiment.neutral,
        author?.lastWeek_sentiment.positive
      )
    );
    if (
      author?.lastWeek_sentiment.negative == 0 &&
      author?.lastWeek_sentiment.neutral == 0 &&
      author?.lastWeek_sentiment.positive == 0
    ) {
      setWeekClassNameNewScore("text-center font-bold ");
      setWeekStatusScore("");
      setWeekSignScore("");
    } else if (
      Math.max(
        author?.lastWeek_sentiment.negative,
        author?.lastWeek_sentiment.neutral,
        author?.lastWeek_sentiment.positive
      ) === author?.lastWeek_sentiment.negative
    ) {
      setWeekClassNameNewScore("text-center font-bold text-rose-300");
      setWeekStatusScore("Negative");
      setWeekSignScore("-");
    } else if (
      Math.max(
        author?.lastWeek_sentiment.negative,
        author?.lastWeek_sentiment.neutral,
        author?.lastWeek_sentiment.positive
      ) === author?.lastWeek_sentiment.neutral
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
      author: newsAuthor,
      category: newsCategory,
      startDate: newsFrom,
      llmOnly: newsLlmOnly,
      page: newsPage,
      pageLimit: newsPageLimit,
    };

    try {
      getData(LATEST_NEWS_AUTHOR, parameter).then((response) => {
        if (response.data.data.result) {
          console.log("Fetch data author news done.");
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
      <h3 className="pt-2 px-2">Author Dashboard</h3>
      <div className="text-[0.7rem] text-slate-500 font-bold px-2">
        <span>
          <NavLink to="/">Home</NavLink>
        </span>{" "}
        <span className="pl-2">{" > "}</span>
        <span className="pl-2">
          <NavLink to="/authors-list">Authors List</NavLink>
        </span>
        <span className="pl-2"> {" > "}</span>
        <span className="pl-2">Author Dashboard</span>
      </div>
      {/* header */}

      <div className="container mx-auto my-3 mb-3">
        <div className="flex mt-1">
          <div className="basis-1/4">
            <div className="">
              <a href={author?.biographyUrl} target="_blank">
                <img
                  className="h-[4rem] w-[4rem] rounded-full mx-auto border-2 border-color-theme"
                  src={author?.picUrl ? author?.picUrl : avatar}
                />
              </a>
            </div>
            <div className="text-[0.8rem] text-slate-800 pt-1 text-center">
              <a href={author?.biographyUrl} target="_blank">
                {author?.name}
              </a>
            </div>
          </div>
          <div className="basis-3/4 mx-2">
            <div className="text-[0.8rem] text-slate-800 pt-1 px-2 border rounded-md">
              <div className="font-bold">
                <span>Journalist at</span> {author?.worked}
              </div>
              <span className="text-[0.8rem] font-bold">Biography</span>
              <a href={author?.biographyUrl} target="_blank">
                <div className="text-[0.7rem] text-justify">
                  {author?.biography}
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="flex mt-2">
          <div className="bg-indigo-200 border-y-2 border-indigo-400 w-full mt-1 py-1 text-center">
            <span className="text-indigo-700">Author Statistics</span>
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
              <span className="text-sm font-bold">+{author?.newsCount}</span>{" "}
              News
            </div>
            <div className="text-sm">
              <span className="text-sm font-bold">
                +{author?.AvgNewsPERday}
              </span>{" "}
              News Per Day
            </div>
            <div className="text-sm">
              <span className="text-sm font-bold">
                +{author?.AvgNewsPERweek}
              </span>{" "}
              News Per Week
            </div>
            <div className="text-sm">
              <span className="text-sm font-bold">
                +{author?.AvgNewsPERMonth}
              </span>{" "}
              News Per Month
            </div>
          </div>
        </div>
        {dayPercentNewScore !== 0 ? (
          <>
            <div className="flex">
              <div className="bg-violet-200 border-y-2 border-violet-400 w-full mt-1 py-1 text-center">
                <span className="text-violet-700">Today Author Sentiment</span>
              </div>
            </div>

            <div className="flex my-2">
              <div className="basis-1/2 self-center">
                <div className="flex w-ful justify-center mx-2 border-2">
                  <div
                    style={{
                      width: `${author?.lastDay_sentiment.positive * 100}%`,
                    }}
                    className="bg-lime-300 h-6"
                  ></div>
                  <div
                    style={{
                      width: `${author?.lastDay_sentiment.negative * 100}%`,
                    }}
                    className="bg-rose-300"
                  ></div>
                  <div
                    style={{
                      width: `${author?.lastDay_sentiment.neutral * 100}%`,
                    }}
                    className="bg-slate-300"
                  ></div>
                </div>
                <div className={dayClassNameNewScore}>
                  {daySignScore}
                  {dayPercentNewScore * 100}%
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
                    {dayPercentNewScore * 100}%
                  </span>
                </div>
                <div className="text-md font-bold mt-1">
                  Out of{" "}
                  <span className="font-bod">{author?.last_day_count}</span>
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
                  This Week Author Sentiment
                </span>
              </div>
            </div>

            <div className="flex my-2">
              <div className="basis-1/2 self-center">
                <div className="flex w-ful justify-center mx-2 border-2">
                  <div
                    style={{
                      width: `${author?.lastWeek_sentiment.positive * 100}%`,
                    }}
                    className="bg-lime-300 h-6"
                  ></div>
                  <div
                    style={{
                      width: `${author?.lastWeek_sentiment.negative * 100}%`,
                    }}
                    className="bg-rose-300"
                  ></div>
                  <div
                    style={{
                      width: `${author?.lastWeek_sentiment.neutral * 100}%`,
                    }}
                    className="bg-slate-300"
                  ></div>
                </div>
                <div className={weekClassNameNewScore}>
                  {weekSignScore}
                  {weekPercentNewScore * 100}%
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
                    {weekPercentNewScore * 100}%
                  </span>
                </div>
                <div className="text-md font-bold mt-1">
                  Out of{" "}
                  <span className="font-bod">{author?.last_week_count}</span>
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

        {author?.symbols.length !== 0 ? (
          <>
            <div className="flex">
              <div className="bg-blue-100 border-y-2 border-blue-200 w-full mt-1 py-1 text-center">
                <span className="text-blue-500">
                  Author News Distribution Per Coins
                </span>
              </div>
            </div>

            <div className="flex justify-center my-2">
              <div className="mx-2">
                <BarChart
                  labels={lodash
                    .chunk(author?.symbols, 10)[0]
                    .map((node) => [node.coin])}
                  data={lodash
                    .chunk(author?.symbols, 10)[0]
                    .map((node) => [node.news_count])}
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
              Latest News from <span className="font-bold">{author?.name}</span>
            </span>
          </div>
        </div>

        <div className="my-2">
          {newsData.map((row, index) => (
            <CardRow row={row} key={index} />
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

export default AuthorDashboard;
