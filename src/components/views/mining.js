import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import levelOne from "../../assets/img/marketplace/Level-1.png";
import levelTwo from "../../assets/img/marketplace/Level-2.png";
import levelThree from "../../assets/img/marketplace/Level-3.png";
import nftBackground from "../../assets/img/mystery-bg.png";
import stakeCard from "../../assets/img/title/Stake.png";
import unstakeCard from "../../assets/img/title/Unstake.png";
import { Row, Col, Image, Button, Modal } from "react-bootstrap";
// import box from "../../assets/img/Box.png";
import box from "../../assets/img/statusbg.png";
import level from "../../assets/img/level.png";
import status from "../../assets/img/status.png";
import rarity from "../../assets/img/rarity.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/data/dataActions";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import useSharableState from "../../../src/SharableState.js";
import { useBetween } from "use-between";

// LOADER
const override = css`
  border-bottom-color: transparent !important;
  border-color: #ffffff;
  top: 2px;
`;

const Mining = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState("");
  const [nftId, setNftId] = useState("");
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  // console.log(blockchain);
  console.log(data.allOwnerNFT);
  const [loading, setLoading] = useState(false);
  const [spaceshardApproved, setSpaceShardApproved] = useState("");

  // GLOBAL STATE
  const { nftContractAddress } = useBetween(useSharableState);
  let nullAddress = "0x0000000000000000000000000000000000000000";
  var Web3 = require("web3");

  //APPROVE SPACESHARD
  const approve = () => {
    document.getElementById("loadingApprove" + nftId).style.display = "block";
    document.getElementById("approvebtn" + nftId).style.display = "none";
    setLoading(true);
    blockchain.spaceShard.methods
      .approve(nftContractAddress, Web3.utils.toWei("1000000000", "ether"))
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        document.getElementById("loadingApprove" + nftId).style.display =
          "none";
        document.getElementById("approvebtn" + nftId).style.display = "block";
      })
      .then((receipt) => {
        setLoading(false);
        document.getElementById("loadingApprove" + nftId).style.display =
          "none";
        document.getElementById("approvebtn" + nftId).style.display = "none";
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

  //STAKE MODAL
  const handleShowStake = (nftId) => {
    setNftId(nftId);
    setModalState("stakeModal");
  };

  //UNSTAKE MODAL
  const handleShowUnstake = (nftId) => {
    setNftId(nftId);
    setModalState("unstakeModal");
  };

  const handleClose = () => {
    setModalState("close");
  };

  //RENDER STAKE UNSTAKE
  const renderStakeUnstake = (nftId, staking) => {
    const display = [];

    if (spaceshardApproved === nullAddress) {
      display.push(
        <Button
          id={`approvebtn${nftId}`}
          className="btn btn-purple btn-height"
          onClick={() => {
            approve(nftId);
          }}
        >
          {t("approveContract.label")}
        </Button>
      );
    } else {
      if (staking === true) {
        display.push(
          <Button
            id={`unstakebtn${nftId}`}
            className="btn btn-purple btn-height"
            onClick={() => {
              handleShowUnstake(nftId);
            }}
          >
            {t("unstake.label")}
          </Button>
        );
      } else {
        display.push(
          <Button
            id={`stakebtn${nftId}`}
            className="btn btn-purple btn-height"
            onClick={() => {
              handleShowStake(nftId);
            }}
          >
            {t("stake.label")}
          </Button>
        );
      }
    }

    return display;
  };

  //HANDLE STAKE
  const handleStake = () => {
    console.log("handleStake", nftId);
    document.getElementById("loading" + nftId).style.display = "block";
    document.getElementById("yesbtn").style.display = "none";
    setLoading(true);
    blockchain.nftToken.methods
      .stake(nftId)
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        setModalState("close");
        document.getElementById("loading" + nftId).style.display = "none";
        document.getElementById("yesbtn").style.display = "block";
      })
      .then((receipt) => {
        setLoading(false);
        setModalState("close");
        document.getElementById("loading" + nftId).style.display = "none";
        document.getElementById("unstakebtn" + nftId).style.display = "block";
        document.getElementById("stakebtn" + nftId).style.display = "none";
      });
  };

  //HANDLE UNSTAKE
  const handleUnstake = () => {
    console.log("handleUnstake", nftId);

    document.getElementById("loading" + nftId).style.display = "block";
    document.getElementById("yesbtn").style.display = "none";
    setLoading(true);
    blockchain.nftToken.methods
      .unstake(nftId)
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        setModalState("close");
        document.getElementById("loading" + nftId).style.display = "none";
        document.getElementById("yesbtn").style.display = "block";
      })
      .then((receipt) => {
        setLoading(false);
        setModalState("close");
        document.getElementById("loading" + nftId).style.display = "none";
        document.getElementById("unstakebtn" + nftId).style.display = "none";
        document.getElementById("stakebtn" + nftId).style.display = "block";
      });
  };

  //HARVEST
  const harvest = (nftId) => {
    console.log("harvest", nftId);
  };

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.nftToken != null) {
      dispatch(fetchData(blockchain.account));
      checkSpaceShard();
    }
  }, [blockchain.nftToken]);

  let totalAlpaca = 0;
  let mining = 0;
  for (var i = 0; i < data.allOwnerNFT.length; i++) {
    if (data.allOwnerNFT[i].revealed === true) {
      totalAlpaca++;
    } else if (
      data.allOwnerNFT[i].revealed === true &&
      data.allOwnerNFT[i].staking === true
    ) {
      mining++;
    }
  }

  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: `url(${nftBackground})`,
        backgroundSize: "cover",
      }}
    >
      <section className="container">
        <Row className="justify-content-center">
          <div className="spacer-20"></div>
          <h4 className="text-shadow-title mb-4">{`${t("NFT.label")} ${t(
            "mining.label"
          )}`}</h4>

          {/* COUNT */}
          <Row className="p-0">
            <div className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4">
              <div
                className="nft__item m-0 nft_shadow"
                style={{ borderRadius: "10px" }}
              >
                <div className="nft__item_info">
                  <Row>
                    <Col>
                      <h3 className="text-shadow-title m-0 float-left">
                        {t("totalAlpaca.label")}
                      </h3>
                      <h3 className="text-shadow-title m-0 float-right">
                        : {totalAlpaca}
                      </h3>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4">
              <div
                className="nft__item m-0 nft_shadow"
                style={{ borderRadius: "10px" }}
              >
                <div className="nft__item_info">
                  <Row>
                    <Col>
                      <h3 className="text-shadow-title m-0 float-left">
                        {t("mining.label")}
                      </h3>
                      <h3 className="text-shadow-title m-0 float-right">
                        : {mining}
                      </h3>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4">
              <div
                className="nft__item m-0 nft_shadow"
                style={{ borderRadius: "10px" }}
              >
                <div className="nft__item_info">
                  <Row>
                    <Col>
                      <h3 className="text-shadow-title m-0 float-left">
                        {t("idle.label")}
                      </h3>
                      <h3 className="text-shadow-title m-0 float-right">
                        : {totalAlpaca}
                      </h3>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Row>

          {/* NFT */}
          <Row className="p-0">
            {data.allOwnerNFT.length > 0 ? (
              data.allOwnerNFT.map((nft, index) => {
                if (nft.revealed === true) {
                  return (
                    <div
                      key={index}
                      className="col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 d-flex justify-content-center"
                    >
                      <div
                        className="position-relative"
                        style={{ alignSelf: "flex-end" }}
                      >
                        <Image src={nft.tokenURI} className="w-100" />
                        <Image
                          src={
                            nft.level === "1"
                              ? levelOne
                              : nft.level === "2"
                              ? levelTwo
                              : nft.level === "3"
                              ? levelThree
                              : null
                          }
                          className="mining-level-icon"
                          alt="level"
                        />
                      </div>

                      <div
                        className="position-relative"
                        style={{ alignSelf: "flex-end" }}
                      >
                        <Image
                          src={box}
                          className="box-w"
                          style={{ width: "225px", height: "211px" }}
                        />
                        <div
                          className="position-absolute countdown-box"
                          style={{ padding: "5px 15px 10px" }}
                        >
                          <div className="row" style={{ padding: "10px" }}>
                            <div className="col-4 p-0 text-center ">
                              <Image src={status} style={{ width: "35px" }} />
                              {nft.staking === false ? (
                                <p className="text-white m-0 mt-1">
                                  {t("idle.label")}
                                </p>
                              ) : (
                                <p>{t("mining.label")}</p>
                              )}
                            </div>

                            <div className="col-4 p-0 text-center">
                              <Image src={rarity} style={{ width: "35px" }} />
                              <p className="text-white m-0 mt-1">
                                {nft.rarity === "1" ? (
                                  <>{t("legendary.label")}</>
                                ) : nft.rarity === "2" ? (
                                  <>{t("epic.label")}</>
                                ) : nft.rarity === "3" ? (
                                  <>{t("rare.label")}</>
                                ) : nft.rarity === "4" ? (
                                  <>{t("uncommon.label")}</>
                                ) : nft.rarity === "5" ? (
                                  <> {t("common.label")}</>
                                ) : null}
                              </p>
                            </div>

                            <div className="col-4 p-0 text-center">
                              <Image src={level} style={{ width: "35px" }} />
                              <p className="text-white m-0 mt-1">{nft.level}</p>
                            </div>
                          </div>
                          <hr className="m-0" />

                          <p
                            className="m-0 mt-2 text-white"
                            style={{ fontSize: "smaller" }}
                          >
                            {t("spaceShardFarmed.label")}
                          </p>
                          <div className="d-flex justify-content-between mb-3">
                            <h5
                              className="text-white m-0"
                              style={{
                                fontWeight: "bold",
                                alignSelf: "center",
                              }}
                            >
                              0
                            </h5>
                            <Button
                              className="harvest-btn btn btn-blue "
                              onClick={() => {
                                harvest(nft.nextId);
                              }}
                              disabled={
                                spaceshardApproved === nullAddress
                                  ? true
                                  : false
                              }
                            >
                              {t("harvest.label")}
                            </Button>
                          </div>

                          <div
                            id={`loadingApprove${nft.nextId}`}
                            className="btn btn-purple"
                            style={{ display: "none", padding: "6px 10px" }}
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

                          {renderStakeUnstake(nft.nextId, nft.staking)}
                          <Button
                            id={`stakebtn${nftId}`}
                            className="btn btn-purple btn-height"
                            style={{ display: "none" }}
                            onClick={() => {
                              handleShowStake(nftId);
                            }}
                          >
                            {t("stake.label")}
                          </Button>
                          <Button
                            id={`unstakebtn${nft.nextId}`}
                            style={{ display: "none" }}
                            className="btn btn-purple btn-height"
                            onClick={handleShowUnstake}
                          >
                            {t("unstake.label")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return <></>;
                }
              })
            ) : (
              <p className="text-center" style={{ height: "100vh" }}>
                {t("noData.label")}
              </p>
            )}
          </Row>
        </Row>

        <div className="spacer-50"></div>
      </section>

      {/* STAKE */}
      <Modal show={modalState === "stakeModal"} onHide={handleClose}>
        <Modal.Body className="nft_shadow text-center text-white">
          <Image src={stakeCard} style={{ width: "45%" }} />
          <p className="cancel-confirm m-0">
            {t("stakeConfirmation.label")} Token #{nftId} ?
          </p>
          <Row className="justify-content-center">
            <div className="col-6 col-md-3">
              <div
                id={`loading${nftId}`}
                className="btn btn-purple"
                style={{ display: "none", padding: "10px 10px" }}
              >
                <span style={{ margin: "auto 8px" }}>{t("loading.label")}</span>
                <ClipLoader loading={loading} css={override} size={17} />
              </div>

              <Button
                id="yesbtn"
                className="btn btn-purple"
                onClick={() => {
                  handleStake();
                }}
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

      {/* UNSTAKE */}
      <Modal show={modalState === "unstakeModal"} onHide={handleClose}>
        <Modal.Body className="nft_shadow text-center text-white">
          <Image src={unstakeCard} style={{ width: "45%" }} />
          <p className="cancel-confirm m-0">
            {t("unStakeConfirmation.label")} Token #{nftId} ?
          </p>
          <Row className="justify-content-center">
            <div className="col-6 col-md-3">
              <div
                id={`loading${nftId}`}
                className="btn btn-purple"
                style={{ display: "none", padding: "10px 10px" }}
              >
                <span style={{ margin: "auto 8px" }}>{t("loading.label")}</span>
                <ClipLoader loading={loading} css={override} size={17} />
              </div>

              <Button
                id="yesbtn"
                className="btn btn-purple"
                onClick={() => {
                  handleUnstake();
                }}
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

export default Mining;
