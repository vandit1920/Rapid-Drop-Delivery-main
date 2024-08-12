import DriverNav from '../Components/DriverNav'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Axios from 'axios'
import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink, DropDown } from "./common"
import '../styles/login.css'

export default function DriverDropoffs() {

    const { driver_id } = useParams()
    const [dropoffs, setDropoffs] = useState("")
    const [showResults, setShowResults] = useState("")
    const [location, setLocation] = useState("")

    useEffect(() => {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/driver/dropoffs', {
            driver_id: driver_id
        })
            .then(data => {
                setDropoffs(data.data.dropoffs)
                setShowResults(true)
            })

    }, [])

    function handleSubmit(event) {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/driver/notify', {
            driver_id: driver_id,
            location: location
        })

        event.preventDefault()
    }

    return (
        <>
            <DriverNav id={driver_id}></DriverNav>
            {showResults && <BoxContainer className="center">
                <h2>Confirm after dropping off at desination location</h2>
                <FormContainer>
                    <DropDown value={location} onChange={(e) => {
                        setLocation(e.target.value)
                    }}>
                        <option value="">Select Dropoff Location</option>
                        {dropoffs.map((dropoff, index) => (
                            <option key={index} value={dropoff}>{dropoff}</option>
                        ))}
                    </DropDown>
                </FormContainer>
                <SubmitButton type="submit" onClick={handleSubmit}>Picked up</SubmitButton> 
            </BoxContainer>}
        </>
    )

}