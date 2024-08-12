import DriverNav from '../Components/DriverNav'
import { useParams } from "react-router-dom"
import BannerImage from "../Assets/truck1.png"

export default function DriverHome() {

    const { driver_id } = useParams()

    return (
        <>
            <DriverNav id={driver_id}></DriverNav>
            <h2 className="center welcome">Delivery Driver Dashboard</h2>
            <div className="home-image-section">
                <img src={BannerImage} alt="" />
            </div>
        </>
    )

}