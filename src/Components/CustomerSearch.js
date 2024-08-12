import React, { useState } from "react";
import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink, DropDown } from "./common";
import { Marginer } from "./marginer";
import Navbar from "./Navbar.js"
import { Link, useParams } from "react-router-dom"
import Axios from 'axios'
import '../styles/login.css'

export default function CustomerSearch(props) {

    const [selectedOption, setSelectedOption] = useState("")
    const [showResults, setShowResults] = useState(false)
    const [services, setServices] = useState("")

    const optionsOne = ["Small", "Medium", "Big"];
    const { user_id } = useParams()

    function handleSearchSubmit(event) {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/customer/services', {
            package_size: selectedOption.toLowerCase()
        })
            .then((data) => {
                console.log(data)
                const temp_services = data.data.services

                console.log(temp_services)

                setServices(temp_services)

                setShowResults(true)
            })

        event.preventDefault()
    }

    function handleServiceClick(service) {
        console.log(service.name)
    }

    function handleGetReviews(name) {

    }

    return (
        <>
            <Navbar id={user_id}></Navbar>
            <BoxContainer className="center">
                <FormContainer>
                    <h3>Pickup Address</h3>
                    <Input placeholder="To location"/>
                    <h3>Delivery Address</h3>
                    <Input placeholder="From location"/>
                    <Marginer direction="vertical" margin="1.6em"/>
                    <DropDown value={selectedOption} onChange={(e) => {const value = e.target.value;
                        setSelectedOption(value)
                    }}>
                    <option value="">Item Dimensions</option>
                    {optionsOne.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
            </DropDown>
                </FormContainer>
            <Marginer direction="vertical" margin="1.6em"/>
            <SubmitButton type="submit" onClick={handleSearchSubmit}>Search</SubmitButton>
            </BoxContainer>
            {showResults && <ul className="center">
                {services.map((service) => {

                return (<li key={service} className="card">
                        <h2>{service.name}</h2>
                        <h2>Service rating: {service.rating} out of 5 stars</h2>
                        <Link to={`/customer/reviews/${service.name}/${user_id}`} className="link">Read the reviews</Link>
                        <h3>Prices starting at ${service.lowest_price}</h3>
                        <Link to={`/customer/services/${service.name}/${service.package_size}/${user_id}`} className="link">See more info</Link>
                    </li>)
                    })}
            </ul>}
        </>
    )

}