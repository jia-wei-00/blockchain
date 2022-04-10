import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import levelOne from "../../assets/img/marketplace/Level-1.png";
import levelTwo from "../../assets/img/marketplace/Level-2.png";
import levelThree from "../../assets/img/marketplace/Level-3.png";
import { Link } from "@reach/router";
import marketplaceService from "../../services/marketplace.service";
import useSharableState from "../../../src/SharableState.js";
import { useBetween } from "use-between";
import nft1 from "../../assets/img/marketplace/1.png";
import nft2 from "../../assets/img/marketplace/2.png";
import nft3 from "../../assets/img/marketplace/3.png";
import nft4 from "../../assets/img/marketplace/4.png";
import nft5 from "../../assets/img/marketplace/5.png";
import { Image, Col, Row } from "react-bootstrap";
import LoadingScreen from "react-loading-screen";
import { BottomScrollListener } from "react-bottom-scroll-listener";

/*eslint eqeqeq:0*/
const Marketplace = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  var Web3 = require("web3");
  const { spalAddress, spaceShardAddress, MarketPlaceAddress } =
    useBetween(useSharableState);
  const [rarity, setRarity] = useState([]);
  const [marketplace, setMarketplace] = useState([]);
  const [marketplaceCount, setMarketplaceCount] = useState(0);
  const [loadAmount, setLoadAmount] = useState(8);
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

  const retrieveMarketplace = async () => {
    if (data.retrieveMarketplace.length !== 0) {
      console.log(data.retrieveMarketplace);
      // await blockchain.RANDOMNFT.methods
      //   .getAllMarketplaceNFT()
      //   .call({ from: blockchain.account })
      //   .then((receipt) => {
      //     console.log(receipt);
      //   });
      // setMarketplace(data.retrieveMarketplace.slice(0, loadAmount));
      // setMarketplaceCount(data.retrieveMarketplace.length);
    }
  };

  const loadMore = () => {
    setLoadAmount(loadAmount + 8);
  };

  const tokenName = (rarity) => {
    if (rarity === 1) {
      return "Alpaca Armstrong ";
    } else if (rarity === 2) {
      return "Merlin Alpaca";
    } else if (rarity === 3) {
      return "Arthur Alpaca";
    } else if (rarity === 4) {
      return "Ragnar Alpaca";
    } else if (rarity === 5) {
      return "Old Mcdonald Alpaca";
    }
  };

  useEffect(() => {
    retrieveMarketplace();
  }, [data]);

  return (
    <div>
      <section className="container marketplace-container position-absolute pb-0">
        <div className="row">
          <div
            className="col-lg-2 col-md-3"
            style={{ backgroundColor: "#02020a " }}
          >
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
                        if (checked == false) {
                          setRarity([...rarity, 0]);
                        } else {
                          setRarity(rarity.filter((e) => e !== 0));
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
                        setChecked1(!checked1);
                        if (checked1 == false) {
                          setRarity([...rarity, 1]);
                        } else {
                          setRarity(rarity.filter((e) => e !== 1));
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
                        setChecked2(!checked2);
                        if (checked2 == false) {
                          setRarity([...rarity, 2]);
                        } else {
                          setRarity(rarity.filter((e) => e !== 2));
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
                        setChecked3(!checked3);
                        if (checked3 == false) {
                          setRarity([...rarity, 3]);
                        } else {
                          setRarity(rarity.filter((e) => e !== 3));
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
                        setChecked4(!checked4);
                        if (checked4 == false) {
                          setRarity([...rarity, 4]);
                        } else {
                          setRarity(rarity.filter((e) => e !== 4));
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
                        setChecked5(!checked5);
                        if (checked5 == false) {
                          setRarity([...rarity, 5]);
                        } else {
                          setRarity(rarity.filter((e) => e !== 5));
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
                        setChecked6(!checked6);
                        if (checked6 == false) {
                          setRarity([...rarity, 6]);
                        } else {
                          setRarity(rarity.filter((e) => e !== 6));
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
                        setChecked7(!checked7);
                        if (checked7 == false) {
                          setRarity([...rarity, 7]);
                        } else {
                          setRarity(rarity.filter((e) => e !== 7));
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
                        setChecked8(!checked8);
                        if (checked8 == false) {
                          setRarity([...rarity, 8]);
                        } else {
                          setRarity(rarity.filter((e) => e !== 8));
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
                        setChecked9(!checked9);
                        if (checked9 == false) {
                          setRarity([...rarity, 9]);
                        } else {
                          setRarity(rarity.filter((e) => e !== 9));
                        }
                      }}
                    />
                    <label htmlFor="robot3">{t("robot3.label")}</label>
                  </div>
                </div>
                <hr className="mt-4 mb-0 hr-shadow" />
              </div>
            </div>
          </div>

          <div className="col-lg-10 col-md-9 marketplace-pl">
            <div className="spacer-80 spacer-market"></div>

            <Row className="m-0">
              <Col>
                <div className="mb-4 position-relative w-100">
                  <h3 className="text-shadow-title">
                    {t("marketplace.label")}
                  </h3>
                </div>
              </Col>
            </Row>

            <div className="spacer-market">
              <div className="row w-100 m-0">
                {data.retrieveMarketplace.length > 0 ? (
                  data.retrieveMarketplace.map((marketplace, index) => {
                    return (
                      <div
                        key={index}
                        className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4 "
                      >
                        <div className="gradient-box-shadow gradient-toRightBottom">
                          {/* <Image src={box} className="w-100" /> */}
                          <div
                            className="gradient-box-shadow-inner"
                            style={{ padding: "15px" }}
                          >
                            <div className="position-relative">
                              <Image
                                src={
                                  marketplace.marketplace_i_nft_rarity === 1
                                    ? nft5
                                    : marketplace.marketplace_i_nft_rarity === 2
                                    ? nft4
                                    : marketplace.marketplace_i_nft_rarity === 3
                                    ? nft3
                                    : marketplace.marketplace_i_nft_rarity === 4
                                    ? nft2
                                    : marketplace.marketplace_i_nft_rarity === 5
                                    ? nft1
                                    : null
                                }
                                className="w-100"
                                alt="nft_image"
                              />
                              <Image
                                src={
                                  marketplace.marketplace_i_nft_level === 1
                                    ? levelOne
                                    : marketplace.marketplace_i_nft_level === 2
                                    ? levelTwo
                                    : marketplace.marketplace_i_nft_level === 3
                                    ? levelThree
                                    : null
                                }
                                className="level-icon"
                                alt="level"
                              />
                            </div>
                            <div className="text-center ">
                              <h5
                                className="mb-1 mt-3 allipsis-detect ellipsis-title"
                                style={{ maxWidth: "100%" }}
                              >
                                {tokenName(marketplace.rarity)}
                              </h5>
                              <p className="m-0 text-small">
                                {t("NFTId.label")} : #
                                {marketplace.nftid.toString().padStart(5, "0")}
                              </p>
                              <p className="text-small mb-2">
                                {t("ownerAddress.label")} :{" "}
                                {marketplace.owner.substring(0, 4) +
                                  "..." +
                                  marketplace.owner.substring(
                                    marketplace.owner.length - 4
                                  )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center" style={{ height: "100vh" }}>
                    {t("noData.label")}
                  </p>
                )}
                <BottomScrollListener onBottom={() => loadMore()} />
                {marketplaceCount != marketplace.length ? (
                  <div className="col-lg-12">
                    {/* <span
                        // onClick={() => loadMore()}
                        className="btn-main lead m-auto box-shadow-purple"
                      >
                        Load More
                      </span> */}
                    <div className="spacer-single"></div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
