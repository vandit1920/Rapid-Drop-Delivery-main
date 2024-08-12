import DriverNav from '../Components/DriverNav'
import { useParams } from "react-router-dom"
import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink } from "./common"
import { useState } from "react"
import '../styles/login.css'
import Axios from 'axios'

export default function DriverTracking() {

    const { driver_id } = useParams()
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")

    function handleSubmit(event) {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/driver/update', {
            driver_id: driver_id,
            lat: lat,
            lng: lng
        })

        event.preventDefault()
    }

    return (
        <>
            <DriverNav id={driver_id}></DriverNav>
            <BoxContainer className="center">
                <h2>Update your current location</h2>
                <FormContainer>
                    <Input type="text" placeholder="Your current latitude" onChange={e => {
                            setLat(e.target.value)
                        }}/>
                    <Input type="text" placeholder="Your current longitude" onChange={e => {
                            setLng(e.target.value)
                        }}/>
                </FormContainer>
                <SubmitButton type="submit" onClick={handleSubmit}>Update</SubmitButton>
            </BoxContainer>
        </>
    )

}