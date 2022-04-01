import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import levelOne from "../../assets/img/marketplace/Level-1.png";
import levelTwo from "../../assets/img/marketplace/Level-2.png";
import levelThree from "../../assets/img/marketplace/Level-3.png";
import { Link } from "@reach/router";
import marketplaceService from "../../services/marketplace.service";
import tokenName from "./tokenName.js";
import useSharableState from "../../../src/SharableState.js";
import { useBetween } from "use-between";

const Marketplace = () => {
  const { t } = useTranslation();
  var Web3 = require("web3");
  const { spalAddress, spaceShardAddress, rate } = useBetween(useSharableState);
  const [rarity, setRarity] = useState([]);
  const [marketplace, setMarketplace] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  const [level, setLevel] = useState([]);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);

  const data = [
    { id: 1, label: t("latestRelease.label") },
    { id: 2, label: t("endTime.label") },
    { id: 3, label: t("lowestPrice.label") },
    { id: 4, label: t("highestPrice.label") },
  ];

  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(1);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id) => {
    selectedItem == id ? setSelectedItem(1) : setSelectedItem(id);
    setOpen(!isOpen);
  };

  //FROM WEI TO USD
  const convertToUSD = (nftPrice) => {
    const weiValue = Web3.utils.fromWei(String(nftPrice), "ether");
    let balance = weiValue * rate;
    return balance.toFixed(2);
  };

  const resetFilter = () => {
    setChecked(false);
    setChecked1(false);
    setChecked2(false);
    setChecked3(false);
    setChecked4(false);
    setChecked5(false);
    setChecked6(false);
    setChecked7(false);

    setRarity([]);
    setLevel([]);
    setSelectedItem(1);
    document.getElementById("sorting").value = 1;
  };

  const retrieveMarketplace = () => {
    marketplaceService
      .retrieveMarketplace(rarity, level, selectedItem)
      .then((result) => {
        if (result.status) {
          setMarketplace(result.marketplace);
        } else {
          console.log(result.msg);
        }
      });
  };

  useEffect(() => {
    retrieveMarketplace();
  }, [rarity, level, selectedItem]);

  return (
    <div>
      <section className="container">
        <div className="row">
          <div className="spacer-20"></div>
          <h4 className="text-shadow-title m-0">{t("marketplace.label")}</h4>

          <div className="row mb-4 mt-4 position-relative">
            <div className="col-md-2 d-flex justify-content-between m-a-0">
              <div className="d-flex">
                <i
                  className="fa fa-fw text-white"
                  aria-hidden="true"
                  style={{ fontSize: "larger" }}
                >
                  
                </i>
                <h5 style={{ fontWeight: "normal" }}>{t("filter.label")}</h5>
              </div>
              <i
                onClick={resetFilter}
                className="fa fa-fw text-white"
                aria-hidden="true"
                style={{ fontSize: "larger", cursor: "pointer" }}
              >
                
              </i>
            </div>

            <div
              className="col-md-auto text-white position-absolute"
              style={{ right: "0" }}
            >
              <div
                className="dropdown"
                style={{ zIndex: "1", backgroundColor: "#061028" }}
              >
                <div className="dropdown-header" onClick={toggleDropdown}>
                  {selectedItem
                    ? items.find((item) => item.id == selectedItem).label
                    : "Latest Release"}
                  <i
                    className={`fa fa-chevron-right icon ${isOpen && "open"}`}
                  ></i>
                </div>
                <div className={`dropdown-body ${isOpen && "open"}`}>
                  {items.map((item) => (
                    <div
                      className="dropdown-item"
                      onClick={(e) => handleItemClick(e.target.id)}
                      id={item.id}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-2">
            <div
              className="item_filter_group"
              style={{ padding: "0", border: "0" }}
            >
              <h6 className="mb-3">{t("rarity.label")}</h6>
              <div className="de_form">
                <div className="de_checkbox">
                  <input
                    id="common"
                    name="common"
                    type="checkbox"
                    value="common"
                    checked={checked}
                    onChange={() => {
                      setChecked(!checked);
                      if (checked == false) {
                        setRarity([...rarity, 5]);
                      } else {
                        setRarity(rarity.filter((e) => e !== 5));
                      }
                    }}
                  />
                  <label htmlFor="common">{t("common.label")}</label>
                </div>
                <div className="de_checkbox">
                  <input
                    id="uncommon"
                    name="uncommon"
                    type="checkbox"
                    value="uncommon"
                    checked={checked1}
                    onChange={() => {
                      setChecked1(!checked1);
                      if (checked1 == false) {
                        setRarity([...rarity, 4]);
                      } else {
                        setRarity(rarity.filter((e) => e !== 4));
                      }
                    }}
                  />
                  <label htmlFor="uncommon">{t("uncommon.label")}</label>
                </div>
                <div className="de_checkbox">
                  <input
                    id="rare"
                    name="rare"
                    type="checkbox"
                    value="rare"
                    checked={checked2}
                    onChange={() => {
                      setChecked2(!checked2);
                      if (checked2 == false) {
                        setRarity([...rarity, 3]);
                      } else {
                        setRarity(rarity.filter((e) => e !== 3));
                      }
                    }}
                  />
                  <label htmlFor="rare">{t("rare.label")}</label>
                </div>
                <div className="de_checkbox">
                  <input
                    id="epic"
                    name="epic"
                    type="checkbox"
                    value="epic"
                    checked={checked3}
                    onChange={() => {
                      setChecked3(!checked3);
                      if (checked3 == false) {
                        setRarity([...rarity, 2]);
                      } else {
                        setRarity(rarity.filter((e) => e !== 2));
                      }
                    }}
                  />
                  <label htmlFor="epic">{t("epic.label")}</label>
                </div>
                <div className="de_checkbox">
                  <input
                    id="legendary"
                    name="legendary"
                    type="checkbox"
                    value="legendary"
                    checked={checked4}
                    onChange={() => {
                      setChecked4(!checked4);
                      if (checked4 == false) {
                        setRarity([...rarity, 1]);
                      } else {
                        setRarity(rarity.filter((e) => e !== 1));
                      }
                    }}
                  />
                  <label htmlFor="legendary">{t("legendary.label")}</label>
                </div>
              </div>

              <h6 className="mt-5 mb-3">{t("level.label")}</h6>
              <div className="de_form">
                <div className="de_checkbox">
                  <input
                    id="level_1"
                    name="level_1"
                    type="checkbox"
                    value="level_1"
                    checked={checked5}
                    onChange={() => {
                      setChecked5(!checked5);
                      if (checked5 == false) {
                        setLevel([...level, 1]);
                      } else {
                        setLevel(level.filter((e) => e !== 1));
                      }
                    }}
                  />
                  <label htmlFor="level_1">{t("level.label") + " " + 1}</label>
                </div>
                <div className="de_checkbox">
                  <input
                    id="level_2"
                    name="level_2"
                    type="checkbox"
                    value="level_2"
                    checked={checked6}
                    onChange={() => {
                      setChecked6(!checked6);
                      if (checked6 == false) {
                        setLevel([...level, 2]);
                      } else {
                        setLevel(level.filter((e) => e !== 2));
                      }
                    }}
                  />
                  <label htmlFor="level_2">{t("level.label") + " " + 2}</label>
                </div>
                <div className="de_checkbox">
                  <input
                    id="level_3"
                    name="level_3"
                    type="checkbox"
                    value="level_3"
                    checked={checked7}
                    onChange={() => {
                      setChecked7(!checked7);
                      if (checked7 == false) {
                        setLevel([...level, 3]);
                      } else {
                        setLevel(level.filter((e) => e !== 3));
                      }
                    }}
                  />
                  <label htmlFor="level_3">{t("level.label") + " " + 3}</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-10">
            <div className="row">
              {marketplace.map((marketplace, index) => {
                return (
                  <div
                    key={index}
                    className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4"
                  >
                    <div className="nft__item m-0 nft_shadow">
                      <div className="nft__item_wrap position-relative">
                        <img
                          src={marketplace.marketplace_i_nft_uri}
                          className="lazy nft__item_preview"
                          alt="nft_image"
                          style={{ width: "80%" }}
                        />
                        <img
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

                      <div className="nft__item_info">
                        <h3 className="mb-1">
                          {tokenName(marketplace.marketplace_i_nft_uri)}
                        </h3>
                        <p className="m-0">
                          {t("tokenID.label")} #
                          {marketplace.marketplace_i_nft_id}
                        </p>
                        <p>
                          {t("ownerAddress.label")} :{" "}
                          {marketplace.marketplace_i_nft_seller.substring(
                            0,
                            4
                          ) +
                            "..." +
                            marketplace.marketplace_i_nft_seller.substring(
                              marketplace.marketplace_i_nft_seller.length - 4
                            )}
                        </p>

                        <Link
                          className="btn btn-purple mb-2"
                          to={`/nftDetail/buy/${marketplace.marketplace_i_market_item_id}`}
                          style={{ padding: "10px 25px" }}
                        >
                          {marketplace.marketplace_i_token_address ===
                          spalAddress
                            ? Web3.utils.fromWei(
                                String(marketplace.marketplace_i_nft_price),
                                "ether"
                              ) +
                              " SPAL" +
                              " \u2248 " +
                              "$" +
                              convertToUSD(marketplace.marketplace_i_nft_price)
                            : marketplace.marketplace_i_token_address ===
                              spaceShardAddress
                            ? Web3.utils.fromWei(
                                String(marketplace.marketplace_i_nft_price),
                                "ether"
                              ) +
                              " Space Shard" +
                              " \u2248 " +
                              "$" +
                              convertToUSD(marketplace.marketplace_i_nft_price)
                            : null}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
