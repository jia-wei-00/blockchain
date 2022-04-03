import React, { useEffect, useState } from "react";
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints,
} from "react-socks";
import { NavLink } from "react-router-dom";
// import useOnclickOutside from "react-cool-onclickoutside";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Web3Modal from "web3modal";
import { connect } from "../../redux/blockchain/blockchainActions";
import { useTranslation } from "react-i18next";
import logo from "../../assets/img/SA-logo.png";
import useSharableState from "../../../src/SharableState.js";
import { useBetween } from "use-between";

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);

  const [openMenu, setOpenMenu] = React.useState(false);

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const [showmenu, btn_icon] = useState(false);
  useEffect(() => {
    dispatch(connect());
    // connectWeb3();
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        totop.classList.add("show");
      } else {
        header.classList.remove("sticky");
        totop.classList.remove("show");
      }
      if (window.pageYOffset > sticky) {
        closeMenu();
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  return (
    <header id="myHeader" className="navbar white">
      <div className="container">
        <div className="row w-100-nav">
          <BreakpointProvider>
            {/*SCREEN RESOLUTION <1200 */}
            <Breakpoint l down>
              {showmenu && (
                <div className="menu">
                  <div className="navbar-item">
                    <NavLink to="/">
                      {/* SPACE-ALPACA */}
                      {t("home.label")}
                      <span className="lines"></span>
                    </NavLink>
                  </div>
                  <div className="navbar-item">
                    <NavLink to="/shop">
                      {t("shop.label")}
                      <span className="lines"></span>
                    </NavLink>
                  </div>
                  <div className="navbar-item">
                    <NavLink to="/error">
                      {t("marketplace.label")}
                      <span className="lines"></span>
                    </NavLink>
                  </div>
                </div>
              )}
            </Breakpoint>

            {/*SCREEN RESOLUTION >1200 */}
            <Breakpoint xl>
              <div className="menu">
                <div className="navbar-item">
                  <NavLink to="/">
                    {/* SPACE-ALPACA */}
                    {t("home.label")}
                    <span className="lines"></span>
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink to="/shop">
                    {t("shop.label")}
                    <span className="lines"></span>
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink to="/error">
                    {t("marketplace.label")}
                    <span className="lines"></span>
                  </NavLink>
                </div>
              </div>
            </Breakpoint>
          </BreakpointProvider>

          <div className="mainside">
            {blockchain.account ? (
              <Button className="btn-main btn-connect" disabled>
                {blockchain.account.substring(0, 2) +
                  "..." +
                  blockchain.account.substring(blockchain.account.length - 4)}
              </Button>
            ) : (
              <Button
                className="btn-main btn-connect"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(connect());
                }}
              >
                {t("connectWallet.label")}
              </Button>
            )}
          </div>
        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
    </header>
  );
};
export default Header;
