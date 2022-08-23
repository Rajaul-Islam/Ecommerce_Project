import React from "react";
import "./Footer.css";

import playStore from "../../../image/playstore.png";
import appStore from "../../../image/Appstore.png";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="lefFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download app for android and apple</p>
        <img src={playStore} alt="" />
        <img src={appStore} alt="" />
      </div>
      <div className="midFooter">
        <h1>COMMERCE.</h1>
        <p>High quality is our first priority</p>
        <p>Copyright 2022 &copy; buyDream</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.facebook.com/profile.php?id=100077654223832">
          Facebook
        </a>
        <a href="https://www.facebook.com/profile.php?id=100077654223832">
          Instagram
        </a>
        <a href="https://www.facebook.com/profile.php?id=100077654223832">
          Twitter
        </a>
      </div>
    </footer>
  );
};

export default Footer;
