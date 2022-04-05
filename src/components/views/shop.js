import { Image, Row, Col, Form, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useBetween } from "use-between";
import useSharableState from "../../../src/SharableState.js";
import { fetchData } from "../../redux/data/dataActions";
import {
  setLoadingTrue,
  setLoadingFalse,
} from "../../redux/loading/loadingActions";
import { useTranslation } from "react-i18next";
import Inventory from "./inventory";
import OnMarket from "./onmarket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GlobalStyles = createGlobalStyle`
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  .navbar .mainside a{
    background: #8364e2;
    &:hover{
      box-shadow: 2px 2px 20px 0px #8364e2;
    }
  }
  .item-dropdown{
    .dropdown{
      a{
        &:hover{
          background: #8364e2;
        }
      }
    }
  }
  .btn-main{
    background: #8364e2;
    &:hover{
      box-shadow: 2px 2px 20px 0px #8364e2;
    }
  }
  p.lead{
    color: #a2a2a2;
  }
  .navbar .navbar-item .lines{
    border-bottom: 2px solid #8364e2;
  }
  .jumbotron.no-bg{
    height: 100vh;
    overflow: hidden;
    background-repeat: repeat;
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;
  }
  #tsparticles{
    top: 0;
  }
  .text-uppercase.color{
    color: #8364e2;
  }
  .de_count h3 {
    font-size: 36px;
    margin-bottom: 0px;
  }
  .de_count h5{
    font-size: 14px;
    font-weight: 500;
  }
  h2 {
    font-size: 30px;
  }
  .box-url{
    text-align: center;
    h4{
      font-size: 16px;
    }
  }
  .de_countdown{
    border: solid 2px #8364e2;
  }
  .author_list_pp, .author_list_pp i, 
  .nft_coll_pp i, .feature-box.style-3 i, 
  footer.footer-light #form_subscribe #btn-subscribe i, 
  #scroll-to-top div{
    background: #8364e2;
  }
  footer.footer-light .subfooter .social-icons span i{
    background: #403f83;
  }
  .author_list_pp:hover img{
    box-shadow: 0px 0px 0px 2px #8364e2;
  }
  .nft__item_action span{
    color: #8364e2;
  }
  .feature-box.style-3 i.wm{
    color: rgba(131,100,226, .1);
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const Shop = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  var Web3 = require("web3");
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const loading = useSelector((state) => state.loading.loading);
  const [approved, setApproved] = useState("");
  const { RANDOMNFTAddress } = useBetween(useSharableState);
  const [openMenu, setOpenMenu] = useState(true);
  const [openMenu1, setOpenMenu1] = useState(false);

  const checkNFTApproval = () => {
    blockchain.JTOKEN.methods
      .allowance(blockchain.account, RANDOMNFTAddress)
      .call({ from: blockchain.account })
      .then((receipt) => {
        setApproved(receipt);
      });
  };

  const renderBtn = () => {
    const display = [];
    if (blockchain.account !== null && approved !== "0") {
      display.push(
        <button
          className="btn btn-purple mt-2 mb-5 btn btn-primary"
          onClick={buyNFT}
          disabled={loading}
        >
          Buy (1 NFT = 1 JTOKEN)
        </button>
      );
    } else {
      display.push(
        <>
          <button
            className="btn btn-purple mt-2 mb-5 btn btn-primary"
            onClick={approveNFTAddress}
            disabled={loading}
          >
            Approve
          </button>
        </>
      );
    }
    return display;
  };

  const buyNFT = async () => {
    dispatch(setLoadingTrue());
    let amount = Web3.utils.toWei(String("1"), "ether");
    let tmp_hashedValue = amount + 1111;
    let hashedValue = Web3.utils.sha3(tmp_hashedValue, { encoding: "hex" });
    await toast.promise(
      blockchain.RANDOMNFT.methods
        .mintNFT(amount, hashedValue)
        .send({ from: blockchain.account })
        .once("error", (err) => {
          console.log(err);
          dispatch(setLoadingFalse());
        })
        .then((receipt) => {
          dispatch(setLoadingFalse());
          window.location.reload();
        }),
      {
        pending: "Loading... Please wait",
        success: "Success 👌",
        error: "Error occur 🤯",
      }
    );
  };

  const approveNFTAddress = async () => {
    dispatch(setLoadingTrue());
    let amount = Web3.utils.toWei(String("9999999999"), "ether");
    await toast.promise(
      blockchain.JTOKEN.methods
        .approve(RANDOMNFTAddress, amount)
        .send({ from: blockchain.account })
        .once("error", (err) => {
          dispatch(setLoadingFalse());
          console.log(err);
        })
        .then((receipt) => {
          dispatch(setLoadingFalse());
          window.location.reload();
        }),
      {
        pending: "Loading... Please wait",
        success: "Success 👌",
        error: "Error occur 🤯",
      }
    );
  };

  const handleOnSalesClick = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("mainbtn1").classList.add("active");
    document.getElementById("mainbtn").classList.remove("active");
  };

  const handleItemClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("mainbtn").classList.add("active");
    document.getElementById("mainbtn1").classList.remove("active");
  };

  let items = 0;

  for (var i = 0; i < data.getPlayerNFT.length; i++) {
    items++;
  }

  useEffect(() => {
    if (blockchain.account !== null) {
      dispatch(fetchData(blockchain.account));
      checkNFTApproval();
    }
  }, [blockchain.JTOKEN]); // eslint-disable-line

  return (
    <div>
      <GlobalStyles />
      <section className="mt-5 no-bottom">
        <div className="row justify-content-center mt-5">
          <div className="col-10">
            <span className="buy-nft">
              <div className="row justify-content-center mb-3">
                <div className="nft-card-question col-md-3">
                  <i className="fa fa-question" />
                </div>
              </div>
              <Row className="justify-content-center">{renderBtn()}</Row>
            </span>
          </div>
        </div>
      </section>

      <section className="container">
        <ul className="de_nav text-left mb-4">
          <li id="mainbtn" className="active">
            <span
              onClick={handleItemClick}
              style={{ textTransform: "uppercase" }}
            >
              {t("inventory.label")}
            </span>
          </li>
          <li id="mainbtn1" className="">
            <span
              onClick={handleOnSalesClick}
              style={{ textTransform: "uppercase" }}
            >
              {t("onmarket.label")}
            </span>
          </li>
        </ul>
        <div>
          {/* ITEMS */}
          {openMenu && <Inventory />}

          {/* ON SALES */}
          {openMenu1 && <OnMarket />}
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Shop;
