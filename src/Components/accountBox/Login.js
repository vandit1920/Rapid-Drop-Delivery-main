import React, { useState, useContext, useEffect } from "react";
import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useNavigate } from "react-router-dom"
import Axios from 'axios'
import ReCAPTCHA from "react-google-recaptcha"
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { gapi } from 'gapi-script'
import '../../styles/login.css'

const clientId = "73712902965-e3seb15rmsp7153hf80i69cdtbcrq07b.apps.googleusercontent.com"

export default function Login(props){
    
    const [user_id, setUserId] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [show_captcha, setShowCaptcha] = useState(false)
    const [showError, setShowError] = useState(false)

    const clientId = "73712902965-e3seb15rmsp7153hf80i69cdtbcrq07b.apps.googleusercontent.com"

    const navigate = useNavigate()

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        }

        gapi.load('client:auth2', start)
    })

    function onChange() {
        navigate(`/mfa/authenticate/${user_id}`)
    }

    function switchToSignup() {
        navigate('/register')
    }

    function switchToForgotPassword() {
        navigate('/reset')
    }

    function handleSubmit(event) {

        if (email === "admin") {
            if (password === "password") {

                console.log("correct admin login")

                navigate("/admin")
            }
        } else {
            Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/login', {
            email: email,
            password: password
        })
            .then((data) => {
                const id = data.data.user_id
                const correct_login = data.data.correct_login
                const show_captcha = data.data.show_captcha
                const failed = data.data.failed

                if (failed) {
                    console.log("wrong email and/or password")

                    setShowError(true)
                } else {
                    setShowError(false)
                    setUserId(id)
                    setShowCaptcha(show_captcha)

                    console.log(correct_login)
                    console.log(`show captcha? ${show_captcha}`)

                    if (correct_login && !show_captcha) {
                        navigate(`/mfa/authenticate/${id}`)
                    }
                }
            })
        }

        //navigate('/mfa/authenticate')

        event.preventDefault()
    }

    return (
        <>
            <BoxContainer className="center">
            <LoginButton></LoginButton>
        <FormContainer>
            <Input type="email" placeholder="Email" onChange={e => {
                setEmail(e.target.value)
            }}/>
            <Input type="password" placeholder="Password" onChange={e => {
                setPassword(e.target.value)
            }}/>
        </FormContainer>
            <Marginer direction="vertical" margin={10}/>
            <MutedLink href="#"><BoldLink href="#" onClick={switchToForgotPassword}>Forgot password?</BoldLink></MutedLink>
            <Marginer direction="vertical" margin="1.6em"/>
            <SubmitButton type="submit" onClick={handleSubmit}>Log In</SubmitButton>
            <Marginer direction="vertical" margin="1.6em"/>
            <MutedLink href="#">Don't have an account? <BoldLink href="#" onClick={switchToSignup}>Sign Up</BoldLink></MutedLink>
    </BoxContainer>
    {show_captcha && <ReCAPTCHA sitekey="6LceitUoAAAAACqk_JPQME2cfx_KKIVaoPRhdwrZ" onChange={onChange} className="center"/>}
    {showError && <div className="center">
            <h3>Wrong email and/or password. Please try again.</h3>
        </div>}
        </>
    )
}