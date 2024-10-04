import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

import { getData } from "../../../utils/helpers/getData";
import { LATEST_NEWS } from "../../app/constant/EndPoints";

import DetailsBox from "./components/DetailsBox.jsx";

const LatestAimoonNew = () => {

  const { t } = useTranslation();

  const [newsData, setNewsData] = useState([]);
  const [firstNew, setFirstNew] = useState();

  const getNews = async () => {
    const parameter = {
      category: "cryptocurrencies",
      symbols: "all",
      startDate: "1716373411",
      // "endDate": newsTo,
      page: 1,
      pageLimit: 5,
      llmOnly: true,
    };

    try {
      getData(LATEST_NEWS, parameter).then((response) => {
        if (response.data.data.result) {
          console.log("Fetch dataLlm done.");
          console.log(response.data.data.result);
          setFirstNew(response.data.data.result[0]);
          response.data.data.result.shift();
          setNewsData(response.data.data.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   
    if (newsData.length == 0) getNews();
  }, [newsData, firstNew]);

  return (
    <div className="bg-white mx-4 rounded-[1rem]">
      <h2 className="p-2">{t("aimoon_news_analysis")}</h2>
      {/* summary */}

      <div className="relative">
        <div className="h-[10rem]">
          <a href={firstNew?.link} target="_blank">
            <img className="h-full w-full" src={firstNew?.thImage} />
          </a>
        </div>
        <div className="absolute top-0 left-0">
          <div className="absolute top-0 left-0 m-5 border rounded-xl bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg h-[6.7rem] w-[20rem] text-[0.8rem] p-2 text-justify text-slate-800">
            <a href={firstNew?.link} target="_blank">
              {localStorage.getItem("currentLngId") == "fa" ? (
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

      {firstNew && <DetailsBox data={firstNew} lineChartWidth="w-[4rem]" />}

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
                      src={row.thImage}
                    />
                  </a>
                  <div className="absolute top-0 left-0 m-5 mt-10 border rounded-xl bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg h-[6.7rem] w-[20rem] text-[0.8rem] p-2 text-justify text-slate-800">
                    <a href={row?.link} target="_blank">
                      {localStorage.getItem("currentLngId") == "fa" ? (
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
                  <DetailsBox data={row} lineChartWidth="w-[2rem]" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LatestAimoonNew;
