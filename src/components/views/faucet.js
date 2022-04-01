import swapBackground from "../../assets/img/swap-bg.png";
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

const Swap = () => {
  var Web3 = require("web3");
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);

  const FaucetBtn = () => {
    setLoading(true);
    let amount = Web3.utils.toWei(String("100"), "ether");
    let tmp_hashedValue = amount + 1111;
    let hashedValue = Web3.utils.sha3(tmp_hashedValue, { encoding: "hex" });
    console.log(hashedValue);
    blockchain.JTOKEN.methods
      .JTokenFaucet(amount, hashedValue)
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

  

  useEffect(() => {
    if (blockchain.account !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.JTOKEN]); // eslint-disable-line

  

  return (
    <div>
      <GlobalStyles />
      <section className="no-bottom">
        <div className="row justify-content-center">
          <div
            className="col-md-5 col-xl-4 col-10 mb30"
            onClick={() => window.open("https://metamask.io/", "_blank")}
            style={{ cursor: "pointer" }}
          >
            <span className="box-url mt-5">
              <img src={process.env.PUBLIC_URL + "/img/wallet/1.png"} alt="" className="mb20" />
              <h4>Metamask</h4>
              <p>Please use Metamask to play the game</p>
            </span>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-12">
            <h3 className="mt-3" style={{ textAlign: "center" }}>
              This game is build for my hobby purpose
            </h3>
            <Row className="justify-content-center">
              <Col md={6} xl={5}>
                <ul className="mb-5">
                  <li>
                    <p>
                      All smart contract deploy in Binance Smart Chain Testnet.
                    </p>
                  </li>
                  <li>
                    <p>
                      You need to connect Metamask to Binance Smart Chain
                      Testnet{" "}
                      <a
                        href="https://medium.com/spartanprotocol/how-to-connect-metamask-to-bsc-testnet-7d89c111ab2"
                        target="_blank"
                        className="mx-1"
                      >
                        Tutorial Here
                      </a>
                      .
                    </p>
                  </li>
                  <li>
                    <p>This game only support Metamask as wallet.</p>
                  </li>
                  <li>
                    <p>This game can buy NFT by using JTOKEN in this game.</p>
                  </li>
                  <li>
                    <p>NFT in this game is random with rarity.</p>
                  </li>
                  <li>
                    <p>NFT can be sell in marketplace.</p>
                  </li>
                </ul>
              </Col>
            </Row>
            <h3 style={{ textAlign: "center" }}>To get JTOKEN in this game </h3>
            <Row className="justify-content-center">
              <Col md={6} xl={5}>
                <ul className="mb-5">
                  <li>
                    <p>
                      Get BNB in Binance Smart Chain Faucet {"  "}
                      <a
                        href="https://testnet.binance.org/faucet-smart"
                        target="_blank"
                        className="mx-1"
                      >
                        Link Here
                      </a>
                    </p>
                  </li>
                  <li>
                    <p>
                      Then get 100 JTOKEN at{" "}
                      <button
                        className="faucet_btn mx-1"
                        onClick={FaucetBtn}
                        disabled={loading}
                      >
                        Here
                      </button>
                    </p>
                  </li>
                  <li>
                    <p>
                      Now you have{" "}
                      {Web3.utils.fromWei(data.getJTokenBalance, "ether")}{" "}
                      JTOKEN
                    </p>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Swap;
