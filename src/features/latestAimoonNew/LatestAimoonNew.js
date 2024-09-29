import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

import avatar from "../../../assets/images/avatar.png";

import { getData } from "../../../utils/helpers/getData";
import { LATEST_NEWS } from "../../app/constant/EndPoints";
import { dateHelper } from "../../../utils/helpers/dateHelper.js";

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

  let defaultImage = "https://flowbite.com/docs/images/blog/image-1.jpg";
  return (
    <>
      <div className="relative">
        <div className="">
          <img src={firstNew?.thImage} />
        </div>
        <div className="absolute top-0 left-0">
          <div className="relative border-b-[200rem] border-b-transparent border-l-[20rem] border-l-slate-500/90">
            <div className="absolute top-0 -left-[20rem] text-slate-50 text-[0.8rem] p-2 pr-5 font-bold text-justify">
              {firstNew?.summaryEn}
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 m-4 h-[3.3rem] w-[22rem] border-D-color-theme rounded bg-white border-l-4 border-t-4">
          <div className="flex flex-col">
            <div className="flex flex-row pt-1 pl-1">
              <img src={avatar} className="h-5 w-5 rounded-[30px]" />
              <span className="px-1 text-[0.7rem]">{firstNew?.author}</span>
            </div>

            <div className="flex flex-row pt-1 pl-1 items-center">
              <div className="flex basis-1/2">
                <img src={avatar} className="h-5 w-5 rounded-[30px]" />
                <span className="px-1 text-[0.7rem]">{firstNew?.author}</span>
              </div>

              <div className="basis-1/2 text-end">
                <div className="pr-2 text-[0.7rem] text-slate-500">{dateHelper(firstNew?.pubDate)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-4 pb-0 relative z-10">
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
              <div className="relative h-[10rem]">
                <div className="h-[8.5rem]">
                  <img className="h-[8.5rem] w-full" src={row.thImage} />

                  <div className="absolute right-0 top-0 m-2 bg-D-color-theme">
                    <div className="p-[0.2rem] text-[0.8rem] font-bold text-white">
                      News
                    </div>
                  </div>
                  <div className="absolute right-0 bottom-2 m-2 mb-6 h-[5rem] w-[20rem] border-D-color-theme rounded bg-white border-l-4 border-t-4">
                    <div className="flex flex-col pb-1">
                      <h2 className="pt-2 px-2 font-bold text-[0.5rem]">
                        {row.summaryEn}
                      </h2>
                      <div className="flex flex-row pt-1 pl-2 items-center">
                        <div className="flex basis-1/2">
                          <img
                            src={avatar}
                            className="h-5 w-5 rounded-[30px]"
                          />
                          <span className="px-1 text-[0.7rem]">
                            {row.author}
                          </span>
                        </div>

                        <div className="basis-1/2 text-end">
                          <div className="pr-2 text-[0.8rem]">2 days ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
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
