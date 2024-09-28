import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

import avatar from "../../../assets/images/avatar.png";

const LatestAimoonNew = () => {
  let defaultImage = "https://flowbite.com/docs/images/blog/image-1.jpg";
  return (
    <>
      <div className="relative">
        <div>
          <img src={defaultImage} />
        </div>
        <div className="absolute right-0 bottom-0 m-4 h-[7rem] w-[22rem] border-D-color-theme rounded bg-white border-l-4 border-t-4">
          <div className="flex flex-col">
            <h2 className="pt-2 pl-2 font-bold">
              US Spot Bitcoin ETFs Continue Positive Streak with $106M Inflows;
              BlackRock’s IBIT Attracts $184M
            </h2>
            <div className="flex flex-row pt-1 pl-2 items-center">
              <div className="flex basis-1/2">
                <img src={avatar} className="h-5 w-5 rounded-[30px]" />
                <span className="px-1 text-[0.7rem]">author name</span>
              </div>

              <div className="basis-1/2 text-end">
                <div className="pr-2 text-[0.8rem]">2 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-4 pb-0">
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
          <SwiperSlide>
            <div className="relative h-[10rem]">
              <div className="h-[8.5rem]">
                <img className="h-[8.5rem] w-full" src={defaultImage} />

                <div className="absolute right-0 top-0 m-2 bg-D-color-theme">
                  <div className="p-[0.2rem] text-[0.8rem] font-bold text-white">
                    News
                  </div>
                </div>
                <div className="absolute right-0 bottom-2 m-2 mb-6 h-[5rem] w-[20rem] border-D-color-theme rounded bg-white border-l-4 border-t-4">
                  <div className="flex flex-col pb-1">
                    <h2 className="pt-2 px-2 font-bold text-[0.9rem]">
                      Federal Court Fined New York Man $36 Million for Crypto
                      Fraud
                    </h2>
                    <div className="flex flex-row pt-1 pl-2 items-center">
                      <div className="flex basis-1/2">
                        <img src={avatar} className="h-5 w-5 rounded-[30px]" />
                        <span className="px-1 text-[0.7rem]">author name</span>
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
          <SwiperSlide>
            <div className="relative h-[10rem]">
              <div className="h-[8.5rem]">
                <img className="h-[8.5rem] w-full" src={defaultImage} />

                <div className="absolute right-0 top-0 m-2 bg-D-color-theme">
                  <div className="p-[0.2rem] text-[0.8rem] font-bold text-white">
                    News
                  </div>
                </div>
                <div className="absolute right-0 bottom-2 m-2 mb-6 h-[5rem] w-[20rem] border-D-color-theme rounded bg-white border-l-4 border-t-4">
                  <div className="flex flex-col pb-1">
                    <h2 className="pt-2 px-2 font-bold text-[0.9rem]">
                      Federal Court Fined New York Man $36 Million for Crypto
                      Fraud
                    </h2>
                    <div className="flex flex-row pt-1 pl-2 items-center">
                      <div className="flex basis-1/2">
                        <img src={avatar} className="h-5 w-5 rounded-[30px]" />
                        <span className="px-1 text-[0.7rem]">author name</span>
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
        </Swiper>
      </div>
    </>
  );
};

export default LatestAimoonNew;
