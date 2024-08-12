import DriverNav from '../Components/DriverNav'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Axios from 'axios'
import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink, DropDown } from "./common"
import '../styles/login.css'
import { useNavigate } from "react-router-dom"

export default function DriverPickups() {

    const {driver_id} = useParams()
    const [pickups, setPickups] = useState("")
    const [showResults, setShowResults] = useState(false)
    const [location, setLocation] = useState("")
    
    const navigate = useNavigate()

    useEffect(() => {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/driver/pickups', {
            driver_id: driver_id
        })
            .then((data) => {
                setPickups(data.data.pickups)
                setShowResults(true)
            })

    }, [])

    function handleSubmit(event) {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/driver/getdropoffs', {
            driver_id: driver_id,
            location: location
        })
            .finally(() => {
                console.log("navigating")

                navigate(`/driver/${driver_id}`)
            })

        event.preventDefault()
    }

    return (
        <>
            <DriverNav id={driver_id}></DriverNav>
            {showResults && <BoxContainer className="center">
                <h2>Confirm after picking up</h2>
                <FormContainer>
                    <DropDown value={location} onChange={(e) => {
                        setLocation(e.target.value)
                    }}>
                        <option value="">Select Pickup Location</option>
                        {pickups.map((pickup, index) => (
                            <option key={index} value={pickup}>{pickup}</option>
                        ))}
                    </DropDown>
                </FormContainer>
                <SubmitButton type="submit" onClick={handleSubmit}>Picked up</SubmitButton>    
            </BoxContainer>}
        </>
    )

}