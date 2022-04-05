import React, { useState, useEffect } from "react";
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
import { useTranslation } from "react-i18next";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setLoadingTrue,
  setLoadingFalse,
} from "../../redux/loading/loadingActions";

const Inventory = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const blockchain = useSelector((state) => state.blockchain);
  const [loadAmount, setLoadAmount] = useState(4);
  const [onMarket, setOnMarket] = useState([]);
  const [onMarketCount, setOnMarketCount] = useState(0);
  const loading = useSelector((state) => state.loading);
  const { t } = useTranslation();

  const retrieveOnMarketNFT = () => {
    if (data.getSellingNFT.length !== 0) {
      setOnMarket(data.getSellingNFT.slice(0, loadAmount));
      setOnMarketCount(data.getSellingNFT.length);
    }
  };

  const cancelSell = async (id) => {
    dispatch(setLoadingTrue());
    await toast.promise(
      blockchain.MARKETPLACE.methods
        .cancelMarketItem(id)
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

  const loadMore = () => {
    setLoadAmount(loadAmount + 4);
  };

  console.log("here", onMarket)

  useEffect(() => {
    retrieveOnMarketNFT();
  }, [loadAmount, data.getSellingNFT.length]);

  return (
    <div className="row">
      {data.getSellingNFT.length > 0 ? (
        onMarket.map((nft, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
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
                  {nft.tokenId.toString().padStart(5, "0")}
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
                    Price: {Web3.utils.fromWei(String(nft.price), "ether")}{" "}
                    JTOKEN
                  </div>
                  <div>
                    <span
                      onClick={
                        loading.loading ? undefined : () => cancelSell(nft.itemId)
                      }
                    >
                      {t("cancel.label")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">{t("noData.label")}</p>
      )}
      {onMarketCount != onMarket.length && (
        <div className="col-lg-12">
          <div className="spacer-single"></div>
          <span onClick={() => loadMore()} className="btn-main lead m-auto">
            Load More
          </span>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Inventory;
