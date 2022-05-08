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
import useSharableState from "../../../src/SharableState.js";
import { useBetween } from "use-between";

const Inventory = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const blockchain = useSelector((state) => state.blockchain);
  const loading = useSelector((state) => state.loading);
  const [loadAmount, setLoadAmount] = useState(4);
  const [inventory, setInventory] = useState([]);
  const [inventoryCount, setInventoryCount] = useState(0);
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [approve, setApprove] = useState(false);
  const [nftid, setId] = useState("");
  const [rarity, setRarity] = useState("");
  const [amount, setAmount] = useState("");
  const [priceSymbol] = useState(["e", "E", "+", "-"]);
  const { MarketPlaceAddress } = useBetween(useSharableState);

  const handleShow = async (rarity, id) => {
    if (!loading.loading) {
      if (approve === false) {
        setShowApprove(true);
      } else {
        setShow(true);
        setId(id);
        setRarity(rarity);
        setAmount("");
      }
    }
  };

  const approveMarketplace = async () => {
    dispatch(setLoadingTrue());
    await toast.promise(
      blockchain.RANDOMNFT.methods
        .setApprovalForAll(MarketPlaceAddress, true)
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

  const handleClose = () => setShow(false);
  const handleCloseApprove = () => setShowApprove(false);

  const retrieveNFT = () => {
    if (data.getPlayerNFT.length !== 0) {
      setApprove(data.checkApprove);
      let tmpInventory = data.getPlayerNFT.filter(function (nft) {
        return nft.createdtime > 0;
      });
      setInventory(tmpInventory.slice(0, loadAmount));
      setInventoryCount(tmpInventory.length);
    }
  };

  const sellNFT = async () => {
    if (amount <= 0) {
      toast.warn("Please insert a valid amount !", {
        theme: "colored",
      });
    } else if (amount > 0) {
      dispatch(setLoadingTrue());
      await toast.promise(
        blockchain.MARKETPLACE.methods
          .createMarketItem(nftid, Web3.utils.toWei(String(amount), "ether"))
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
    }
  };

  const loadMore = () => {
    setLoadAmount(loadAmount + 4);
  };

  useEffect(() => {
    retrieveNFT();
  }, [loadAmount, data.getPlayerNFT.length]);

  return (
    <div className="row">
      {data.getPlayerNFT.length > 0 ? (
        inventory.map((nft, index) => (
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
                  {t("NFTId.label")} : #{nft.nftid.toString().padStart(5, "0")}
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
                  <span onClick={() => handleShow(nft.rarity, nft.nftid)}>
                    {t("sell.label")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">{t("noData.label")}</p>
      )}
      {inventoryCount != inventory.length && (
        <div className="col-lg-12">
          <div className="spacer-single"></div>
          <span onClick={() => loadMore()} className="btn-main lead m-auto">
            Load More
          </span>
        </div>
      )}

      {/* GO TO NFT MODAL */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title style={{ display: "flex" }}>
            {rarity === "0"
              ? "Ninja - 1"
              : rarity === "1"
              ? "Ninja - 2"
              : rarity === "2"
              ? "Ninja - 3"
              : rarity === "3"
              ? "Ninja - 4"
              : rarity === "4"
              ? "Ninja - 5"
              : rarity === "5"
              ? "Ninja - 6"
              : rarity === "6"
              ? "Ninja - 7"
              : rarity === "7"
              ? "Robot - 1"
              : rarity === "8"
              ? "Robot - 2"
              : rarity === "9"
              ? "Robot - 3"
              : null}
            <p className="m-0 text-small text-secondary mx-3">
              {t("NFTId.label")} : #{nftid.toString().padStart(5, "0")}
            </p>
          </Modal.Title>
          <i
            onClick={loading.loading ? undefined : handleClose}
            aria-hidden="true"
            className="icon_close"
          />
        </Modal.Header>
        <Modal.Body>
          <div className="nft__item_wrap">
            <span>
              <img
                src={
                  rarity === "0"
                    ? nft0
                    : rarity === "1"
                    ? nft1
                    : rarity === "2"
                    ? nft2
                    : rarity === "3"
                    ? nft3
                    : rarity === "4"
                    ? nft4
                    : rarity === "5"
                    ? nft5
                    : rarity === "6"
                    ? nft6
                    : rarity === "7"
                    ? nft7
                    : rarity === "8"
                    ? nft8
                    : rarity === "9"
                    ? nft9
                    : null
                }
                className="nft__item_preview"
                style={
                  rarity === "0"
                    ? { width: "300px" }
                    : rarity === "1"
                    ? { width: "300px" }
                    : rarity === "2"
                    ? { width: "210px" }
                    : rarity === "3"
                    ? { width: "150px" }
                    : rarity === "4"
                    ? { width: "300px" }
                    : rarity === "5"
                    ? { width: "300px" }
                    : rarity === "6"
                    ? { width: "180px" }
                    : rarity === "7"
                    ? { width: "300px" }
                    : rarity === "8"
                    ? { width: "300px" }
                    : rarity === "9"
                    ? { width: "300px" }
                    : null
                }
              />
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter amount here"
              type="number"
              aria-label="Amount"
              aria-describedby="basic-addon2"
              style={{ textAlign: "right" }}
              onKeyDown={(evt) =>
                priceSymbol.includes(evt.key) && evt.preventDefault()
              }
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button
              variant="secondary"
              onClick={loading.loading ? undefined : sellNFT}
              disabled={loading.loading}
            >
              Sell
            </Button>
          </InputGroup>
        </Modal.Footer>
      </Modal>

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

export default Inventory;
