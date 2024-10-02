import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import avatar from "../../../assets/images/avatar.png";

import { getData } from "../../../utils/helpers/getData";
import { AUTHOR_INFO } from "../../app/constant/EndPoints";

import BarChart from "../core/components/BarChart.jsx";
import ChartDoughnut from "../core/components/ChartDoughnut.jsx";

function AuthorDashboard() {
  const [author, setAuthor] = useState();
  const [category, setCategory] = useState("cryptocurrencies");
  const [authorName, setAuthorName] = useState("newsbtc");

  const getAuthorInfo = async () => {
    const parameter = {
      category: category,
      name: authorName,
    };

    try {
      getData(AUTHOR_INFO, parameter).then((response) => {
        if (response.data.data) {
          console.log("Fetch dataAuthors done.");
          console.log(response.data.data[0]);
          setAuthor(response.data.data[0]);
          //   console.log(state);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!author) getAuthorInfo();
  }, [author]);

  let defaultImage =
    "https://cdn3d.iconscout.com/3d/premium/thumb/bitcoin-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--logo-btc-gold-symbol-sign-crpto-glossy-crypto-pack-science-technology-illustrations-3591010.png?f=webp";
  return (
    <>
      <h3 className="p-2">AuthorDashboard</h3>
      <div className="container mx-auto mb-3">
        <div className="flex">
          <div className="basis-1/5 self-center mx-auto">
            <div className="">
              <a href={author?.biographyUrl} target="_blank">
                <img
                  className="h-[4rem] w-[4rem] rounded-full mx-auto border-2 border-color-theme"
                  src={author?.picUrl ? author?.picUrl : avatar}
                />
              </a>
            </div>
            <div className="text-[0.8rem] text-slate-800 pt-1 text-center">
              <a href="{author?.biographyUrl}" target="_blank">
                {author?.name}
              </a>
            </div>
          </div>
          <div className="basis-3/5 ">
            <div className="text-[0.8rem] text-slate-800 pt-1 px-2">
              <span className="text-[0.8rem] font-bold">Biography</span>
              <a href="{author?.biographyUrl}" target="_blank">
                <div className="text-[0.7rem] text-justify">
                  {author?.biography}
                </div>
              </a>
            </div>
          </div>
          <div className="basis-1/5 self-center mx-2">
            <span className="text-[0.8rem] font-bold">Coins</span>
            <div className="max-h-[6rem] overflow-y-auto border-2 shadow-inner bg-slate-50">
              <div className="flex">
                <img className="h-7 w-7" src={defaultImage} />
                <div className="text-[0.7rem] mt-2">name</div>
              </div>
              <div className="flex">
                <img className="h-7 w-7" src={defaultImage} />
                <div className="text-[0.7rem] mt-2">name</div>
              </div>
              <div className="flex">
                <img className="h-7 w-7" src={defaultImage} />
                <div className="text-[0.7rem] mt-2">name</div>
              </div>
              <div className="flex">
                <img className="h-7 w-7" src={defaultImage} />
                <div className="text-[0.7rem] mt-2">name</div>
              </div>
              <div className="flex">
                <img className="h-7 w-7" src={defaultImage} />
                <div className="text-[0.7rem] mt-2">name</div>
              </div>
              <div className="flex">
                <img className="h-7 w-7" src={defaultImage} />
                <div className="text-[0.7rem] mt-2">name</div>
              </div>
              <div className="flex">
                <img className="h-7 w-7" src={defaultImage} />
                <div className="text-[0.7rem] mt-2">name</div>
              </div>
              <div className="flex">
                <img className="h-7 w-7" src={defaultImage} />
                <div className="text-[0.7rem] mt-2">name</div>
              </div>
              <div className="flex">
                <img className="h-7 w-7" src={defaultImage} />
                <div className="text-[0.7rem] mt-2">name</div>
              </div>
              <div className="flex">
                <img className="h-7 w-7" src={defaultImage} />
                <div className="text-[0.7rem] mt-2">name</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-full mx-2">
            <BarChart></BarChart>
          </div>
        </div>

        <div className="h-12 w-12">
          <ChartDoughnut
            data={[44, 342, 23]}
            colors={[
              "rgba(255, 0, 0, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(64, 64, 64, 0.5)",
            ]}
          ></ChartDoughnut>
          <div>sadsa</div>
        </div>
      </div>
    </>
  );
}

export default AuthorDashboard;
