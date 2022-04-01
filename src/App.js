import React from "react";
import { Router, Location, Redirect } from "@reach/router";
import ScrollToTopBtn from "./components/menu/ScrollToTop";
import Header from "./components/menu/header";
import Swap from "./components/views/swap";
import Home from "./components/views/faucet";
import Shop from "./components/views/shop";
import MysteryBox from "./components/views/mysteryBox";
import Marketplace from "./components/views/marketplace";
import NFT from "./components/views/nft";
import NFTDetail from "./components/views/nftDetail";
import Cronjob from "./components/views/cronjob";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location]);
  return children;
};

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id="routerhang">
        <div key={location.key}>
          <Router location={location}>{children}</Router>
        </div>
      </div>
    )}
  </Location>
);

const app = () => (
  <div className="wraper">
    <GlobalStyles />
    <Header />
    <PosedRouter>
      <ScrollTop path="/">
        <Home exact path="/">
          <Redirect to="/home" />
        </Home>
        <Shop path="/shop" />
        <MysteryBox path="/mysteryBox" />
        <Marketplace path="/marketplace" />
        <NFT path="/nft" />
        <NFTDetail path="/nftDetail/:event/:nftId" />
        <NFTDetail path="/nftDetail/:nftId" />
        <Cronjob path="/cronjob" />
      </ScrollTop>
    </PosedRouter>
    <ScrollToTopBtn />
  </div>
);
export default app;
