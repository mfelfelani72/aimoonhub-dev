import React, { useEffect, useState } from "react";
import axios from "../../../utils/services/news/api";

import Loader from "../core/components/Loader.jsx"

import useAppStore from "../../app/stores/AppStore.js"

import AllNewsSkeleton from "./AllNewsSkeleton.js";
import CardRow from "../core/components/CardRow.jsx";

const lodash = require('lodash');

const PAGE_NUMBER = 1;

const AllNews = () => {

    const { setSidebarLink } = useAppStore((state) => ({
        setSidebarLink: state.setSidebarLink,
    }))

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState();

    const [newsCategory, setNewsCategory] = useState("cryptocurrencies");
    const [newsSymbols, setNewsSymbols] = useState("all");
    const [newsFrom, setNewsFrom] = useState("1716373411");
    const [newsTo, setNewsTo] = useState("1725633001");
    const [newsPageLimit, setNewsPageLimit] = useState(10);
    const [newsPage, setNewsPage] = useState(PAGE_NUMBER);

    const data = {
        "category": newsCategory,
        "symbols": newsSymbols,
        "startDate": newsFrom,
        // "endDate": newsTo,
        "page": newsPage,
        "pageLimit": newsPageLimit
    }

    const getNews = async () => {

        try {
            const result = await axios
                .post(`/News/GetPaginatedData/`, data)
                .then(response => {

                    if (response.data.data.result) {

                        console.log(newsPage);
                        console.log("Fetch data done.");

                        setNews((prev) => {
                            return [...prev, ...response.data.data.result];
                        });
                        setNewsPage((prev) => prev + 1);
                        setLoading(false);
                    }
                });
        }
        catch (error) {
            console.log(error)
        }

    }

    const handleScroll = async () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            setLoading(true);

            if (newsPage !== 1)
                lodashGetNews();
        }
    };

    const lodashGetNews = lodash.debounce(function () {
        getNews();
    }, 100);

    useEffect(() => {

        if (news.length == 0)
            getNews();

        setSidebarLink("news");

        window.addEventListener("scroll", handleScroll);

        // console.log(news);

        return () => window.removeEventListener("scroll", handleScroll);

    }, [news, newsPage]);


    return (
        <>
            {
                news.length != 0 ?

                    <div className="flex flex-row bg-B-V-bright dark:bg-DB-dim text-T-bright dark:text-DT-bright" >
                        <div className="w-full">

                            {news.map((row, index) => (

                                <CardRow row={row} key={index} />

                            ))}
                            {loading && <Loader />}

                        </div>

                    </div>

                    :

                    <AllNewsSkeleton />

            }
        </>

    );
}

export default AllNews;



