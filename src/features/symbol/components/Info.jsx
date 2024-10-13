import React from 'react'
import { DEFAULT_COIN_IMAGE } from "../../../app/constant/Defaults.js";

function Info(props) {
  return (
    <div className="flex mt-1">
    <div className="basis-1/4">
      <div className="">
        <a href={props?.symbol.biographyUrl} target="_blank">
          <img
            className="h-[4rem] w-[4rem] rounded-full mx-auto border-2 border-color-theme"
            alt={props?.symbol.description}
            src={
              props?.symbol.local_image
                ? props?.symbol.local_image
                : props?.symbol.logo
                ? props?.symbol.logo
                : DEFAULT_COIN_IMAGE
            }
            onError={(e) => {
              e.target.src = DEFAULT_COIN_IMAGE;
            }}
          />
        </a>
      </div>
      <div className="text-[0.8rem] text-slate-800 pt-1 text-center">
        <a href={props?.symbol.biographyUrl} target="_blank">
          {props?.symbol.name}
        </a>
      </div>
    </div>
    <div className="basis-3/4 mx-2">
      <div className="text-[0.8rem] text-slate-800 py-1 px-2 border rounded-md">
        <span className="text-[0.8rem] font-bold">Description</span>
        <a href={props?.symbol.biographyUrl} target="_blank">
          <div className="text-[0.7rem] text-justify">
            {props?.symbol.description}
          </div>
        </a>
      </div>
    </div>
  </div>
  )
}

export default Info