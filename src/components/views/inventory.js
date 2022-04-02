import React, { useState, useEffect } from "react";
import nft1 from "../../assets/img/img/home/rare1.gif";
import nft2 from "../../assets/img/img/home/rare6.gif";
import nft3 from "../../assets/img/img/home/3.png";
import nft4 from "../../assets/img/img/home/4.png";
import nft5 from "../../assets/img/img/home/5.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Row, Col, Modal, Image } from "react-bootstrap";
import blockchainReducer from "../../redux/blockchain/blockchainReducer";

const Inventory = () => {
  const data = useSelector((state) => state.data);
  const blockchain = useSelector((state) => state.blockchain);
  const [loadAmount, setLoadAmount] = useState(4);
  const [inventory, setInventory] = useState([]);
  const [inventoryCount, setInventoryCount] = useState(0);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nftid, setId] = useState("");
  const [rarity, setRarity] = useState("");

  const openModal = (rarity, id) => {
    // setShowModal(true);
    // setId(id);
    // setRarity(rarity);
  };

  const retrieveNFT = () => {
    if (data.getPlayerNFT.length !== 0) {
      setInventory(data.getPlayerNFT.slice(0, loadAmount));
      setInventoryCount(data.getPlayerNFT.length);
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
                      nft.rarity === "5"
                        ? nft5
                        : nft.rarity === "4"
                        ? nft4
                        : nft.rarity === "3"
                        ? nft3
                        : nft.rarity === "2"
                        ? nft2
                        : nft.rarity === "1"
                        ? nft1
                        : nft.rarity === "1"
                        ? nft6
                    }
                    className="nft__item_preview"
                    style={
                        nft.rarity === "5"
                        ? {width: "300px"}
                        : nft.rarity === "4"
                        ? {width: "300px"}
                        : nft.rarity === "3"
                        ? {width: "150px"}
                        : nft.rarity === "2"
                        ? {width: "210px"}
                        : nft.rarity === "1"
                        ? {width: "300px"}
                        : nft.rarity === "6"
                        ? {width: "180px"}
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
                  {nft.rarity === "5"
                    ? "R5 Name"
                    : nft.rarity === "4"
                    ? "R4 Name"
                    : nft.rarity === "3"
                    ? "R3 Name"
                    : nft.rarity === "2"
                    ? "R2 Name"
                    : nft.rarity === "1"
                    ? "R1 Name"
                    : null}
                </h4>
                <div className="nft__item_action mb-4">
                  <span onClick={openModal(nft.rarity, nft.nftid)}>
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

      {/* GO TO NFT MODAL*/}
      <Modal show={showModal === true}>
        <Modal.Body className="nft_shadow text-center text-white gradient-box-shadow position-relative">
          <div className="gradient-box-shadow-inner">
            <h3>{t("mysteryBox.label")}</h3>
            <Row className="justify-content-center">
              <Row className="justify-content-center mt-3">
                <Col md={5}>
                  <div className="position-relative">
                    {/* <Image
                      src={
                        rarity === "5"
                          ? nft5
                          : rarity === "4"
                          ? nft4
                          : rarity === "3"
                          ? nft3
                          : rarity === "2"
                          ? nft2
                          : rarity === "1"
                          ? nft1
                          : null
                      }
                      className="img-fluid img-rounded mb-sm-30"
                      alt=""
                    /> */}
                  </div>
                </Col>
              </Row>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Inventory;
