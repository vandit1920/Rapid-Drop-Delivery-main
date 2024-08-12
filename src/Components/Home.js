import React from "react";
// import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/truck1.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import LogoutButton from './accountBox/LogoutButton'
import { useParams } from "react-router-dom"

const Home = () => {

  const { user_id } = useParams()

  return (
    <div className="home-container">
      <Navbar id={user_id} />
      <LogoutButton></LogoutButton>
      <div className="home-banner-container">
        {/* <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div> */}
        <div className="home-text-section">
          <h1 className="primary-heading">
          You need it, we deliver it
          </h1>
          <p className="primary-text">
          Businesses trust us for their delivery needs. 
          Join our network of satisfied partners and let us handle your logistics, so you can focus on what you do best.
            
          </p>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
