import Navbar from '../Components/Navbar'
import { useState, useEffect } from 'react'
import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink, DropDown } from "./common"
import { useParams } from "react-router-dom"
import '../styles/login.css'
import Axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Checkout() {

    const { serviceName, packageSize, type, user_id } = useParams()
    const [price, setPrice] = useState("")
    const [pickup, setPickup] = useState("")
    const [dropoff, setDropoff] = useState("")
    const navigate = useNavigate()

    useEffect(() => {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/checkout', {
            name: serviceName,
            package_size: packageSize,
            type: type
        })
            .then((data) => {
                const price = data.data.price

                setPrice(price)
            })

    }, [])

    function handleOrder(event) {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/checkout/save', {
            name: serviceName,
            package_size: packageSize,
            type: type,
            price: price,
            user_id: user_id,
            pickup: pickup,
            dropoff: dropoff
        })
            .then(() => {
                navigate(`/customer/${user_id}`)
            })

        event.preventDefault()
    }

    return (
        <>
            <Navbar id={user_id} ></Navbar>
            <BoxContainer className="center">
                <h2>Your order details</h2>
                <h3>Service: {serviceName}</h3>
                <h3>Package size: {packageSize}</h3>
                <h3>Delivery type: {type}</h3>
                <h3>Total: ${price}</h3>
                <FormContainer>
                    <h3>Confirm pickup address</h3>
                    <Input type="text" placeholder="Pickup address" onChange={(e) => {
                        setPickup(e.target.value)
                    }}/>
                    <h3>Confirm dropoff address</h3>
                    <Input type="text" placeholder="Dropoff address" onChange={(e) => {
                        setDropoff(e.target.value)
                    }}/>
                </FormContainer>
                <SubmitButton type="submit" onClick={handleOrder}>Confirm Order</SubmitButton>
            </BoxContainer>
        </>
    )
}