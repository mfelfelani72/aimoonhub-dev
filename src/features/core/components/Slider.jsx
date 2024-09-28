import React from "react";

import { Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/controller';

import { dateHelper } from "../../../../utils/helpers/dateHelper.js";
import { stringHelper } from "../../../../utils/helpers/stringHelper.js";
import avatar from "../../../../assets/images/avatar.png";

const Slider = (props) => {

    let defaultImage = "https://flowbite.com/docs/images/blog/image-1.jpg";

    return (
        
        <div className="ltr bg-white border-2 mb-2 p-2 z-10">


            <Swiper
                modules={[Autoplay, A11y,]}
                speed={5000}
                effect="fade"
                spaceBetween={30} // Adjust the spacing as needed
                slidesPerView={1} // Show only one slide by default
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}

            >

                {props.news?.map((row, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex ltr:flex-row rtl:flex-row-reverse">
                            <div className="basis-2/4">
                                <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                    <div className="mb-8">
                                        <div className="flex">
                                            <h3 className="mr-1">{row.category}</h3>
                                            <h5 className="ml-1 font-thin"> - {row.provider}</h5>
                                        </div>
                                        <div className="text-black font-bold text-xl mb-2"> {row.title}</div>
                                        <p className="text-grey-darker text-base">
                                            {row.articleBody == " " ? "You can click Read more to Read New You can click Read more to Read New You can click Read more to Read New" : stringHelper(row.articleBody, 20)}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <img className="w-10 h-10 rounded-full mr-4" src={avatar} alt="Avatar of Jonathan Reinink" />
                                        <div className="text-sm">
                                            <p className="text-black leading-none">{row.author}</p>
                                            <p className="text-grey-dark">{dateHelper(row.pubDate)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="basis-3/5">
                                <a href='/news#'>
                                    <img
                                        src={row.thImage == " " ? defaultImage : row.thImage}
                                        alt={`slide-${index + 1}`}
                                        className='w-full h-80 select-none'
                                    />
                                </a></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div >
    );
}

export default Slider;