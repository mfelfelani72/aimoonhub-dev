import React from "react";

import LatestNews from "../latestNews/latestNews";
import LatestAimoonNew from "../latestAimoonNew/LatestAimoonNew";
import AuthorAnalysis from "../author/AuthorAnalysis";
import ProviderAnalysis from "../provider/ProviderAnalysis";
import SymbolAnalysis from "../symbol/SymbolAnalysis";
import {Footer} from "../core/Footer"

function Landing() {
  return (
    <>
      <LatestAimoonNew />
      <LatestNews />
      <SymbolAnalysis  />
      <AuthorAnalysis />
      <ProviderAnalysis />
      
    </>
  );
}

export default Landing;
