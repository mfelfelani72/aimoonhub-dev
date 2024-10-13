import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

import { getData } from "../../../utils/helpers/getData";
import { LATEST_NEWS } from "../../app/constant/EndPoints";

import { DEFAULT_NEW_IMAGE } from "../../app/constant/Defaults.js";

import DetailsBox from "./components/DetailsBox.jsx";
import Button from "../core/components/Button.jsx";

const LatestAimoonNew = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const nav = [{ title: "home", address: "/" }, { title: "end" }];

  const [newsCategory, setNewsCategory] = useState("cryptocurrencies");
  const [newsSymbols, setNewsSymbols] = useState("all");
  const [newsFrom, setNewsFrom] = useState("1716373411");
  const [newEndDate, setNewEndDate] = useState("");

  const [newsData, setNewsData] = useState([]);
  const [firstNew, setFirstNew] = useState();

  const [lang, setLang] = useState(true);

  const getNews = async () => {
    const parameter = {
      category: newsCategory,
      symbols: newsSymbols,
      startDate: newsFrom,
      // "endDate": newsTo,
      page: 1,
      pageLimit: 5,
      llmOnly: true,
    };

    try {
      getData(LATEST_NEWS, parameter).then((response) => {
        // console.log(response.data.return);
        if (response.data.return && response.data.data.result) {
          console.log("Fetch dataLlm done.");
          // console.log(response.data.data.result);
          setNewEndDate(
            response.data.data.result[response.data.data.result.length - 1]
              ?.pubDate
          );

          setFirstNew(response.data.data.result[0]);
          response.data.data.result.shift();
          setNewsData(response.data.data.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLang = (event) => {
    if (event.detail == 2) setLang((prev) => !prev);
  };

  useEffect(() => {
    if (newsData.length == 0) getNews();
    // console.log(newEndDate)
  }, [newsData, firstNew, newEndDate]);

  return (
    // <div className="container mx-auto w-[30rem]">
      <div className="bg-white mx-4 rounded-[1rem]">
        <h2 className="p-2">{t("aimoon_news_analysis")}</h2>
        {/* summary */}

        <div className="relative">
          <div className="h-[10rem]">
            <a href={firstNew?.link} target="_blank">
              <img
                className="h-full w-full"
                alt={firstNew?.title}
                src={
                  firstNew?.local_image
                    ? firstNew?.local_image
                    : firstNew?.thImage
                    ? firstNew?.thImage
                    : DEFAULT_NEW_IMAGE
                }
                onError={(e) => {
                  e.target.src = DEFAULT_NEW_IMAGE;
                }}
              />
            </a>
          </div>
          <div className="absolute top-0 left-0">
            <div className="absolute top-0 left-0 m-5 border rounded-xl bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg h-[6.7rem] w-[16rem] text-[0.8rem] p-2 text-justify text-slate-800 mx-2">
              <a
                onClick={(event) => toggleLang(event)}
                className="cursor-pointer"
              >
                {lang ? (
                  <div className="rtl">{firstNew?.summaryFa}</div>
                ) : (
                  firstNew?.summaryEn
                )}
              </a>
            </div>
          </div>
        </div>

        {/* summary */}

        {/* details box */}

        {firstNew && (
          <DetailsBox data={firstNew} lineChartWidth="w-[4rem]" nav={nav} />
        )}

        {/* details box */}

        <div className="p-4 border-t-2 pb-4">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            style={{
              "--swiper-pagination-color": "#e57c43",
              "--swiper-pagination-bullet-inactive-color": "#999999",
              "--swiper-pagination-bullet-inactive-opacity": "1",
              "--swiper-pagination-bullet-size": "10px",
              "--swiper-pagination-bullet-horizontal-gap": "5px",
            }}
            modules={[Pagination]}
          >
            {newsData.map((row, index) => (
              <SwiperSlide row={row} key={index}>
                <div className="relative h-[19rem] border rounded-lg">
                  <div className="h-[13rem]">
                    <a href={row?.link} target="_blank">
                      <img
                        className="h-[13rem] w-full border border-transparent rounded-lg"
                        alt={row?.title}
                        src={
                          row?.local_image !== ""
                            ? row?.local_image
                            : row?.thImage !== ""
                            ? row?.thImage
                            : DEFAULT_NEW_IMAGE
                        }
                        onError={(e) => {
                          e.target.src = DEFAULT_NEW_IMAGE;
                        }}
                      />
                    </a>
                    <div className="absolute top-0 left-0 m-5 mt-10 border rounded-xl bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg h-[6.7rem] w-[16rem] text-[0.8rem] p-2 text-justify text-slate-800 mx-2">
                      <a
                        onClick={(event) => toggleLang(event)}
                        className="cursor-pointer"
                      >
                        {lang ? (
                          <div className="rtl">{row?.summaryFa}</div>
                        ) : (
                          row?.summaryEn
                        )}
                      </a>
                    </div>
                    <div className="absolute right-0 top-0 m-2 bg-D-color-theme rounded-md">
                      <div className="p-[0.2rem] text-[0.8rem] font-bold text-white">
                        {row?.category}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[10rem] w-full">
                    <DetailsBox
                      data={row}
                      lineChartWidth="w-[2rem]"
                      nav={nav}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="text-end pt-2">
            <Button
              onClick={(event) => {
                event.preventDefault();
                navigate("/aimoon-news", {
                  state: {
                    endDate: newEndDate,
                    nav: nav,
                  },
                });
              }}
              className="mb-0 inline-flex items-center px-3 py-2 font-medium text-center text-white rounded-lg bg-color-theme hover:bg-color-theme-light text-[0.75rem] h-7 cursor-pointer"
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default LatestAimoonNew;
