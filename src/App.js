import React from "react";
import ScrollToTopBtn from "./components/menu/ScrollToTop";
import Header from "./components/menu/header";
import Home from "./components/views/faucet";
import Shop from "./components/views/shop";
import Error from "./components/views/errorPage";
import MarketPlace from "./components/views/marketplace";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

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
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/error" element={<Error />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ScrollToTopBtn />
    </HashRouter>
  </div>
);
export default app;
