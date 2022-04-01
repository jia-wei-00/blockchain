import instagram from "../../assets/img/Insta.png";
import telegram from "../../assets/img/Tele.png";
import twitter from "../../assets/img/Twi.png";
import { Image, Button } from "react-bootstrap";

const Footer = () => {
  return (
    // <div className="footer">
    //   <div className="footer-btn">
    //     <a href="https://www.instagram.com/_spacealpaca/" target="_blank">
    //       <Image className="footer-img" src={instagram}></Image>
    //     </a>
    //     <a href="https://twitter.com/_SpaceAlpaca" target="_blank">
    //       <Image className="footer-img" src={twitter}></Image>
    //     </a>
    //     <a href="https://t.me/SpaceAlpacaAnnouncement" target="_blank">
    //       <Image className="footer-img" src={telegram}></Image>
    //     </a>
    //   </div>
    // </div>
    <div className="footer">
      <div className="footer-btn">
        <a href="https://www.instagram.com/_spacealpaca/">
          <Image className="footer-img" src={instagram}></Image>
        </a>
      </div>
      <div className="footer-btn">
        <a href="https://twitter.com/_SpaceAlpaca">
          <Image className="footer-img" src={twitter}></Image>
        </a>
      </div>
      <div className="footer-btn">
        <a href="https://t.me/SpaceAlpacaAnnouncement">
          <Image className="footer-img" src={telegram}></Image>
        </a>
      </div>
    </div>
  );
};

export default Footer;
