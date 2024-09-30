import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

import avatar from "../../../assets/images/avatar.png";

import { getData } from "../../../utils/helpers/getData";
import { LATEST_NEWS } from "../../app/constant/EndPoints";

import DetailsBox from "./components/DetailsBox.jsx";

const LatestAimoonNew = () => {
  const [newsData, setNewsData] = useState([]);
  const [firstNew, setFirstNew] = useState();
  const [otherNews, setOtherNews] = useState([]);

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
          setNewsData(response.data.data.result);
          setFirstNew(response.data.data.result[0]);
          setOtherNews([
            response.data.data.result[1],
            response.data.data.result[2],
            response.data.data.result[3],
            response.data.data.result[4], //here
          ]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (newsData.length == 0) getNews();
  }, [newsData, firstNew, otherNews]);

  return (
    <>
      {/* summary */}

      <div className="relative">
        <div className="h-[10rem]">
          <img className="h-full w-full" src={firstNew?.thImage} />
        </div>
        <div className="absolute top-0 left-0">
          <div className="relative border-b-[200rem] border-b-transparent border-l-[20rem] border-l-slate-500/90">
            <div className="absolute top-0 -left-[20rem] text-slate-50 text-[0.8rem] p-2 pr-5 font-bold text-justify">
              {firstNew?.summaryEn}
            </div>
          </div>
        </div>
      </div>

      {/* summary */}

      {/* details box */}

      {firstNew && <DetailsBox data={firstNew} lineChartWidth="w-[7rem]" />}

      {/* details box */}

      <div className="bg-slate-50 p-4 pb-0 relative border-t-2 z-10">
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
          {otherNews.map((row, index) => (
            <SwiperSlide row={row} key={index}>
              <div className="relative h-[18rem] border rounded-lg">
                <div className="h-[12rem]">
                  <img
                    className="h-[12rem] w-full border border-transparent rounded-lg"
                    src={row.thImage}
                  />
                  <div className="absolute top-0 left-0 m-5 border rounded-xl bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg h-[6.7rem] w-[20rem] text-[0.8rem] p-2 text-justify text-slate-800">{firstNew?.summaryEn}</div>
                  <div className="absolute right-0 top-0 m-2 bg-D-color-theme">
                    <div className="p-[0.2rem] text-[0.8rem] font-bold text-white">
                      News
                    </div>
                  </div>
                </div>
                <div className="absolute top-[9rem] w-full">
                  <DetailsBox data={row} lineChartWidth="w-[5rem]" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default LatestAimoonNew;
