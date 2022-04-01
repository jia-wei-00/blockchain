import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import loadingImage from "../../assets/img/loading.png";
import loadingShadow from "../../assets/img/loading-shadow.png";
import mysteryBackground from "../../assets/img/mystery-bg.png";
import mysteryBoxTitle from "../../assets/img/title/Mystery-box.png";
import box from "../../assets/img/Box.png";
import { Row, Col, Button, Modal, Image } from "react-bootstrap";
import levelOne from "../../assets/img/marketplace/Level-1.png";
import levelTwo from "../../assets/img/marketplace/Level-2.png";
import levelThree from "../../assets/img/marketplace/Level-3.png";
import { fetchData } from "../../redux/data/dataActions";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import CountDownTimer from "./countdown";
import useSharableState from "../../../src/SharableState.js";
import { useBetween } from "use-between";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Web3Modal from "web3modal";
import { connect } from "../../redux/blockchain/blockchainActions";

//CONNECT
const providerOptions = {
  walletconnect: {
    options: {
      rpc: {
        56: "https://bsc-dataseed.binance.org/",
      },
      network: "binance",
    },
  },
};

var Web3 = require("web3");
const web3Modal = new Web3Modal({
  network: "binance", // replace mainnet to binance
  cacheProvider: true, // optional
  providerOptions, // required
});

(async () => {
  try {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider); // eslint-disable-line
  } catch (err) {}
})();

// LOADER
const override = css`
  border-bottom-color: transparent !important;
  border-color: #ffffff;
  top: 2px;
`;

const MysteryBox = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState("");
  const blockchain = useSelector((state) => state.blockchain);
  // console.log("blockchain", blockchain);
  const data = useSelector((state) => state.data);
  // console.log("data", data);
  const [loading, setLoading] = useState(false);
  const [nftDetails, setNFTDetails] = useState("");
  const [nftImage, setNFTImage] = useState("");
  const { rate } = useBetween(useSharableState);
  // GLOBAL STATE
  const { nftContractAddress } = useBetween(useSharableState);
  const [approved, setApproved] = useState("");
  const [spaceshardApproved, setSpaceShardApproved] = useState("");

  const weiValue = Web3.utils.fromWei(data.getSpalBalance, "ether");
  let convertRate = weiValue / rate;
  let balance = convertRate.toFixed(2);
  let price = (250 * rate).toFixed(2);
  let mintPrice = Web3.utils.toWei(String(price), "ether");
  let hash = Web3.utils.sha3(Web3.utils.toHex(mintPrice), {encoding:"hex"});
  let speedUpPrice = Web3.utils.toWei(String(10), "ether");
  let tmp_hashedValue = Web3.utils.toWei(String(1), "ether") + Web3.utils.toWei(String(1), "ether") + 1111;
  let hashedValue = Web3.utils.sha3(tmp_hashedValue, { encoding: "hex" });
  console.log ("1", hashedValue)
  let tmp_hashedValue2 = Web3.utils.toWei(String(1), "ether") + 1111;
  let hashedValue2 = Web3.utils.sha3(tmp_hashedValue2, { encoding: "hex" });
  console.log ("2", hashedValue2)

  const image = [
    "http://localhost:3000/img/marketplace/1.png",
    "http://localhost:3000/img/marketplace/2.png",
    "http://localhost:3000/img/marketplace/3.png",
    "http://localhost:3000/img/marketplace/4.png",
    "http://localhost:3000/img/marketplace/5.png",
  ];

  //CALCULATE REMAINING TIME
  let hoursMinSecs;
  let hours;
  let minutes;
  let seconds;
  const calculateCountdown = (nftId, createdTime, checkUnboxTime) => {
    //GET CURRENT TIMESTAMP
    var currentTimeInSeconds = Math.floor(Date.now() / 1000);
    var date2 = new Date(createdTime * 1000);
    var date1 = new Date(currentTimeInSeconds * 1000);
    var difference = date1.getTime() - date2.getTime();
    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;
    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;
    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;
    var secondsDifference = difference / 1000;

    hours = 24 - hoursDifference;
    minutes = 60 - minutesDifference;
    seconds = 60 - secondsDifference;

    if (hours === 24 && minutes === 60 && seconds === 60) {
      hours = 23;
      minutes = 59;
      seconds = 59;
    } else if (hours === 24 && minutes === 60) {
      hours = 23;
      minutes = 59;
    } else if (hours === 24) {
      hours = 23;
    }

    //CHECK SPEEDUP
    var speedUpStatus = currentTimeInSeconds - checkUnboxTime;
    if (speedUpStatus > 86400) {
      hoursMinSecs = { hours: 0, minutes: 0, seconds: 0 };
    } else {
      hoursMinSecs = {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    }
  };

  const renderButton = (checkUnboxTime, nftId) => {
    const display = [];
    var currentTimeInSeconds = Math.floor(Date.now() / 1000);
    var speedUpStatus = currentTimeInSeconds - checkUnboxTime;
    if (speedUpStatus > 86400) {
      display.push(
        <Button
          id={`openbtn${nftId}`}
          className="btn btn-blue btn-height"
          onClick={() => {
            handleShowModal(nftId);
          }}
        >
          {t("open.label")}
        </Button>
      );
    } else {
      if (spaceshardApproved === "0") {
        display.push(
          <>
            <div
              id="loadingSpaceshardbtn"
              className="btn btn-purple btn-padding"
              style={{ display: "none" }}
            >
              <span style={{ margin: "auto 8px" }}>{t("loading.label")}</span>
              <ClipLoader loading={loading} css={override} size={17} />
            </div>
            <Button
              id="approveSpaceshardbtn"
              className="btn btn-purple btn-padding"
              onClick={() => {
                approveSpaceShard(nftId);
              }}
            >
              {t("approve.label")}
            </Button>
          </>
        );
      } else {
        display.push(
          <Button
            id={`speedbtn${nftId}`}
            className="btn btn-yellow btn-height"
            onClick={() => {
              speedUp(nftId);
            }}
          >
            {t("speedUp.label")}
          </Button>
        );
      }
    }
    return display;
  };

  //SPEED UP
  const speedUp = (nftId) => {
    setLoading(true);
    document.getElementById("loadingbtn" + nftId).style.display = "block";
    document.getElementById("speedbtn" + nftId).style.display = "none";
    blockchain.nftToken.methods
      // .speedUp(nftId, speedUpPrice)
      .speedUp(nftId, 1000000)
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        document.getElementById("loadingbtn" + nftId).style.display = "none";
        document.getElementById("speedbtn" + nftId).style.display = "block";
      })
      .then((receipt) => {
        setLoading(false);
        document.getElementById("loadingbtn" + nftId).style.display = "none";
        document.getElementById("speedbtn" + nftId).style.display = "none";
        document.getElementById("openbtn" + nftId).style.display = "block";
        window.location.reload();
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

  //OPEN BOX FUNCTION AND SHOW MODAL
  const handleShowModal = (nftId) => {
    setLoading(true);
    document.getElementById("loadingbtn" + nftId).style.display = "block";
    document.getElementById("openbtn" + nftId).style.display = "none";
    blockchain.nftToken.methods
      .openBox(nftId)
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        document.getElementById("loadingbtn" + nftId).style.display = "none";
        document.getElementById("openbtn" + nftId).style.display = "block";
      })
      .then((receipt) => {
        setLoading(false);
        document.getElementById("loadingbtn" + nftId).style.display = "none";
        document.getElementById("openbtn" + nftId).style.display = "block";
        fetchNFTDetails(nftId);
        fetchNFTURI(nftId);
        setModalState("goToNFT");
      });
  };

  //APPROVE SPAL
  const approveSPAL = () => {
    document.getElementById("loadingbtn").style.display = "block";
    document.getElementById("approvebtn").style.display = "none";
    setLoading(true);
    blockchain.spal.methods
      .approve(nftContractAddress, Web3.utils.toWei("1000000000", "ether"))
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        document.getElementById("loadingbtn").style.display = "none";
        document.getElementById("approvebtn").style.display = "block";
      })
      .then((receipt) => {
        setLoading(false);
        document.getElementById("loadingbtn").style.display = "none";
        document.getElementById("buybtn").style.display = "block";
      });
  };

  //APPROVE SPACESHARD
  const approveSpaceShard = () => {
    document.getElementById("loadingSpaceshardbtn").style.display = "block";
    document.getElementById("approveSpaceshardbtn").style.display = "none";
    setLoading(true);
    blockchain.spaceShard.methods
      .approve(nftContractAddress, Web3.utils.toWei("1000000000", "ether"))
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        document.getElementById("loadingSpaceshardbtn").style.display = "none";
        document.getElementById("approveSpaceshardbtn").style.display = "block";
      })
      .then((receipt) => {
        setLoading(false);
        document.getElementById("loadingSpaceshardbtn").style.display = "none";
        // document.getElementById("approveSpaceshardbtn").style.display = "block";
        // window.location.reload();
        document.getElementById("speedbtn").style.display = "none";
      });
  };

  //CHECK SPAL APPROVE
  const checkSPAL = () => {
    blockchain.spal.methods
      .allowance(blockchain.account, nftContractAddress)
      .call({ from: blockchain.account })
      .then((receipt) => {
        console.log("checkSPALApprove", receipt);
        setApproved(receipt);
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

  //MINT NFT
  const mintNFT = () => {
    setLoading(true);
    document.getElementById("loadingbtn").style.display = "block";
    document.getElementById("buybtn").style.display = "none";
    console.log(balance, price);
    if (balance > price) {
      let randImage = Math.floor(Math.random() * image.length);
      blockchain.nftToken.methods
        .mintNFT(mintPrice, hash)
        .send({ from: blockchain.account })
        .once("error", (err) => {
          console.log(err);
          setLoading(false);
          document.getElementById("loadingbtn").style.display = "none";
          document.getElementById("buybtn").style.display = "block";
        })
        .then((receipt) => {
          setLoading(false);
          document.getElementById("loadingbtn").style.display = "none";
          document.getElementById("buybtn").style.display = "block";
          window.location.reload();
        });
    } else {
      document.getElementById("loadingbtn").style.display = "none";
      document.getElementById("buybtn").style.display = "block";
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Warning",
        text: t("insufficientBalance.label"),
        icon: "warning",
      });
    }
  };

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.nftToken != null) {
      dispatch(fetchData(blockchain.account));
      checkSPAL();
      checkSpaceShard();
    }
  }, [blockchain.nftToken]);

  return (
    <div
      className="bg-image"
      style={{ backgroundImage: `url(${mysteryBackground})` }}
    >
      <section className="container">
        <Row className="justify-content-center mt-2">
          <div
            className="col-md-5 nft__item nft_shadow text-center"
            style={{ borderRadius: "20px", padding: "30px 50px" }}
          >
            <Row className="justify-content-center">
              <Image src={loadingShadow} style={{ width: "80%" }} />
            </Row>
            <h3 className="text-price m-0 mb-2">{price} SPAL</h3>
            <p>
              {t("availableBalance.label")} : {balance} SPAL
            </p>

            <div
              id="loadingbtn"
              className="btn btn-purple"
              style={{ display: "none" }}
            >
              <span style={{ margin: "auto 8px" }}>{t("loading.label")}</span>
              <ClipLoader loading={loading} css={override} size={17} />
            </div>

            {approved !== null && approved !== "0" ? (
              <Button
                id="buybtn"
                className="btn btn-purple mb-2"
                onClick={mintNFT}
              >
                {t("buy.label")}
              </Button>
            ) : (
              <>
                <Button
                  id="approvebtn"
                  className="btn btn-purple "
                  onClick={approveSPAL}
                >
                  {t("approve.label")}
                </Button>
                <Button
                  id="buybtn"
                  className="btn btn-purple mb-2"
                  onClick={mintNFT}
                  style={{ display: "none" }}
                >
                  {t("buy.label")}
                </Button>
              </>
            )}
          </div>
        </Row>
        <div className="spacer-20"></div>

        <Row>
          {data.allOwnerNFT.length > 0 ? (
            data.allOwnerNFT.map((nft, index) => {
              //NFT THAT ALREADY REVEALED AND HAVENT BEEN STAKE
              if (nft.revealed === false) {
                calculateCountdown(
                  nft.nextId,
                  nft.createdtime,
                  nft.checkUnboxTime
                );
                return (
                  <div
                    key={index}
                    className="col-lg-4 col-md-6 col-sm-6 col-xs-12 d-flex mb-4 p-0 justify-content-center"
                  >
                    <Image src={loadingImage} style={{ width: "38%" }} />
                    <div
                      className="position-relative"
                      style={{ alignSelf: "flex-end" }}
                    >
                      <Image src={box} />
                      <div className="position-absolute countdown-box text-center">
                        <div className="justify-content-around d-flex">
                          <h5>-</h5>
                          <h5>-</h5>
                          <h5>-</h5>
                        </div>
                        <p className="m-0">{t("countdown.label")}</p>
                        <CountDownTimer hoursMinSecs={hoursMinSecs} />
                        <div
                          id={`loadingbtn${nft.nextId}`}
                          className="btn btn-purple btn-padding"
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
                        {renderButton(nft.checkUnboxTime, nft.nextId)}
                        <Button
                          id="speedbtn"
                          className="btn btn-yellow btn-height"
                          onClick={() => {
                            speedUp(nft.nextId);
                          }}
                          style={{ display: "none" }}
                        >
                          {t("speedUp.label")}
                        </Button>
                        <Button
                          id={`openbtn${nft.nextId}`}
                          className="btn btn-blue btn-height"
                          onClick={() => {
                            handleShowModal(nft.nextId);
                          }}
                          style={{ display: "none" }}
                        >
                          {t("open.label")}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })
          ) : (
            <></>
          )}
        </Row>
      </section>

      {/* GO TO NFT MODAL*/}
      <Modal show={modalState === "goToNFT"} dialogClassName="mysteryBox">
        <Modal.Body className="nft_shadow text-center text-white">
          <Image src={mysteryBoxTitle} style={{ width: "45%" }} />
          <Row className="justify-content-center">
            <Row className="justify-content-center mt-3">
              <Col md={5}>
                <div className="position-relative">
                  <Image
                    src={nftImage}
                    className="img-fluid img-rounded mb-sm-30"
                    alt=""
                  />
                  <Image
                    src={
                      nftDetails.level === "1"
                        ? levelOne
                        : nftDetails.level === "2"
                        ? levelTwo
                        : nftDetails.level === "3"
                        ? levelThree
                        : null
                    }
                    className="modal-level-icon"
                    alt="level"
                  />
                </div>
              </Col>
            </Row>
            <Col md={6}>
              <Link
                className="btn btn-purple mt-4"
                to={`/nftDetail/${nftDetails.nextId}`}
              >
                {`${t("goTo.label")} ${t("NFT.label")}`}
              </Link>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MysteryBox;
