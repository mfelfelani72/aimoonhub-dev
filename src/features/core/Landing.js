import React from "react";

import LatestNews from "../latestNews/latestNews";
import LatestAimoonNew from "../latestAimoonNew/LatestAimoonNew";
import AuthorAnalysis from "../author/AuthorAnalysis";

function Landing() {
  return (
    <div className="relative bg-gray-100 w-full pt-1 z-10">
      {/* <LatestAimoonNew /> */}
      <LatestNews />
      {/* <AuthorAnalysis /> */}
    </div>
  );
}

export default Landing;
