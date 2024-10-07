import React from "react";

import LatestNews from "../latestNews/latestNews";
import LatestAimoonNew from "../latestAimoonNew/LatestAimoonNew";
import AuthorAnalysis from "../author/AuthorAnalysis";
import ProviderAnalysis from "../provider/ProviderAnalysis";
import SymbolAnalysis from "../symbol/SymbolAnalysis";

import Login from "../../features/auth/Login.js"

function Landing() {
  return (
    <>
    {/* <Login /> */}
      <LatestAimoonNew />
      <LatestNews />
      <AuthorAnalysis />
      <ProviderAnalysis />
      <SymbolAnalysis />
    </>
  );
}

export default Landing;
