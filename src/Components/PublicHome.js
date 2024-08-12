import PublicNav from '../Components/PublicNav'
import LogoutButton from './accountBox/LogoutButton'
import { FiArrowRight } from "react-icons/fi"
import BannerImage from "../Assets/truck1.png"

export default function PublicrHome() {

    return (
        <>
            <PublicNav></PublicNav>
            <div className="home-container">
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
        </>
    )

}