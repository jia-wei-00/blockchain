import React from "react";
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
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

const app = () => (
  <div className="wraper">
    <GlobalStyles />
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/blockchain" element={<Home />} />
        <Route path="/blockchain/shop" element={<Shop />} />
        <Route path="*" element={<Navigate to="/blockchain" replace />} />
      </Routes>
      <ScrollToTopBtn />
    </BrowserRouter>
  </div>
);
export default app;
