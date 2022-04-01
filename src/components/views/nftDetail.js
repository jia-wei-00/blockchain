import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { useTranslation } from "react-i18next";
import levelOne from "../../assets/img/marketplace/Level-1.png";
import levelTwo from "../../assets/img/marketplace/Level-2.png";
import levelThree from "../../assets/img/marketplace/Level-3.png";
import { Row, Col, Button, Modal, Image } from "react-bootstrap";
import nftBackground from "../../assets/img/NFT-detail.png";
import closeIcon from "../../assets/img/Close.png";
import selling from "../../assets/img/title/Selling.png";
import gifting from "../../assets/img/title/Gift-away.png";
import updatePriceTitle from "../../assets/img/title/Update-price.png";
import cancelSalesTitle from "../../assets/img/title/Cancel-sales.png";
import onSales from "../../assets/img/On-sales.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/data/dataActions";
import tokenName from "./tokenName.js";
import useSharableState from "../../../src/SharableState.js";
import { useBetween } from "use-between";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;

// LOADER
const override = css`
  border-bottom-color: transparent !important;
  border-color: #ffffff;
  top: 2px;
`;

const tokenOption = [
  { value: "0", label: "SPAL" },
  { value: "1", label: "SpaceShard" },
];

const NFTDetail = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState("");
  const blockchain = useSelector((state) => state.blockchain);
  // GLOBAL STATE
  const {
    marketPlaceAddress,
    nftContractAddress,
    spalAddress,
    spaceShardAddress,
  } = useBetween(useSharableState);
  const [nftImage, setNFTImage] = useState("");
  const [nftDetails, setNFTDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [marketItem, setMarketItem] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [sellingPrice, setSellingPrice] = useState("0");
  const [token, setToken] = useState(spalAddress);
  const [nftPrice, setNFTPrice] = useState("");
  const { rate } = useBetween(useSharableState);
  const [approved, setApproved] = useState("");
  const [spalApproved, setSPALApproved] = useState("");
  const [spaceshardApproved, setSpaceShardApproved] = useState("");
  const [marketspaceshard, setMarketSpaceShard] = useState("");
  const [marketSPAL, setMarketSPAL] = useState("");

  const [openMenu, setOpenMenu] = useState(true);
  const [openMenu1, setOpenMenu1] = useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("mainbtn").classList.add("active");
    document.getElementById("mainbtn1").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("mainbtn1").classList.add("active");
    document.getElementById("mainbtn").classList.remove("active");
  };
  const handleShowSellModal = () => {
    setModalState("sellNFTModal");
  };
  const handleShowGiftModal = () => {
    setModalState("giftNFTModal");
  };
  const handleShowUpdateModal = () => {
    setModalState("updateNFTPrice");
  };
  const handleShowCancelModal = () => {
    setModalState("cancelSalesModal");
  };
  const handleClose = () => {
    setModalState("close");
  };

  let nullAddress = "0x0000000000000000000000000000000000000000";

  //CHECK NFT APPROVED
  const checkApprove = (nftId) => {
    blockchain.nftToken.methods
      .getApproved(nftId)
      .call({ from: blockchain.account })
      .then((receipt) => {
        console.log("approve", receipt);
        setApproved(receipt);
      });
  };

  //FETCH NFT DETAILS
  const fetchNFTDetails = (nftId) => {
    blockchain.nftToken.methods
      .getMintDetails(nftId)
      .call({ from: blockchain.account })
      .then((receipt) => {
        setNFTDetails(receipt[0]);
      });
  };

  //FETCH NFT IMAGE
  const fetchNFTURI = (nftId) => {
    blockchain.nftToken.methods
      .getNFTURI(nftId)
      .call({ from: blockchain.account })
      .then((receipt) => {
        setNFTImage(receipt);
      });
  };

  let image, level, rarity, ownerAddress;

  if (props.event === "buy" || props.event === "sales") {
    image = marketItem.tokenURI;
    level = marketItem.level;
    rarity = marketItem.rarity;
    ownerAddress = marketItem.seller;
  } else {
    image = nftImage;
    level = nftDetails.level;
    rarity = nftDetails.rarity;
    ownerAddress = nftDetails.seller;
  }

  //FETCH MARKET ITEM
  const fetchMarketItem = (itemID) => {
    blockchain.nftMarket.methods
      .getMarketItem(itemID)
      .call({ from: blockchain.account })
      .then((receipt) => {
        // console.log("marketItem", receipt);
        setNFTPrice(receipt.price);
        setMarketItem(receipt);
      });
  };
  var Web3 = require("web3");
  const weiValue = Web3.utils.fromWei(String(nftPrice), "ether");

  //FROM WEI TO USD
  const convertToUSD = (nftPrice) => {
    if (nftPrice) {
      const weiValue = Web3.utils.fromWei(String(nftPrice), "ether");
      let balance = weiValue * rate;
      return balance.toFixed(18);
    }
  };

  //APPROVE NFT
  const approve = () => {
    document.getElementById("loading").style.display = "block";
    document.getElementById("approvebtn").style.display = "none";
    setLoading(true);
    blockchain.nftToken.methods
      .approve(marketPlaceAddress, props.nftId)
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        document.getElementById("loading").style.display = "none";
        document.getElementById("approvebtn").style.display = "block";
      })
      .then((receipt) => {
        setLoading(false);
        document.getElementById("loading").style.display = "none";
        document.getElementById("approvebtn").style.display = "block";
        window.location.reload();
      });
  };

  //CHECK SPAL APPROVE
  const checkSPAL = () => {
    blockchain.spal.methods
      .allowance(blockchain.account, nftContractAddress)
      .call({ from: blockchain.account })
      .then((receipt) => {
        console.log("checkSPALApprove", receipt);
        setSPALApproved(receipt);
      });
  };

  //CHECK SPACESHARD APPROVE
  const checkSpaceShard = () => {
    blockchain.spaceShard.methods
      .allowance(blockchain.account, nftContractAddress)
      .call({ from: blockchain.account })
      .then((receipt) => {
        console.log("checkSpaceShard", receipt);
        setSpaceShardApproved(receipt);
      });
  };

  //CHECK SPACESHARD MARKETPLACE BUY
  const checkMarketSpaceShard = () => {
    blockchain.spaceShard.methods
      .allowance(blockchain.account, marketPlaceAddress)
      .call({ from: blockchain.account })
      .then((receipt) => {
        console.log("checkMarketSpaceShard", receipt);
        setMarketSpaceShard(receipt);
      });
  };

  //CHECK SPACESHARD MARKETPLACE BUY
  const checkMarketSpal = () => {
    blockchain.spal.methods
      .allowance(blockchain.account, marketPlaceAddress)
      .call({ from: blockchain.account })
      .then((receipt) => {
        console.log("checkMarketSpal", receipt);
        setMarketSPAL(receipt);
      });
  };

  //APPROVE MARKET SPAL
  const approveMarketSPAL = () => {
    document.getElementById("loadingbuy").style.display = "block";
    document.getElementById("approveSPAL").style.display = "none";
    setLoading(true);
    blockchain.spal.methods
      .approve(marketPlaceAddress, Web3.utils.toWei("1000000000", "ether"))
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        document.getElementById("loadingbuy").style.display = "none";
        document.getElementById("approveSPAL").style.display = "block";
      })
      .then((receipt) => {
        setLoading(false);
        document.getElementById("loadingbuy").style.display = "none";
        document.getElementById("approveSPAL").style.display = "none";
        document.getElementById("approvedbuybtn").style.display = "block";
        // window.location.reload();
      });
  };

  //APPROVE MARKET SPACESHARD
  const approveMarketSpaceShard = () => {
    document.getElementById("loadingbuy").style.display = "block";
    document.getElementById("approveSpaceshard").style.display = "none";
    setLoading(true);
    blockchain.spaceShard.methods
      .approve(marketPlaceAddress, Web3.utils.toWei("1000000000", "ether"))
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        document.getElementById("loadingbuy").style.display = "none";
        document.getElementById("approveSpaceshard").style.display = "block";
      })
      .then((receipt) => {
        setLoading(false);
        document.getElementById("loadingbuy").style.display = "none";
        document.getElementById("approveSpaceshard").style.display = "none";
        document.getElementById("approvedbuybtn").style.display = "block";
      });
  };

  //APPROVE SPAL
  const approveSPAL = () => {
    document.getElementById("loadingSell").style.display = "block";
    document.getElementById("approveSPAL").style.display = "none";
    setLoading(true);
    blockchain.spal.methods
      .approve(nftContractAddress, Web3.utils.toWei("1000000000", "ether"))
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        document.getElementById("loadingSell").style.display = "none";
        document.getElementById("approveSPAL").style.display = "block";
      })
      .then((receipt) => {
        setLoading(false);
        document.getElementById("loadingSell").style.display = "none";
        document.getElementById("approveSPAL").style.display = "none";
        document.getElementById("sellbtn").style.display = "block";
      });
  };

  //APPROVE SPACESHARD
  const approveSpaceShard = (nftId) => {
    document.getElementById("loadingSell").style.display = "block";
    document.getElementById("approveSpaceshard").style.display = "none";
    setLoading(true);
    blockchain.spaceShard.methods
      .approve(nftContractAddress, Web3.utils.toWei("1000000000", "ether"))
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        document.getElementById("loadingSell").style.display = "none";
        document.getElementById("approveSpaceshard").style.display = "block";
      })
      .then((receipt) => {
        setLoading(false);
        document.getElementById("loadingSell").style.display = "none";
        document.getElementById("approveSpaceshard").style.display = "none";
        document.getElementById("speedbtn" + nftId).style.display = "block";
      });
  };

  //RENDER LEVEL BUTTON
  const renderLevel = () => {
    const display = [];

    if (level < 3) {
      if (spaceshardApproved === nullAddress) {
        display.push(
          <Button
            id="approvebtn"
            className="btn btn-purple mt-2"
            onClick={approveSpaceShard}
          >
            {t("approve.label")}
          </Button>
        );
      } else {
        display.push(
          <Col md="auto">
            <div
              id="loadingLevel"
              className="btn btn-purple"
              style={{ display: "none" }}
            >
              <span style={{ margin: "auto 8px" }}>{t("loading.label")}</span>
              <ClipLoader loading={loading} css={override} size={17} />
            </div>

            <Button
              id="levelbtn"
              className="btn btn-green"
              onClick={() => {
                levelUp(level);
              }}
            >
              {t("levelUp.label")}
            </Button>
          </Col>
        );
      }
    }

    return display;
  };

  //BUY NFT
  const buyNFT = (price, tokenAddress) => {
    console.log(nftContractAddress, tokenAddress, props.nftId, price);
    setLoading(true);
    document.getElementById("loadingbuy").style.display = "block";
    document.getElementById("buybtn").style.display = "none";
    blockchain.nftMarket.methods
      .createMarketSale(nftContractAddress, tokenAddress, props.nftId, price)
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        document.getElementById("loadingbuy").style.display = "none";
        document.getElementById("buybtn").style.display = "block";
      })
      .then((receipt) => {
        setLoading(false);
        document.getElementById("loadingbuy").style.display = "none";
        document.getElementById("buybtn").style.display = "block";
        window.location.href = "/nft";
      });
  };

  //SELL NFT
  const createMarketItem = () => {
    if (sellingPrice === "0") {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Warning",
        text: t("pleaseEnterPrice.label"),
        icon: "warning",
      });
    } else {
      const nftSellingPrice = Web3.utils.toWei(String(sellingPrice), "ether");
      setLoading(true);
      document.getElementById("loadingSell").style.display = "block";
      document.getElementById("sellbtn").style.display = "none";
      blockchain.nftMarket.methods
        .createMarketItem(
          nftContractAddress,
          props.nftId,
          nftSellingPrice,
          token
        )
        .send({ from: blockchain.account })
        .once("error", (err) => {
          console.log(err);
          setLoading(false);
          document.getElementById("loadingSell").style.display = "none";
          document.getElementById("sellbtn").style.display = "block";
        })
        .then((receipt) => {
          setLoading(false);
          document.getElementById("loadingSell").style.display = "none";
          document.getElementById("sellbtn").style.display = "none";
          window.location.href = "/nft";
        });
    }
  };

  //GIFT NFT
  const giftNFT = () => {
    if (recipientAddress === "") {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Warning",
        text: t("pleaseEnterRecipientAddress.label"),
        icon: "warning",
      });
    } else {
      setLoading(true);
      document.getElementById("loadingGift").style.display = "block";
      document.getElementById("giftbtn").style.display = "none";
      blockchain.nftToken.methods
        .transferFrom(blockchain.account, recipientAddress, props.nftId)
        .send({ from: blockchain.account })
        .once("error", (err) => {
          console.log(err);
          setLoading(false);
          document.getElementById("loadingGift").style.display = "none";
          document.getElementById("giftbtn").style.display = "block";
        })
        .then((receipt) => {
          setLoading(false);
          document.getElementById("loadingGift").style.display = "none";
          document.getElementById("giftbtn").style.display = "block";
          window.location.href = "/nft";
        });
    }
  };

  //LEVEL UP
  const levelUp = (level) => {
    let levelUpPrice = 0;
    if (level === "1") {
      levelUpPrice = Web3.utils.toWei(String(1000), "ether");
    } else if (level === "2") {
      levelUpPrice = Web3.utils.toWei(String(3000), "ether");
    }
    setLoading(true);
    document.getElementById("loadingLevel").style.display = "block";
    document.getElementById("levelbtn").style.display = "none";
    blockchain.nftToken.methods
      .upNFTLevel(props.nftId, spaceShardAddress, 10000000)
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        document.getElementById("loadingLevel").style.display = "none";
        document.getElementById("levelbtn").style.display = "block";
      })
      .then((receipt) => {
        setLoading(false);
        document.getElementById("loadingLevel").style.display = "none";
        document.getElementById("levelbtn").style.display = "block";
        window.location.reload();
      });
  };

  //UPDATE PRICE
  const updatePrice = () => {
    if (newPrice === "") {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Warning",
        text: t("pleaseEnterPrice.label"),
        icon: "warning",
      });
    } else {
      const etherValue = Web3.utils.toWei(String(newPrice), "ether");
      console.log(etherValue);

      setLoading(true);
      document.getElementById("loadingUpdate").style.display = "block";
      document.getElementById("updatebtn").style.display = "none";
      blockchain.nftMarket.methods
        .updatePrice(props.nftId, newPrice)
        .send({ from: blockchain.account })
        .once("error", (err) => {
          console.log(err);
          setLoading(false);
          document.getElementById("loadingUpdate").style.display = "none";
          document.getElementById("updatebtn").style.display = "block";
        })
        .then((receipt) => {
          setLoading(false);
          document.getElementById("loadingUpdate").style.display = "none";
          document.getElementById("updatebtn").style.display = "block";
          window.location.reload();
        });
    }
  };

  //CANCEL SALES
  const cancelSales = () => {
    setLoading(true);
    document.getElementById("loadingCancel").style.display = "block";
    document.getElementById("cancelbtn").style.display = "none";
    blockchain.nftMarket.methods
      .cancelMarketItem(nftContractAddress, props.nftId)
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        document.getElementById("loadingCancel").style.display = "none";
        document.getElementById("cancelbtn").style.display = "block";
      })
      .then((receipt) => {
        setLoading(false);
        document.getElementById("loadingCancel").style.display = "none";
        document.getElementById("cancelbtn").style.display = "block";
        window.location.href = "/nft";
      });
  };

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.nftToken != null) {
      dispatch(fetchData(blockchain.account));
      if (props.event === "buy" || props.event === "sales") {
        fetchMarketItem(props.nftId);
        checkMarketSpaceShard();
        checkMarketSpal();
      } else {
        fetchNFTDetails(props.nftId);
        fetchNFTURI(props.nftId);
        checkApprove(props.nftId);
        checkSPAL();
        checkSpaceShard();
      }
    }
  }, [blockchain.nftToken]);

  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: `url(${nftBackground})`,
        backgroundSize: "contain",
      }}
    >
      <GlobalStyles />

      <section className="container">
        <div className="row mt-4 justify-content-evenly">
          <div className="col-md-4 text-center ">
            <div className="position-relative">
              <Image
                src={image}
                className="img-fluid img-rounded mb-sm-30"
                alt=""
                style={{ width: "90%" }}
              />

              {props.event === "buy" || props.event === "sales" ? (
                <Image
                  src={onSales}
                  className="onSales position-absolute"
                  alt="onSales"
                />
              ) : null}

              <Image
                src={
                  level === "1"
                    ? levelOne
                    : level === "2"
                    ? levelTwo
                    : level === "3"
                    ? levelThree
                    : null
                }
                className="level-icon-detail"
                alt="level"
              />
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="item_info p-0">
              <h2>{tokenName(image)}</h2>
              {props.event === "buy" || props.event === "sales" ? (
                <Row className="mb-1">
                  <Col>
                    <h5 className="text-price float-left">
                      {weiValue}{" "}
                      {marketItem.tokenAddress === spalAddress
                        ? "SPAL"
                        : marketItem.tokenAddress === spaceShardAddress
                        ? "SpaceShard"
                        : null}
                    </h5>
                    <p className="text-white float-right">
                      $ {convertToUSD(marketItem.price)}
                    </p>
                  </Col>
                </Row>
              ) : (
                <></>
              )}
              <div className="bg-purple mb-4">
                <Row>
                  <Col>
                    <p className="text-white float-left">{t("level.label")}</p>
                    <p className="text-white float-right">{level}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="text-white float-left m-0">
                      {t("rarity.label")}
                    </p>
                    <p className="text-white float-right m-0">
                      {rarity === "1" ? (
                        <>{t("legendary.label")}</>
                      ) : rarity === "2" ? (
                        <>{t("epic.label")}</>
                      ) : rarity === "3" ? (
                        <>{t("rare.label")}</>
                      ) : rarity === "4" ? (
                        <>{t("uncommon.label")}</>
                      ) : rarity === "5" ? (
                        <> {t("common.label")}</>
                      ) : null}
                    </p>
                  </Col>
                </Row>
              </div>

              <div className="de_tab">
                <ul className="de_nav">
                  <li id="mainbtn" className="active">
                    <span onClick={handleBtnClick}>{t("details.label")}</span>
                  </li>
                  <li id="mainbtn1" className="">
                    <span onClick={handleBtnClick1}>
                      {t("transactionHistory.label")}
                    </span>
                  </li>
                </ul>

                <div className="de_tab_content">
                  {/* DETAILS */}
                  {openMenu && (
                    <div className="tab-1 onStep fadeIn">
                      <h5 className="mb-4">
                        {t("tokenID.label")} :{" "}
                        {props.event === "sales" || props.event === "buy"
                          ? marketItem.tokenId
                          : props.nftId}
                      </h5>
                      <p className="p-text">{`${t("NFT.label")} ${t(
                        "contractNo.label"
                      )}`}</p>
                      <p
                        className="text-price mb-4 text-break"
                        style={{ fontSize: "larger" }}
                      >
                        {nftContractAddress}
                      </p>
                      <p className="p-text">{t("ownerAddress.label")}</p>
                      <p
                        className="text-price text-break"
                        style={{ fontSize: "larger" }}
                      >
                        {ownerAddress}
                      </p>
                    </div>
                  )}

                  {/* TRANSACTION HISTORY */}
                  {openMenu1 && (
                    <div className="tab-2 onStep fadeIn">
                      <table className="table de-table table-rank">
                        <thead>
                          <tr className="tr-bg-purple">
                            <th scope="col">{t("event.label")}</th>
                            <th scope="col">{t("price.label")}</th>
                            <th scope="col">{t("hash.label")}</th>
                            <th scope="col">{t("from.label")}</th>
                            <th scope="col">{t("to.label")}</th>
                            <th scope="col">{t("date.label")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Buy</td>
                            <td>70 SPAL</td>
                            <td>0xbB2...0515</td>
                            <td>0xbB2...0515</td>
                            <td>0xbB2...0515</td>
                            <td>
                              2022-01-08
                              <br />
                              06:57:18
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {props.event === "buy" ? (
                  <Row>
                    <Col md="auto">
                      <div
                        id="loadingbuy"
                        className="btn btn-purple"
                        style={{ display: "none" }}
                      >
                        <span style={{ margin: "auto 8px" }}>
                          {t("loading.label")}
                        </span>
                        <ClipLoader
                          loading={loading}
                          css={override}
                          size={17}
                        />
                      </div>

                      {marketItem.tokenAddress === spalAddress &&
                      marketSPAL === "0" ? (
                        <Button
                          id="approveSPAL"
                          className="btn btn-purple mt-2"
                          onClick={approveMarketSPAL}
                          style={{ display: "block" }}
                        >
                          {t("approve.label")}
                        </Button>
                      ) : marketItem.tokenAddress === spaceShardAddress &&
                        marketspaceshard === "0" ? (
                        <Button
                          id="approveSpaceshard"
                          className="btn btn-purple mt-2"
                          onClick={approveMarketSpaceShard}
                          style={{ display: "block" }}
                        >
                          {t("approve.label")}
                        </Button>
                      ) : (
                        <Button
                          id="buybtn"
                          className="btn btn-purple mt-2"
                          onClick={() => {
                            buyNFT(marketItem.price, marketItem.tokenAddress);
                          }}
                          style={{ display: "block" }}
                        >
                          {t("buy.label")}
                        </Button>
                      )}

                      <Button
                        id="approvedbuybtn"
                        className="btn btn-purple mt-2"
                        onClick={() => {
                          buyNFT(marketItem.price, marketItem.tokenAddress);
                        }}
                        style={{ display: "none" }}
                      >
                        {t("buy.label")}
                      </Button>
                    </Col>
                  </Row>
                ) : props.event === "sales" ? (
                  <div id="sales">
                    <Row className="mt-2">
                      <Col md="auto">
                        <Button
                          // id="approvebtn"
                          className="btn btn-purple"
                          onClick={() => {
                            handleShowUpdateModal();
                          }}
                        >
                          {t("updatePrice.label")}
                        </Button>
                      </Col>
                      <Col md="auto">
                        <Button
                          // id="approvebtn"
                          className="btn btn-blue"
                          onClick={() => {
                            handleShowCancelModal();
                          }}
                        >
                          {t("cancelSales.label")}
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <>
                    {approved === nullAddress ? (
                      <Row>
                        <Col md="auto">
                          <div
                            id="loading"
                            className="btn btn-purple"
                            style={{ display: "none" }}
                          >
                            <span style={{ margin: "auto 8px" }}>
                              {t("loading.label")}
                            </span>
                            <ClipLoader
                              loading={loading}
                              css={override}
                              size={17}
                            />
                          </div>

                          <Button
                            id="approvebtn"
                            className="btn btn-purple mt-2"
                            onClick={approve}
                          >
                            {t("approve.label")}
                          </Button>
                        </Col>
                      </Row>
                    ) : (
                      <Row className="mt-2">
                        <Col md="auto">
                          <Button
                            className="btn btn-purple"
                            onClick={() => {
                              handleShowSellModal();
                            }}
                          >
                            {t("sell.label")}
                          </Button>
                        </Col>
                        <Col md="auto">
                          <Button
                            className="btn btn-blue"
                            onClick={() => {
                              handleShowGiftModal();
                            }}
                          >
                            {t("gift.label")}
                          </Button>
                        </Col>

                        {renderLevel()}
                      </Row>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SELL NFT */}
      <Modal show={modalState === "sellNFTModal"} onHide={handleClose}>
        <Modal.Body className="nft_shadow text-center text-white">
          <Image src={selling} style={{ width: "35%" }} />
          <Row className="justify-content-end mb-3">
            <Image
              src={closeIcon}
              onClick={handleClose}
              style={{ width: "9%", cursor: "pointer" }}
            />
          </Row>
          <Row className="justify-content-center">
            <Col md={4} className="position-relative">
              <img
                src={image}
                className="img-fluid img-rounded mb-sm-30"
                alt=""
              />

              <img
                src={
                  level === "1"
                    ? levelOne
                    : level === "2"
                    ? levelTwo
                    : level === "3"
                    ? levelThree
                    : null
                }
                className="modal-level-icon"
                alt="level"
              />
            </Col>
            <Col md={7}>
              <Row>
                <Col>
                  <p className="float-left">{t("setPrice.label")}</p>
                  <p className="float-right">-${convertToUSD(sellingPrice)}</p>
                </Col>
              </Row>
              <div className="position-relative">
                <input
                  type="number"
                  className="form-control tr-bg-purple"
                  placeholder={`${t("enter.label")} ${t("price.label")}`}
                  onChange={(e) => {
                    setSellingPrice(e.target.value);
                  }}
                />
                <select
                  className="classic form-control token-select"
                  onChange={(e) => {
                    let value = e.target.value;
                    setToken(value);
                    if (value === 0) {
                      setToken(spalAddress);
                    } else {
                      setToken(spaceShardAddress);
                    }
                  }}
                >
                  {tokenOption.map((option, optionIndex) => {
                    return (
                      <option
                        value={option.value}
                        key={`option_state_${optionIndex}`}
                      >
                        {option.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="text-left mb-4 sell-NFT">
                <p className="m-0">
                  {`${t("sell.label")} ${t("NFT.label")}`} :
                </p>
                <p className="m-0">1. {t("sell1.label")}</p>
                <p className="m-0">2. {t("sell2.label")}</p>
                <p className="m-0">3. {t("sell3.label")}</p>
              </div>
              <div
                id="loadingSell"
                className="btn btn-purple"
                style={{ display: "none" }}
              >
                <span style={{ margin: "auto 8px" }}>{t("loading.label")}</span>
                <ClipLoader loading={loading} css={override} size={17} />
              </div>
              {/* CHECK APPROVE FOR CHOSEN TOKEN */}
              {token === spalAddress && spalApproved === nullAddress ? (
                <Button
                  id="approveSPAL"
                  className="btn btn-purple mt-2"
                  onClick={approveSPAL}
                >
                  {t("approve.label")}
                </Button>
              ) : token === spaceShardAddress &&
                spaceshardApproved === nullAddress ? (
                <Button
                  id="approveSpaceshard"
                  className="btn btn-purple mt-2"
                  onClick={approveSpaceShard}
                >
                  {t("approve.label")}
                </Button>
              ) : (
                <Button
                  id="sellbtn"
                  className="btn btn-purple"
                  onClick={createMarketItem}
                >
                  {t("confirm.label")}
                </Button>
              )}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* GIFT NFT */}
      <Modal show={modalState === "giftNFTModal"} onHide={handleClose}>
        <Modal.Body className="nft_shadow text-center text-white">
          <Image src={gifting} style={{ width: "45%" }} />
          <Row className="justify-content-end mb-3">
            <Image
              src={closeIcon}
              onClick={handleClose}
              style={{ width: "9%", cursor: "pointer" }}
            />
          </Row>
          <Row className="justify-content-center">
            <Col md={4} className="position-relative">
              <img
                src={image}
                className="img-fluid img-rounded mb-sm-30"
                alt=""
              />

              <img
                src={
                  level === "1"
                    ? levelOne
                    : level === "2"
                    ? levelTwo
                    : level === "3"
                    ? levelThree
                    : null
                }
                className="gift-level-icon"
                alt="level"
              />
            </Col>
            <Col md={7}>
              <p className="text-left">{t("address.label")}</p>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control tr-bg-purple"
                  placeholder={`${t("enter.label")} ${t(
                    "recipientAddress.label"
                  )}`}
                  onChange={(e) => {
                    setRecipientAddress(e.target.value);
                  }}
                />
              </div>
              <div className="text-left mb-4 sell-NFT">
                <p className="m-0">{t("gifting1.label")}</p>
                <p className="m-0">{t("gifting2.label")}:</p>
                <p className="m-0">1. {t("gifting3.label")}</p>
              </div>
              <div
                id="loadingGift"
                className="btn btn-purple"
                style={{ display: "none" }}
              >
                <span style={{ margin: "auto 8px" }}>{t("loading.label")}</span>
                <ClipLoader loading={loading} css={override} size={17} />
              </div>
              <Button id="giftbtn" className="btn btn-purple" onClick={giftNFT}>
                {t("confirm.label")}
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* UPDATE PRICE */}
      <Modal show={modalState === "updateNFTPrice"} onHide={handleClose}>
        <Modal.Body className="nft_shadow text-center text-white">
          <Image src={updatePriceTitle} style={{ width: "45%" }} />
          <Row className="justify-content-end mb-3">
            <Image
              src={closeIcon}
              onClick={handleClose}
              style={{ width: "9%", cursor: "pointer" }}
            />
          </Row>
          <Row className="justify-content-center">
            <Col md={4} className="position-relative">
              <img
                src={image}
                className="img-fluid img-rounded mb-sm-30"
                alt=""
              />

              <img
                src={
                  level === "1"
                    ? levelOne
                    : level === "2"
                    ? levelTwo
                    : level === "3"
                    ? levelThree
                    : null
                }
                className="modal-level-icon"
                alt="level"
              />
            </Col>
            <Col md={7}>
              <p className="text-left mb-2">{t("currentPrice.label")}</p>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control tr-bg-purple"
                  placeholder={weiValue}
                  disabled
                />
                <p className="spal-select">
                  {marketItem.tokenAddress === spalAddress
                    ? "SPAL"
                    : marketItem.tokenAddress === spaceShardAddress
                    ? "SpaceShard"
                    : null}
                </p>
              </div>
              <p className="text-left mb-2">{t("newPrice.label")}</p>
              <div className="position-relative">
                <input
                  type="number"
                  className="form-control tr-bg-purple"
                  placeholder={`${t("enter.label")} ${t("newPrice.label")}`}
                  onChange={(e) => {
                    setNewPrice(e.target.value);
                  }}
                />
                <p className="spal-select">
                  {marketItem.tokenAddress === spalAddress
                    ? "SPAL"
                    : marketItem.tokenAddress === spaceShardAddress
                    ? "SpaceShard"
                    : null}
                </p>
              </div>
              <div className="spacer-20"></div>

              <div
                id="loadingUpdate"
                className="btn btn-purple"
                style={{ display: "none" }}
              >
                <span style={{ margin: "auto 8px" }}>{t("loading.label")}</span>
                <ClipLoader loading={loading} css={override} size={17} />
              </div>

              <Button
                id="updatebtn"
                className="btn btn-purple"
                onClick={updatePrice}
              >
                {t("confirm.label")}
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* CANCEL SALES */}
      <Modal show={modalState === "cancelSalesModal"} onHide={handleClose}>
        <Modal.Body className="nft_shadow text-center text-white">
          <Image src={cancelSalesTitle} style={{ width: "45%" }} />
          <p className="cancel-confirm m-0">
            {`${t("cancelSalesConfirmation.label")}${t("token.label")}`}{" "}
            {marketItem.tokenId} ?
          </p>
          <Row className="justify-content-center">
            <div className="col-6 col-md-auto">
              <div
                id="loadingCancel"
                className="btn btn-purple"
                style={{ display: "none" }}
              >
                <span style={{ margin: "auto 8px" }}>{t("loading.label")}</span>
                <ClipLoader loading={loading} css={override} size={17} />
              </div>

              <Button
                id="cancelbtn"
                className="btn btn-purple"
                onClick={cancelSales}
              >
                {t("yes.label")}
              </Button>
            </div>
            <div className="col-6 col-md-3">
              <Button className="btn btn-purple" onClick={handleClose}>
                {t("no.label")}
              </Button>
            </div>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default NFTDetail;
