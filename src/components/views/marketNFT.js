import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import nft0 from "../../assets/img/img/home/rare0.gif";
import nft1 from "../../assets/img/img/home/rare1.gif";
import nft2 from "../../assets/img/img/home/rare2.gif";
import nft3 from "../../assets/img/img/home/rare3.gif";
import nft4 from "../../assets/img/img/home/rare4.gif";
import nft5 from "../../assets/img/img/home/rare5.gif";
import nft6 from "../../assets/img/img/home/rare6.gif";
import nft7 from "../../assets/img/img/home/rare7.gif";
import nft8 from "../../assets/img/img/home/rare8.gif";
import nft9 from "../../assets/img/img/home/rare9.gif";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Modal } from "react-bootstrap";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setLoadingTrue,
  setLoadingFalse,
} from "../../redux/loading/loadingActions";
import useSharableState from "../../../src/SharableState.js";
import { useBetween } from "use-between";
import { fetchData } from "../../redux/data/dataActions";

const MarketNFT = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [rarity, setRarity] = useState();
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [checked8, setChecked8] = useState(false);
  const [checked9, setChecked9] = useState(false);
  const data = useSelector((state) => state.data);
  const blockchain = useSelector((state) => state.blockchain);
  const loading = useSelector((state) => state.loading);
  const { MarketPlaceAddress } = useBetween(useSharableState);
  const [loadAmount, setLoadAmount] = useState(8);
  const [marketplace, setMarketplace] = useState([]);
  const [marketplaceCount, setMarketplaceCount] = useState(0);
  const [showApprove, setShowApprove] = useState(false);
  const [approve, setApprove] = useState(false);

  const resetFilter = () => {
    setChecked(false);
    setChecked1(false);
    setChecked2(false);
    setChecked3(false);
    setChecked4(false);
    setChecked5(false);
    setChecked6(false);
    setChecked7(false);
    setChecked8(false);
    setChecked9(false);
    setRarity([]);
  };

  const retrieveMarketplace = () => {
    if (data.retrieveMarketplace.length !== 0) {
      if (
        checked ||
        checked1 ||
        checked2 ||
        checked3 ||
        checked4 ||
        checked5 ||
        checked6 ||
        checked7 ||
        checked8 ||
        checked9
      ) {
        let market = data.retrieveMarketplace.filter(function (nft) {
          return nft.rarity.includes(rarity);
        });
        setMarketplace(market.slice(0, loadAmount));
      } else {
        setMarketplace(data.retrieveMarketplace.slice(0, loadAmount));
      }
      setMarketplaceCount(data.retrieveMarketplace.length);
    }
  };

  const handleShow = (id, price, seller) => {
    if (!loading.loading) {
      let tmpaccount = Web3.utils.toChecksumAddress(
        blockchain.account.toLowerCase()
      );
      if (seller == tmpaccount) {
        toast.warn("Not allowed to buy own NFT!");
      } else {
        if (approve === false) {
          setShowApprove(true);
        } else {
          buyNFT(id, price);
        }
      }
    }
  };

  const handleCloseApprove = () => setShowApprove(false);

  const buyNFT = async (id, price) => {
    if (data.balance > price) {
      dispatch(setLoadingTrue());
      console.log("price", price);
      await toast.promise(
        blockchain.MARKETPLACE.methods
          .createMarketSale(id, String(price))
          .send({ from: blockchain.account })
          .once("error", (err) => {
            console.log(err);
            dispatch(setLoadingFalse());
          })
          .then((receipt) => {
            dispatch(setLoadingFalse());
          }),
        {
          pending: "Loading... Please wait",
          success: "Success 👌",
          error: "Error occur 🤯",
        }
      );
    } else {
      toast.warn("insufficient JTOKEN!");
    }
  };

  const approveMarketplace = async () => {
    dispatch(setLoadingTrue());
    await toast.promise(
      blockchain.JTOKEN.methods
        .approve(
          MarketPlaceAddress,
          Web3.utils.toWei(String("9999999999"), "ether")
        )
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

  useEffect(() => {
    retrieveMarketplace();
    if (data.approveMarketplace > 0) {
      setApprove(true);
    }
  }, [
    data.retrieveMarketplace.length,
    rarity,
    checked,
    checked1,
    checked2,
    checked3,
    checked4,
    checked5,
    checked6,
    checked7,
    checked8,
    checked9,
  ]);

  return (
    <div>
      <section className="marketplace-container pb-0 pt-5">
        <Row>
          <Col md={2} xl={1} style={{ backgroundColor: "#02020a" }}>
            <div className="item_filter_group marketplace-margin">
              <div className="spacer-60"></div>

              <div className="d-flex justify-content-between marketplace-filter">
                <div className="d-flex">
                  <i
                    className="fa fa-fw text-white font-larger"
                    aria-hidden="true"
                  >
                    
                  </i>
                  <h5 className="font-normal">{t("filter.label")}</h5>
                </div>
                <span
                  aria-hidden="true"
                  className="icon_refresh text-white "
                  onClick={resetFilter}
                  style={{ cursor: "pointer" }}
                ></span>
              </div>

              <div className="marketplace-filter">
                <div className="de_form">
                  <div className="de_checkbox">
                    <input
                      id="ninja1"
                      name="ninja1"
                      type="checkbox"
                      value="ninja1"
                      checked={checked}
                      onChange={() => {
                        setChecked(!checked);
                        setChecked1(false);
                        setChecked2(false);
                        setChecked3(false);
                        setChecked4(false);
                        setChecked5(false);
                        setChecked6(false);
                        setChecked7(false);
                        setChecked8(false);
                        setChecked9(false);
                        if (checked == false) {
                          setRarity(0);
                        }
                      }}
                    />
                    <label htmlFor="ninja1">{t("ninja1.label")}</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="ninja2"
                      name="ninja2"
                      type="checkbox"
                      value="ninja2"
                      checked={checked1}
                      onChange={() => {
                        setChecked(false);
                        setChecked1(!checked1);
                        setChecked2(false);
                        setChecked3(false);
                        setChecked4(false);
                        setChecked5(false);
                        setChecked6(false);
                        setChecked7(false);
                        setChecked8(false);
                        setChecked9(false);
                        if (checked1 == false) {
                          setRarity(1);
                        }
                      }}
                    />
                    <label htmlFor="ninja2">{t("ninja2.label")}</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="ninja3"
                      name="ninja3"
                      type="checkbox"
                      value="ninja3"
                      checked={checked2}
                      onChange={() => {
                        setChecked(false);
                        setChecked1(false);
                        setChecked2(!checked2);
                        setChecked3(false);
                        setChecked4(false);
                        setChecked5(false);
                        setChecked6(false);
                        setChecked7(false);
                        setChecked8(false);
                        setChecked9(false);
                        if (checked2 == false) {
                          setRarity(2);
                        }
                      }}
                    />
                    <label htmlFor="ninja3">{t("ninja3.label")}</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="ninja4"
                      name="ninja4"
                      type="checkbox"
                      value="ninja4"
                      checked={checked3}
                      onChange={() => {
                        setChecked(false);
                        setChecked1(false);
                        setChecked2(false);
                        setChecked3(!checked3);
                        setChecked4(false);
                        setChecked5(false);
                        setChecked6(false);
                        setChecked7(false);
                        setChecked8(false);
                        setChecked9(false);
                        if (checked3 == false) {
                          setRarity(3);
                        }
                      }}
                    />
                    <label htmlFor="ninja4">{t("ninja4.label")}</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="ninja5"
                      name="ninja5"
                      type="checkbox"
                      value="ninja5"
                      checked={checked4}
                      onChange={() => {
                        setChecked(false);
                        setChecked1(false);
                        setChecked2(false);
                        setChecked3(false);
                        setChecked4(!checked4);
                        setChecked5(false);
                        setChecked6(false);
                        setChecked7(false);
                        setChecked8(false);
                        setChecked9(false);
                        if (checked4 == false) {
                          setRarity(4);
                        }
                      }}
                    />
                    <label htmlFor="ninja5">{t("ninja5.label")}</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="ninja6"
                      name="ninja6"
                      type="checkbox"
                      value="ninja6"
                      checked={checked5}
                      onChange={() => {
                        setChecked(false);
                        setChecked1(false);
                        setChecked2(false);
                        setChecked3(false);
                        setChecked4(false);
                        setChecked5(!checked5);
                        setChecked6(false);
                        setChecked7(false);
                        setChecked8(false);
                        setChecked9(false);
                        if (checked5 == false) {
                          setRarity(5);
                        }
                      }}
                    />
                    <label htmlFor="ninja6">{t("ninja6.label")}</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="ninja7"
                      name="ninja7"
                      type="checkbox"
                      value="ninja7"
                      checked={checked6}
                      onChange={() => {
                        setChecked(false);
                        setChecked1(false);
                        setChecked2(false);
                        setChecked3(false);
                        setChecked4(false);
                        setChecked5(false);
                        setChecked6(!checked6);
                        setChecked7(false);
                        setChecked8(false);
                        setChecked9(false);
                        if (checked6 == false) {
                          setRarity(6);
                        }
                      }}
                    />
                    <label htmlFor="ninja7">{t("ninja7.label")}</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="robot1"
                      name="robot1"
                      type="checkbox"
                      value="robot1"
                      checked={checked7}
                      onChange={() => {
                        setChecked(false);
                        setChecked1(false);
                        setChecked2(false);
                        setChecked3(false);
                        setChecked4(false);
                        setChecked5(false);
                        setChecked6(false);
                        setChecked7(!checked7);
                        setChecked8(false);
                        setChecked9(false);
                        if (checked7 == false) {
                          setRarity(7);
                        }
                      }}
                    />
                    <label htmlFor="robot1">{t("robot1.label")}</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="robot2"
                      name="robot2"
                      type="checkbox"
                      value="robot2"
                      checked={checked8}
                      onChange={() => {
                        setChecked(false);
                        setChecked1(false);
                        setChecked2(false);
                        setChecked3(false);
                        setChecked4(false);
                        setChecked5(false);
                        setChecked6(false);
                        setChecked7(false);
                        setChecked8(!checked8);
                        setChecked9(false);
                        if (checked8 == false) {
                          setRarity(8);
                        }
                      }}
                    />
                    <label htmlFor="robot2">{t("robot2.label")}</label>
                  </div>
                  <div className="de_checkbox">
                    <input
                      id="robot3"
                      name="robot3"
                      type="checkbox"
                      value="robot3"
                      checked={checked9}
                      onChange={() => {
                        setChecked(false);
                        setChecked1(false);
                        setChecked2(false);
                        setChecked3(false);
                        setChecked4(false);
                        setChecked5(false);
                        setChecked6(false);
                        setChecked7(false);
                        setChecked8(false);
                        setChecked9(!checked9);
                        if (checked9 == false) {
                          setRarity(9);
                        }
                      }}
                    />
                    <label htmlFor="robot3">{t("robot3.label")}</label>
                  </div>
                </div>
                <hr className="mt-4 mb-0 hr-shadow" />
              </div>
            </div>
          </Col>
          <Col md={10} xl={11}>
            <Row>
              {marketplace.length > 0 ? (
                marketplace.map((nft, index) => (
                  <div
                    key={index}
                    className="d-item col-md-6 col-xl-3 col-12 mb-4"
                  >
                    <div className="nft__item m-0">
                      <div className="nft__item_wrap">
                        <span>
                          <img
                            src={
                              nft.rarity === "0"
                                ? nft0
                                : nft.rarity === "1"
                                ? nft1
                                : nft.rarity === "2"
                                ? nft2
                                : nft.rarity === "3"
                                ? nft3
                                : nft.rarity === "4"
                                ? nft4
                                : nft.rarity === "5"
                                ? nft5
                                : nft.rarity === "6"
                                ? nft6
                                : nft.rarity === "7"
                                ? nft7
                                : nft.rarity === "8"
                                ? nft8
                                : nft.rarity === "9"
                                ? nft9
                                : null
                            }
                            className="nft__item_preview"
                            style={
                              nft.rarity === "0"
                                ? { width: "200px" }
                                : nft.rarity === "1"
                                ? { width: "300px" }
                                : nft.rarity === "2"
                                ? { width: "210px" }
                                : nft.rarity === "3"
                                ? { width: "150px" }
                                : nft.rarity === "4"
                                ? { width: "200px" }
                                : nft.rarity === "5"
                                ? { width: "300px" }
                                : nft.rarity === "6"
                                ? { width: "180px" }
                                : nft.rarity === "7"
                                ? { width: "300px" }
                                : nft.rarity === "8"
                                ? { width: "250px" }
                                : nft.rarity === "9"
                                ? { width: "300px" }
                                : null
                            }
                          />
                        </span>
                      </div>
                      <div className="text-center mb-2">
                        <p className="m-0 text-small text-secondary">
                          {t("NFTId.label")} : #
                          {nft.itemId.toString().padStart(5, "0")}
                        </p>
                      </div>
                      <div className="nft__item_info">
                        <h4>
                          {nft.rarity === "0"
                            ? "Ninja - 1"
                            : nft.rarity === "1"
                            ? "Ninja - 2"
                            : nft.rarity === "2"
                            ? "Ninja - 3"
                            : nft.rarity === "3"
                            ? "Ninja - 4"
                            : nft.rarity === "4"
                            ? "Ninja - 5"
                            : nft.rarity === "5"
                            ? "Ninja - 6"
                            : nft.rarity === "6"
                            ? "Ninja - 7"
                            : nft.rarity === "7"
                            ? "Robot - 1"
                            : nft.rarity === "8"
                            ? "Robot - 2"
                            : nft.rarity === "9"
                            ? "Robot - 3"
                            : null}
                        </h4>
                        <div className="nft__item_action mb-4">
                          <div>
                            Price:{" "}
                            {Web3.utils.fromWei(String(nft.price), "ether")}{" "}
                            JTOKEN
                          </div>
                          <div>
                            Seller:{" "}
                            {nft.seller.substring(0, 2) +
                              "..." +
                              nft.seller.substring(nft.seller.length - 4)}
                          </div>
                          <span
                            onClick={() =>
                              handleShow(nft.itemId, nft.price, nft.seller)
                            }
                          >
                            {t("buy.label")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">{t("noData.label")}</p>
              )}
            </Row>
          </Col>
        </Row>
      </section>

      <Modal
        show={showApprove}
        onHide={handleCloseApprove}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Attention !</Modal.Title>
          <i
            onClick={loading.loading ? undefined : handleCloseApprove}
            aria-hidden="true"
            className="icon_close"
          />
        </Modal.Header>
        <Modal.Body>You Need To Approve Marketplace Before Proceed!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseApprove}>
            Close
          </Button>
          <Button variant="primary" onClick={approveMarketplace}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default MarketNFT;
