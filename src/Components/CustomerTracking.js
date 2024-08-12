import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink } from "./common"
import React, { useState } from "react";
import { Marginer } from "./marginer";
import Navbar from "./Navbar"
import { APIProvider,
         Map,
         AdvancedMarker,
         Pin,
         InfoWindow,
         } from "@vis.gl/react-google-maps"
import '../styles/login.css'
import Axios from 'axios'
import { useParams } from "react-router-dom"

export default function CustomerTracking(props) {

    const [trackingId, setTrackingId] = useState("")
    const [trackingSent, setTrackingSent] = useState(false)
    const [position, setPosition] = useState("")
    const { user_id } = useParams()
    const [invalidTacking, setInvalidTracking] = useState(false)
    const [wrongTracking, setWrongTracking] = useState(false)
    const [invalidDelivery, setInvalidDelivery] = useState(false)

    function handleTrackingSubmit(event) {

        if (trackingId.length < 24) {
            setInvalidTracking(true)
        } else {
            setInvalidTracking(false)

            Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/customer/location', {
                trackingId: trackingId
            })
            .then(data => {

                const no_delivery = data.data.no_delivery

                console.log(`no delivery is ${no_delivery}`)

                if (no_delivery) {
                    setWrongTracking(true)
                } else {
                    setWrongTracking(false)

                    const no_driver = data.data.no_driver

                    if (no_driver) {
                        setInvalidDelivery(true)
                    } else {
                        setInvalidDelivery(false)

                        setPosition({lat: parseFloat(data.data.lat), lng: parseFloat(data.data.lng)})
                        setTrackingSent(true)
                    }
                }
            })
        }

        event.preventDefault()
    }

    return (
        <>
            <Navbar id={user_id}></Navbar>
            {!trackingSent && <BoxContainer className="center">
    <FormContainer>
        <Input type="trackingId" placeholder="Tracking ID" onChange={(e) => {
            setTrackingId(e.target.value)
        }}/>
    </FormContainer>
        <Marginer direction="vertical" margin="1.6em"/>
        <SubmitButton type="submit" onClick={handleTrackingSubmit}>Check Location</SubmitButton>
</BoxContainer>}
            {console.log(position)}
            {trackingSent && 
            <APIProvider apiKey="AIzaSyCxd2YX3TN44rhNREIc3-VdbIda1xByl9Y">
                <div style={{height: "100vh"}}>
                    <Map zoom={9} center={position} mapId="647a65bedb86caa4">
                        <AdvancedMarker position={position}>
                        </AdvancedMarker>
                    </Map>
                </div>
            </APIProvider>}
        {wrongTracking && <div>
            <h3 className="center">There is no delivery with this tracking ID</h3>
            </div>}
            {invalidTacking && <div>
            <h3 className="center">Tracking ID is invalid</h3>
            </div>}
            {invalidDelivery && <div>
            <h3 className="center">There has not been a delivery driver assigned to this delivery yet. Please check back soon!</h3>    
            </div>}
        </>
    )

}