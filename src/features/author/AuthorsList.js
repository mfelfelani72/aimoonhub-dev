import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import avatar from "../../../assets/images/avatar.png";

import { getData } from "../../../utils/helpers/getData.js";
import { AUTHORS } from "../../app/constant/EndPoints.js";
import Button from "../core/components/Button.jsx";

function AuthorsList() {
  const [authorsList, setAuthorsList] = useState([]);
  const [category, setCategory] = useState("cryptocurrencies");
  const [priority, setPriority] = useState(2);

  const getAuthorsList = async () => {
    const parameter = {
      category: category,
      priority: priority,
    };

    try {
      getData(AUTHORS, parameter).then((response) => {
        if (response.data.data) {
          console.log("Fetch dataAuthorsList done.");
          // console.log(response.data.data);
          setAuthorsList(response.data.data.author_list);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  let defaultImage =
    "https://cdn3d.iconscout.com/3d/premium/thumb/bitcoin-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--logo-btc-gold-symbol-sign-crpto-glossy-crypto-pack-science-technology-illustrations-3591010.png?f=webp";

  useEffect(() => {
    if (authorsList.length == 0) getAuthorsList();
  }, [authorsList]);

  const navigate = useNavigate();
  const goto = (row, event) => {
    event.preventDefault();
    navigate("/author-dashboard", { state: { author: row } });
  };
  return (
    <div className="bg-white m-4 rounded-[1rem]">
      {/* header */}
      <h2 className="pt-1 px-2">Authors List</h2>
      <div className="text-[0.7rem] text-slate-500 font-bold px-2">
        <span>
          <NavLink to="/">Home</NavLink>
        </span>
        <span className="pl-2"> {" > "}</span>
        <span className="pl-2">Authors List</span>
      </div>

      {/* header */}
      <div className="container p-2 mx-auto">
        <div className="grid grid-cols-1 gap-2 ">
          {/* card */}
          {authorsList.map((row, index) => (
            <div key={index} className="border-2 rounded-xl p-2 pt-3">
              <div className="h-[6rem]">
                <div className="flex flex-row">
                  <div className="basis-2/5">
                    <div className="">
                      <a href={row?.biographyUrl} target="_blank">
                        <img
                          className="h-[4rem] w-[4rem] rounded-full mx-auto border-2 border-color-theme"
                          src={
                            row?.local_image !== ""
                              ? row?.local_image
                              : row?.picUrl !== ""
                              ? row?.picUrl
                              : avatar
                          }
                          onError={(e) => {
                            e.target.src = avatar;
                          }}
                        />
                      </a>
                    </div>
                    <div className="text-[0.8rem] text-slate-800 pt-1 text-center">
                      <a href={row?.biographyUrl} target="_blank">
                        {row?.name}
                      </a>
                    </div>
                  </div>
                  <div className="basis-3/5 text-center self-center">
                    <div className="text-[0.8rem]">
                      <span className="font-bold">+{row?.newsCount}</span> news
                    </div>
                    <div className="text-[0.7rem]">
                      Journalist at{" "}
                      <span className="font-bold">{row?.worked}</span>
                    </div>
                    <div className="mt-5">
                      <Button
                        className="bg-color-theme hover:bg-color-theme dark:bg-D-color-theme dark:hover:bg-D-color-theme text-[0.8rem] px-3"
                        onClick={(event) => goto(row, event)}
                      >
                        Dashboard
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-center mt-1">
                {row?.symbols.length
                  ? row?.symbols.map((element, index) =>
                      index <= 4 ? (
                        <div key={index}>
                          <img
                            className="h-[2rem] w-[2rem] rounded-full mx-auto"
                            src={defaultImage}
                          />
                          <div className="text-[0.65rem] text-center font-bold">
                            +{element.news_count}
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </div>
            </div>
          ))}

          {/* card */}
        </div>
      </div>
    </div>
  );
}
1;
export default AuthorsList;
