import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import avatar from "../../../assets/images/avatar.png";

import { AiOutlineBarChart } from "react-icons/ai";
import { AiOutlineFrown } from "react-icons/ai";
import { AiOutlineSmile } from "react-icons/ai";

import BarChart from "../core/components/BarChart.jsx";
import ChartDoughnut from "../core/components/ChartDoughnut.jsx";

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

 
  const setDayDetailsProgressBar = () => {
    setDayPercentNewScore(
      Math.max(
        author?.lastDay_sentiment.negative,
        author?.lastDay_sentiment.neutral,
        author?.lastDay_sentiment.positive
      )
    );

    if (
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

  console.log(author);
  let defaultImage =
    "https://cdn3d.iconscout.com/3d/premium/thumb/bitcoin-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--logo-btc-gold-symbol-sign-crpto-glossy-crypto-pack-science-technology-illustrations-3591010.png?f=webp";

  useEffect(() => {
    setDayDetailsProgressBar();
    setWeekDetailsProgressBar();
  }, []);

  return (
    <div className="bg-white m-4 rounded-[1rem]">
      {/* header */}
      <h3 className="pt-2 px-2">AuthorDashboard</h3>
      <div className="text-[0.7rem] text-slate-500 font-bold px-2">
        <span>
          <NavLink to="/">Home</NavLink>
        </span>{" "}
        <span className="pl-2">{" > "}</span>
        <span className="pl-2">
          <NavLink to="/authors-list">Authors List</NavLink>
        </span>
      </div>
      {/* header */}

      <div className="container mx-auto my-3 mb-3">
        {/* <div className="flex mt-1">
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
              <a href="{author?.biographyUrl}" target="_blank">
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
              <a href="{author?.biographyUrl}" target="_blank">
                <div className="text-[0.7rem] text-justify">
                  {author?.biography}
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="bg-lime-200 border-y-2 border-lime-400 w-full mt-1 py-1 text-center">
            <span className="text-lime-700">Author Statistics</span>
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
        </div> */}

        <div className="flex">
          <div className="bg-rose-200 border-y-2 border-rose-400 w-full mt-1 py-1 text-center">
            <span className="text-rose-700">Today Author Statistics</span>
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
            <div className="text-md font-bold mt-1">Out of 7 what??</div>
            <div className="text-lg">
              <span className={dayClassNameNewScore}>{dayStatusScore}</span>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="bg-rose-100 border-y-2 border-rose-200 w-full mt-1 py-1 text-center">
            <span className="text-rose-500">This week Author Statistics</span>
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
            <div className="text-md font-bold mt-1">Out of 7 what??</div>
            <div className="text-lg">
              <span className={weekClassNameNewScore}>{weekStatusScore}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorDashboard;
