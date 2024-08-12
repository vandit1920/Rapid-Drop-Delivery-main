import Navbar from '../Components/Navbar'
import { useParams } from "react-router-dom"
import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink, DropDown } from "./common"
import '../styles/login.css'
import { useState } from "react"
import Axios from "axios"

export default function Review() {

    const { serviceName, user_id } = useParams()
    const [review, setReview] = useState("")
    const [rating, setRating] = useState("")

    function handleSubmit(event) {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/review', {
            name: serviceName,
            review: review,
            rating: rating
        })

        event.preventDefault()
    }

    return (
        <>
            <Navbar id={user_id}></Navbar>
            <BoxContainer className="center">
                <FormContainer>
                    <h3>Service: {serviceName}</h3>
                    <h3>How was your experience?</h3>
                    <Input type="text" onChange={(e) => {
                        setReview(e.target.value)
                    }}></Input>
                    <h3>Enter a rating between 1-5</h3>
                    <Input type="text" onChange={(e) => {
                        setRating(e.target.value)
                    }}></Input>
                </FormContainer>
                <SubmitButton type="submit" onClick={handleSubmit}>Submit review</SubmitButton>
            </BoxContainer>
        </>
    )

}