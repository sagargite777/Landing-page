import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import main_1 from "../Assets/main_1.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container" id="home">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">STARLINK MISSION</h1>
          <p className="primary-text">
            An international space research organisation that involve to
            discover the new space things
          </p>
          <button className="secondary-button">
            Rewatch <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={main_1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
