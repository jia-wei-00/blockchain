import React from "react";
import { useTranslation } from "react-i18next";
import nft1 from "../../assets/img/home/1.png";
import nft2 from "../../assets/img/home/2.png";
import nft3 from "../../assets/img/home/3.png";
import nft4 from "../../assets/img/home/4.png";
import nft5 from "../../assets/img/home/5.png";
import hovernft1 from "../../assets/img/home/name1.png";
import hovernft2 from "../../assets/img/home/name2.png";
import hovernft3 from "../../assets/img/home/name3.png";
import hovernft4 from "../../assets/img/home/name4.png";
import hovernft5 from "../../assets/img/home/name5.png";
import background from "../../assets/img/home/bg.png";
import auditedLeft from "../../assets/img/home/Audited-left.png";
import auditedRight from "../../assets/img/home/Audited-right.png";
import { Row, Image } from "react-bootstrap";

const Home = () => {
  const { t } = useTranslation();

  function buyToken(value) {
    if (value == "spal") {
      window.open(
        "https://pancake.kiemtienonline360.com/#/swap?outputCurrency=0x292Fe9020909ef49864447B9f32583681Eb3e64C",
        "_blank"
      );
    } else if (value == "spaceshard") {
      window.open(
        "https://pancake.kiemtienonline360.com/#/swap?outputCurrency=0xadbaCba0C09c945BA65023548879523bCFf270D1",
        "_blank"
      );
    }
  }

  return (
    <div
      className="home-bg"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {/* <Image className="home-bg" src={background} alt="background"></Image> */}
      <section className="container">
        <Row className="justify-content-center text-center">
          <div className="scroll home-margin">
            <div className="wrap-img wrap-img1">
              <Image className="nft-image img1" src={nft1}></Image>
              <Image
                className="nft-name"
                src={hovernft1}
                style={{ left: "-7px" }}
              ></Image>
            </div>

            <div className="wrap-img wrap-img1">
              <Image className="nft-image img2" src={nft2}></Image>
              <Image className="nft-name" src={hovernft2}></Image>
            </div>

            <div className="wrap-img wrap-img1">
              <Image className="nft-image img1" src={nft3}></Image>
              <Image
                className="nft-name"
                src={hovernft3}
              ></Image>
            </div>
            <div className="wrap-img wrap-img1">
              <Image className="nft-image img4" src={nft4}></Image>
              <Image className="nft-name" src={hovernft4}></Image>
            </div>
            <div className="wrap-img wrap-img1">
              <Image className="nft-image img5" src={nft5}></Image>
              <Image className="nft-name" src={hovernft5}></Image>
            </div>
          </div>
          <hr
            className="hr-shadow"
            style={{
              height: 5,
              width: "1000px",
              margin: "0px 30px 40px 30px",
            }}
          />
          <div className="home-p mb-3">
            {t("ownFirstNFT.label")}
            <br />
            <span className="gradient-text">{t("spaceAlpaca.label")}</span>
          </div>
          <button
            className="btn-main home-btn-size box-shadow-purple"
            onClick={() => buyToken("spal")}
          >
            {t("buySpal.label")}
          </button>
          <button
            className="btn-main home-btn-size box-shadow-purple"
            onClick={() => buyToken("spaceshard")}
          >
            {t("buySpaceShard.label")}
          </button>
          <div className="audit-div mt-5">
            <Image className="audited" src={auditedLeft}></Image>
            <Image className="audited" src={auditedRight}></Image>
          </div>
        </Row>
      </section>
      <div className="spacer-30"></div>
    </div>
  );
};

export default Home;
