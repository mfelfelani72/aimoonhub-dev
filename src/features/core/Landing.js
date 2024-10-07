import React from "react";

import LatestNews from "../latestNews/latestNews";
import LatestAimoonNew from "../latestAimoonNew/LatestAimoonNew";
import AuthorAnalysis from "../author/AuthorAnalysis";
import ProviderAnalysis from "../provider/ProviderAnalysis";
import SymbolAnalysis from "../symbols/SymbolAnalysis";

function Landing() {
  return (
    <>
      {/* <LatestAimoonNew /> */}
      {/* <LatestNews /> */}
      {/* <AuthorAnalysis /> */}
      <ProviderAnalysis />
      <SymbolAnalysis />
    </>
  );
}

export default Landing;
