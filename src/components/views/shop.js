import { Image, Row, Col, Form, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { useBetween } from "use-between";
import useSharableState from "../../../src/SharableState.js";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { fetchData } from "../../redux/data/dataActions";
import { useTranslation } from "react-i18next";
import Inventory from "./inventory";

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
  const [approved, setApproved] = useState("");
  const { JTOKENAddress, RANDOMNFTAddress } = useBetween(useSharableState);
  const [loading, setLoading] = useState(false);
  const [nftSales, setNFTSales] = useState("");
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

  const buyNFT = () => {
    setLoading(true);
    let amount = Web3.utils.toWei(String("1"), "ether");
    let tmp_hashedValue = amount + 1111;
    let hashedValue = Web3.utils.sha3(tmp_hashedValue, { encoding: "hex" });
    blockchain.RANDOMNFT.methods
      .mintNFT(amount, hashedValue)
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
      })
      .then((receipt) => {
        setLoading(false);
        window.location.reload();
      });
  };

  const approveNFTAddress = () => {
    setLoading(true);
    let amount = Web3.utils.toWei(String("9999999999"), "ether");
    blockchain.JTOKEN.methods
      .approve(RANDOMNFTAddress, amount)
      .send({ from: blockchain.account })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
        setLoading(false);
      })
      .then((receipt) => {
        setLoading(false);
        window.location.reload();
      });
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
          {openMenu1 && (
            <div className="tab-2 onStep fadeIn">
              <div className="row">
                {data.getSellingNFT.length > 0 ? (
                  data.getSellingNFT.map((nft, index) => {
                    return (
                      <div
                        key={index}
                        className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-4"
                      >
                        <div className="nft-card">
                          <div className="gradient-box-shadow">
                            <div
                              className="gradient-box-shadow-inner"
                              style={{ padding: "15px" }}
                            >
                              <div className="position-relative">
                                {/* <Image
                                  src={
                                    nft.rarity === "5"
                                      ? nft5
                                      : nft.rarity === "4"
                                      ? nft4
                                      : nft.rarity === "3"
                                      ? nft3
                                      : nft.rarity === "2"
                                      ? nft2
                                      : nft.rarity === "1"
                                      ? nft1
                                      : null
                                  }
                                  alt="nft_image"
                                  className="w-100"
                                /> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center">{t("noData.label")}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;
