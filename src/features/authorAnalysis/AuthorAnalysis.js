import React, { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";

import Button from "../../features/core/components/Button.jsx";

import { getData } from "../../../utils/helpers/getData";
import { AUTHORS } from "../../app/constant/EndPoints";
import ChartPie from "../core/components/ChartPie.jsx";

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
        <div className="self-center pl-2">
          <div className="text-[0.8rem] font-bold pb-1">Top 10 Authors</div>
          <div className="flex flex-row items-center">
            <div className="basis-3/4 relative h-10 w-[17rem] justify-center">
              {authors.map((row, index) => (
                <div
                  style={{
                    left: `${index * 1.5}rem`,
                  }}
                  className="absolute top-0"
                  key={index}
                >
                  <img className="h-12 w-12 rounded-full" src={row.picUrl} />
                </div>
              ))}
            </div>
            <div className="basis-1/4 text-center">
              <Button className="bg-color-theme hover:bg-color-theme-light text-[0.8rem] h-7 cursor-pointer">
                Author List
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-4 p-2">
          <div className="basis-2/5 text-md content-center text-T-bright">
            <div className="text-lime-500 text-center">
              <span className="font-bold">+{totalStat?.total_author}</span>{" "}
              Total Author
            </div>
            {/* <div>
            +{totalStat?.crypto_author_counts} Author in Cryptocurrencies
          </div>
          <div>+{totalStat?.forex_author_counts} Author in Forex</div>
          <div>+{totalStat?.commodity_author_counts} Author in Commodity</div> */}
          </div>
          <div className="basis-3/5 content-center justify-center">
            <div className="h-[12rem] w-[12rem] mx-auto">
            <ChartPie
              data={[
                totalStat?.crypto_author_counts,
                totalStat?.forex_author_counts,
                totalStat?.commodity_author_counts,
              ]}
              colors={[
                "#f97316",
                "#06b6d4",
                "#a855f7",
              ]}
              labels={[`+${totalStat?.crypto_author_counts} Cryptocurrencies`,`+${totalStat?.forex_author_counts} Forex`,`+${totalStat?.commodity_author_counts} Commodity`]}
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorAnalysis;
