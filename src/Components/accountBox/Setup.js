import React, { useState, useEffect } from "react"
import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink } from "./common";
import { Marginer } from "../marginer";
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import '../../styles/login.css'

export default function Setup(props) {

    const navigate = useNavigate()
    const user_id = useParams()
    const [code, setCode] = useState("")

    useEffect(() => {
        Axios.get("https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/mfa/setup", {
            params: {
                user_id: user_id
            }
        })
            .then(response => {
                setCode(response.data.code)
            })
    }, [])

    function handleClick(event) {
        navigate('/login')

        event.preventDefault()
    }

    return <BoxContainer className="center">
        <img src={`${code}`}></img>
        <Marginer direction="vertical" margin={10}/>
        <SubmitButton type="submit" onClick={handleClick}>Click here when completed</SubmitButton>
    </BoxContainer>

}