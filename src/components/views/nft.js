import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import levelOne from "../../assets/img/marketplace/Level-1.png";
import levelTwo from "../../assets/img/marketplace/Level-2.png";
import levelThree from "../../assets/img/marketplace/Level-3.png";
import onSales from "../../assets/img/On-sales.png";
import { Link } from "@reach/router";
import { fetchData } from "../../redux/data/dataActions";
import { useDispatch, useSelector } from "react-redux";
import tokenName from "./tokenName.js";
import useSharableState from "../../../src/SharableState.js";
import { useBetween } from "use-between";

const NFT = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(true);
  const [openMenu1, setOpenMenu1] = useState(false);
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [nftSales, setNFTSales] = useState("");
  var Web3 = require("web3");

  const { spalAddress, spaceShardAddress, rate } = useBetween(useSharableState);

  //FROM WEI TO USD
  const convertToUSD = (nftPrice) => {
    const weiValue = Web3.utils.fromWei(String(nftPrice), "ether");
    let balance = weiValue * rate;
    return balance.toFixed(18);
  };

  const handleItemClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("mainbtn").classList.add("active");
    document.getElementById("mainbtn1").classList.remove("active");
  };

  //GET ALL OWNER SALE
  const handleOnSalesClick = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("mainbtn1").classList.add("active");
    document.getElementById("mainbtn").classList.remove("active");

    blockchain.nftMarket.methods
      .fetchSellingItems(blockchain.account)
      .call({ from: blockchain.account })
      .then((receipt) => {
        setNFTSales(receipt);
      });
  };

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.nftToken != null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.nftToken]);

  return (
    <div>
      <section className="container">
        <div className="spacer-20"></div>
        <h4 className="text-shadow-title mb-4">{t("myNFT.label")}</h4>

        <div className="de_tab">
          <ul className="de_nav text-left m-0">
            <li id="mainbtn" className="active">
              <span onClick={handleItemClick}>{t("items.label")}</span>
            </li>
            <li id="mainbtn1" className="">
              <span onClick={handleOnSalesClick}>{t("onSales.label")}</span>
            </li>
          </ul>

          <div className="de_tab_content">
            {/* ITEMS */}
            {openMenu && (
              <div className="tab-1 onStep fadeIn mt-4">
                <div className="row">
                  {data.allOwnerNFT.length > 0 ? (
                    data.allOwnerNFT.map((nft, index) => {
                      console.log(data.allOwnerNFT);
                      //NFT THAT ALREADY REVEALED AND HAVENT BEEN STAKE
                      if (nft.revealed === true && nft.staking === false) {
                        return (
                          <div
                            key={index}
                            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                          >
                            <div className="nft-card">
                              <div className="nft__item m-0 nft_shadow">
                                <div className="nft__item_wrap position-relative ">
                                  <img
                                    src={nft.tokenURI}
                                    alt="nft_image"
                                    className="mt-2"
                                  />
                                  <img
                                    src={
                                      nft.level === "1"
                                        ? levelOne
                                        : nft.level === "2"
                                        ? levelTwo
                                        : nft.level === "3"
                                        ? levelThree
                                        : null
                                    }
                                    className="level-icon2"
                                    alt="level"
                                  />
                                </div>

                                <div className="nft__item_info">
                                  <h3 className="mb-1">
                                    {tokenName(nft.tokenURI)}
                                  </h3>
                                  <p className="m-0">
                                    {t("tokenID.label")} #{nft.nextId}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })
                  ) : (
                    <p className="text-center">{t("noData.label")}</p>
                  )}
                </div>
              </div>
            )}

            {/* ON SALES */}
            {openMenu1 && (
              <div className="tab-2 onStep fadeIn mt-4">
                <div className="row">
                  {nftSales.length > 0 ? (
                    nftSales.map((nft, index) => {
                      return (
                        <div
                          key={index}
                          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                        >
                          <div className="nft-card">
                            <div className="nft__item m-0 nft_shadow">
                              <div>
                                <div className="nft__item_wrap position-relative">
                                  <img
                                    className="onSales"
                                    src={onSales}
                                    alt="onSales"
                                  />
                                  <img
                                    src={nft.tokenURI}
                                    alt="nft_image"
                                    className="mt-2"
                                  />
                                  <img
                                    src={
                                      nft.level === "1"
                                        ? levelOne
                                        : nft.level === "2"
                                        ? levelTwo
                                        : nft.level === "3"
                                        ? levelThree
                                        : null
                                    }
                                    className="level-icon2"
                                    alt="level"
                                  />
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
        </div>
      </section>
    </div>
  );
};

export default NFT;
