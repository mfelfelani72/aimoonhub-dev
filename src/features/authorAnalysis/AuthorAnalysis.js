import React, { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";

import Button from "../../features/core/components/Button.jsx";

import { getData } from "../../../utils/helpers/getData";
import { AUTHORS } from "../../app/constant/EndPoints";

function AuthorAnalysis() {
  const { t } = useTranslation();

  const [authors, setAuthors] = useState([]);
  const [totalStat, setTotalStat] = useState([]);
  const [category, setCategory] = useState("cryptocurrencies");
  const [priority, setPriority] = useState(1);

  const getAuthors = async () => {
    const parameter = {
      category: category,
      priority: priority,
    };

    try {
      getData(AUTHORS, parameter).then((response) => {
        if (response.data.data) {
          console.log("Fetch dataAuthor done.");
          //   console.log(response.data.data);
          setAuthors(response.data.data.author_list);
          setTotalStat(response.data.data.total_stat);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authors.length == 0) getAuthors();
  }, [authors, totalStat]);
  return (
    <div className="relative bg-slate-50 z-10">
      {/* title */}
      <h2 className="p-2">{t("aimoon_authors_analysis")}</h2>
      {/* title */}

      <div className="container mx-auto">
        <div className="flex flex-row">
          <div className="author_images basis-3/5 self-center pl-3">
            <div className="text-[0.8rem] font-bold pb-2">Top 10 Authors</div>
            <div className="flex flex-row relative h-10 w-full justify-center">
              {authors.map((row, index) => (
                <div
                  style={{
                    left: `${index * 1.2}rem`,
                  }}
                  className="absolute top-0"
                  key={index}
                >
                  <img className="h-10 w-10 rounded-full" src={row.picUrl} />
                </div>
              ))}
            </div>
            <div className="flex flex-row justify-center py-1">
              <div className="text-sm text-T-bright">
                <Button className="bg-color-theme hover:bg-color-theme-light text-[0.8rem] h-7 my-1 mt-3 cursor-pointer">
                  Author List
                </Button>
              </div>
            </div>
          </div>
          <div className="author_info basis-2/5 px-2 content-center text-[0.8rem] text-T-bright">
            <div>+{totalStat?.total_author} Total Author</div>
            <div>
              +{totalStat?.crypto_author_counts} Author in Cryptocurrencies
            </div>
            <div>+{totalStat?.forex_author_counts} Author in Forex</div>
            <div>+{totalStat?.commodity_author_counts} Author in Commodity</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorAnalysis;
