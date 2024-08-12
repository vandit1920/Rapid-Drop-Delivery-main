import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink } from "./common";
import { useState, useEffect } from "react"
import '../styles/login.css'
import Axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function DriverLogin() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleSubmit(event) {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/driver/login', {
            email: email,
            password: password
        })
            .then((data) => {
                const correct = data.data.continue
                const driver_id = data.data.driver_id

                if (correct) {
                    navigate(`/driver/${driver_id}`)
                }
            })

        event.preventDefault()
    }

    return (
        <>
            <BoxContainer className="center">
                <FormContainer>
                    <Input type="email" placeholder="Email" onChange={e => {
                        setEmail(e.target.value)
                    }}/>
                    <Input type="password" placeholder="Password" onChange={e => {
                        setPassword(e.target.value)
                    }}/>
                </FormContainer>
                <SubmitButton type="submit" onClick={handleSubmit}>Log In</SubmitButton>
            </BoxContainer>
        </>
    )

}