import AdminNav from '../Components/AdminNav'
import '../styles/login.css'
import BannerImage from "../Assets/truck1.png";

export default function AdminHome() {

    return (
        <>
            <AdminNav></AdminNav>
            <h2 className="center welcome">Admin Dashboard</h2>
            <div className="home-image-section">
                <img src={BannerImage} alt="" />
            </div>
        </>
    )

}