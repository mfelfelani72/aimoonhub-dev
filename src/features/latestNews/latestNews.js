import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import useAppStore from "../../app/stores/AppStore.js";
import useLatestNewsStore from "../../features/latestNews/stores/LatestNewsStore";

import CardRow from "./components/CardRow.jsx";
import Button from "../core/components/Button.jsx";
import Loader from "../core/components/Loader.jsx";

import { getData } from "../../../utils/helpers/getData";
import { LATEST_NEWS } from "../../app/constant/EndPoints";

const lodash = require("lodash");

const PAGE_NUMBER = 1;

const latestNews = () => {
  const { t } = useTranslation();

  const { setSidebarLink } = useAppStore((state) => ({
    setSidebarLink: state.setSidebarLink,
  }));

  const { setLatestNewsData } = useLatestNewsStore((state) => ({
    setLatestNewsData: state.setLatestNewsData,
  }));

  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState();

  const [newsCategory, setNewsCategory] = useState("cryptocurrencies");
  const [newsSymbols, setNewsSymbols] = useState("all");
  const [newsFrom, setNewsFrom] = useState("1716373411");
  const [newsTo, setNewsTo] = useState("1725633001");
  const [newsPageLimit, setNewsPageLimit] = useState(5);
  const [newsPage, setNewsPage] = useState(PAGE_NUMBER);

  const getNews = async () => {
    const parameter = {
      category: newsCategory,
      symbols: newsSymbols,
      startDate: newsFrom,
      // "endDate": newsTo,
      page: newsPage,
      pageLimit: newsPageLimit,
    };

    try {
      getData(LATEST_NEWS, parameter).then((response) => {
        if (response.data.data.result) {
          console.log("Fetch data done.");

          setLatestNewsData(response.data.data.result);

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

    setSidebarLink("news");
  }, [newsData]);

  return (
    <div className="flex flex-row bg-white m-4 rounded-[1rem]">
      <div className="w-full">
        <h2 className="p-2">{t("l_cryptocurrency_n")}</h2>
        {newsData.map((row, index) => (
          <CardRow row={row} key={index} />
        ))}
        <div className="ltr:text-right rtl:text-left">
          <Button
            onClick={() => handleGetNews()}
            className="m-3 bg-color-theme hover:bg-color-theme dark:bg-D-color-theme dark:hover:bg-D-color-theme"
          >
            {t("more_ln")}
          </Button>
        </div>

        {loading && <Loader />}
      </div>
    </div>
  );
};

export default latestNews;
