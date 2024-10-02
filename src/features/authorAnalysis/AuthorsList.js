import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import avatar from "../../../assets/images/avatar.png";

import { getData } from "../../../utils/helpers/getData";
import { AUTHORS } from "../../app/constant/EndPoints";

function AuthorsList() {
  const [authorsList, setAuthorsList] = useState([]);
  const [category, setCategory] = useState("cryptocurrencies");
  const [priority, setPriority] = useState(2);

  // const {vals} = this.state;

  const getAuthorsList = async () => {
    // const { vals } = "";
    const parameter = {
      category: category,
      priority: priority,
    };

    try {
      getData(AUTHORS, parameter).then((response) => {
        if (response.data.data) {
          console.log("Fetch dataAuthorsList done.");
          console.log(response.data.data);
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
  return (
    <>
      {/* title */}
      <h2 className="p-2">Authors List</h2>
      {/* title */}
      <div className="container p-2">
        <div className="grid grid-cols-2 gap-2">
          {/* card */}
          {authorsList.map((row, index) => (
            <div key={index} className="border-2 rounded-xl p-2">
              <div className="h-[6rem]">
                <div className="flex flex-row">
                  <div className="basis-1/2">
                    <div className="">
                      <img
                        className="h-[4rem] w-[4rem] rounded-full mx-auto border-2 border-color-theme"
                        src={row?.picUrl ? row?.picUrl : avatar}
                      />
                    </div>
                    <div className="text-[0.8rem] text-slate-800 pt-1 text-center">
                      {row?.name}
                    </div>
                  </div>
                  <div className="basis-1/2 text-center self-center">
                    <div className="text-[0.8rem]">
                      <span className="font-bold">+{row?.newsCount}</span> news
                    </div>
                    <div className="text-[0.7rem]">
                      works for <span className="font-bold">{row?.worked}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row mt-2">
                {/* {console.log(Object.keys(row?.symbols))} */}

                <div className="flex flex-col">
                  <div className="flex flex-row">
                    {Object.keys(row?.symbols).map((element, index) => (
                      <div key={index}>
                        {index <= 3 ? (
                          <div className="">
                            <img
                              className="h-[2rem] w-[2rem] rounded-full mx-auto"
                              src={defaultImage}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row">
                    {Object.values(row?.symbols).map((element, index) => (
                      <div key={index}>
                        {index <= 3 ? (
                          <div className="text-[0.6rem] font-bold text-center mx-[0.42rem]">
                            +{element}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* card */}
        </div>
      </div>
    </>
  );
}
1;
export default AuthorsList;
