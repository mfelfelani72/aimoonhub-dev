import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { getData } from "../../../utils/helpers/getData.js";
import { AUTHORS } from "../../app/constant/EndPoints.js";
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
        {/* authors images */}
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
              <NavLink
                to="/authors-list"
                className="mb-0 inline-flex items-center px-3 py-2 font-medium text-center text-white rounded-lg bg-color-theme hover:bg-color-theme-light text-[0.75rem] h-7 cursor-pointer"
              >
                Authors List
              </NavLink>
            </div>
          </div>
        </div>
        {/* authors images */}

        <div className="flex flex-row mt-4 p-2">
          <div className="basis-1/2 text-md content-center text-T-bright">
            <div className="h-[9rem] w-[9rem] mx-auto -mt-3 mb-2">
              <ChartPie
                data={[
                  totalStat?.crypto_author_counts,
                  totalStat?.forex_author_counts,
                  totalStat?.commodity_author_counts,
                ]}
                colors={["#fde047", "#06b6d4", "#a855f7"]}
                //   labels={[`+${totalStat?.crypto_author_counts} Cryptocurrencies`,`+${totalStat?.forex_author_counts} Forex`,`+${totalStat?.commodity_author_counts} Commodity`]}
              />
            </div>
            <div className="text-[0.67rem] text-center font-bold">
              Author distribution chart in categories
            </div>
          </div>
          <div className="basis-1/2">
            <div className="flex flex-col content-center justify-center">
              <div className="basis-1/2">
                <div className="flex flex-row">
                  <div className="basis-1/4">
                    <div className="bg-[#fde047] w-[2rem] h-2 my-1"></div>
                    <div className="bg-[#06b6d4] w-[2rem] h-2 my-3"></div>
                    <div className="bg-[#a855f7] w-[2rem] h-2 my-1"></div>
                  </div>
                  <div className="basis-3/4 text-[0.85rem] text-slate-800">
                    <div>
                      <span className="font-bold">
                        {" "}
                        +{totalStat?.crypto_author_counts}
                      </span>{" "}
                      Cryptocurrencies
                    </div>
                    <div>
                      <span className="font-bold">
                        +{totalStat?.forex_author_counts}
                      </span>{" "}
                      Forex
                    </div>
                    <div>
                      <span className="font-bold">
                        +{totalStat?.commodity_author_counts}
                      </span>{" "}
                      Commodities
                    </div>
                  </div>
                </div>
              </div>
              <div className="basis-1/2">
                <div className="text-lime-500 text-center text-lg mt-8">
                  <span className="font-bold">+{totalStat?.total_author}</span>{" "}
                  Total Author
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorAnalysis;
