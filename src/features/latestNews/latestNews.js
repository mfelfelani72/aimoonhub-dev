import React, { useEffect, useState } from "react";
import axios from "../../../utils/services/news/api.js";

import Loader from "../core/components/Loader.jsx";
import { useTranslation } from "react-i18next";

import useAppStore from "../../app/stores/AppStore.js";

import CardRow from "../core/components/CardRow.jsx";
import Button from "../core/components/Button.jsx";

const lodash = require("lodash");

const PAGE_NUMBER = 1;

const latestNews = () => {

  const { t } = useTranslation();

  const { setSidebarLink } = useAppStore((state) => ({
    setSidebarLink: state.setSidebarLink,
  }));

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState();

  const [newsCategory, setNewsCategory] = useState("cryptocurrencies");
  const [newsSymbols, setNewsSymbols] = useState("all");
  const [newsFrom, setNewsFrom] = useState("1716373411");
  const [newsTo, setNewsTo] = useState("1725633001");
  const [newsPageLimit, setNewsPageLimit] = useState(10);
  const [newsPage, setNewsPage] = useState(PAGE_NUMBER);

  const data = {
    category: newsCategory,
    symbols: newsSymbols,
    startDate: newsFrom,
    // "endDate": newsTo,
    page: newsPage,
    pageLimit: newsPageLimit,
  };

  const getNews = async () => {
    try {
      const result = await axios
        .post(`/News/GetPaginatedData/`, data)
        .then((response) => {
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetNews = async () => {

    setLoading(true);

    if (newsPage !== 1) lodashGetNews();
  };

  const lodashGetNews = lodash.debounce(function () {
    getNews();
  }, 100);

  useEffect(() => {
    if (news.length == 0) getNews();

    setSidebarLink("news");

    // console.log(news);
  }, [news, newsPage]);

  return (
    <>
      <div className="flex flex-row bg-B-V-bright dark:bg-DB-dim text-T-bright dark:text-DT-bright">
        <div className="w-full">
          {news.map((row, index) => (
            <CardRow row={row} key={index} />
          ))}

          <Button
            onClick={() => handleGetNews()}
            className="m-3 bg-color-theme/70 hover:bg-color-theme dark:bg-D-color-theme/70 dark:hover:bg-D-color-theme"
          >
            {t("more_ln")}
          </Button>
          {loading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default latestNews;
