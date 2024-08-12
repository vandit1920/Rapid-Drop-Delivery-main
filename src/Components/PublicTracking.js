import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink } from "./common"
import React, { useState } from "react";
import { Marginer } from "./marginer";
import PublicNav from '../Components/PublicNav'
import { APIProvider,
         Map,
         AdvancedMarker,
         Pin,
         InfoWindow,
         } from "@vis.gl/react-google-maps"
import '../styles/login.css'

export default function PublicTracking(props) {

    const [trackingId, setTrackingId] = useState("")
    const [trackingSent, setTrackingSent] = useState(false)

    const position = { lat: 53.54, lng: 10 }

    function handleTrackingSubmit(event) {
        setTrackingSent(true)

        event.preventDefault()
    }

    return (
        <>
            <PublicNav></PublicNav>
            {!trackingSent && <BoxContainer className="center">
    <FormContainer>
        <Input type="trackingId" placeholder="Tracking ID"/>
    </FormContainer>
        <Marginer direction="vertical" margin="1.6em"/>
        <SubmitButton type="submit" onClick={handleTrackingSubmit}>Check Location</SubmitButton>
</BoxContainer>}
            {trackingSent && 
            <APIProvider apiKey="AIzaSyDvHC8V78ZBL9qWPmUm3Nr2jdxyzSpd16w">
                <div style={{height: "100vh"}}>
                    <Map zoom={9} center={position} mapId="e1609fcf179dee1f">
                        <AdvancedMarker position={position}>
                        </AdvancedMarker>
                    </Map>
                </div>
            </APIProvider>}
        </>
    )

}