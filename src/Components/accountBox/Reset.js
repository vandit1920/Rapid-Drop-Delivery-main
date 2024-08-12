import React, { useContext, useState } from "react";
import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useNavigate } from "react-router-dom"
import Axios from "axios"
import '../../styles/login.css'

export default function ForgotPasswordForm(props){

    const [otp, setOTP] = useState("")
    const [email, setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const [userCode, setUserCode] = useState("")
    const [emailSuccess, setEmailSuccess] = useState(false)
    const [securitySuccess, setSecuritySuccess] = useState(false)
    const [password, setPassword] = useState("")
    const [user_id, setUserId] = useState("")
    const [security_question_1, setSecurity1] = useState("")
    const [security_question_2, setSecurity2] = useState("")
    const [answer_1, setAnswer1] = useState("")
    const [answer_2, setAnswer2] = useState("")
    const [user_answer, setUserAnswer] = useState("")
    const [wrongEmail, setWrongEmail] = useState(false)
    const [wrongCode, setWrongCode] = useState(false)
    const [wrongSecurity, setWrongSecurity] = useState(false)

    const navigate = useNavigate()

    function populateQuestions(id) {
        
        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/reset/populate', {
            user_id: id
        })
            .then((data) => {
                setSecurity1(data.data.security_question_1)
                setSecurity2(security_question_2)
                setAnswer1(answer_1)
                setAnswer2(answer_2)

                console.log("set all questions and answers")
            })

    }

    function switchToSignin() {
        navigate('/login')
    }

    function handleSendEmail(event) {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/reset', {
            email: email
        })
            .then((data) => {
                const failed = data.data.failed
                if (failed) {
                    setWrongEmail(true)
                } else {
                    setUserId(data.data.user_id)
                    setOTP(data.data.code)

                    populateQuestions(data.data.user_id)
                    setEmailSent(true)
                    setWrongEmail(false)
                }
            })

        event.preventDefault()
    }

    function handleSubmitCode(event) {

        console.log("checking code")

        console.log(`${otp} ${userCode}`)

        if (otp === userCode) {
            setEmailSuccess(true)
            setWrongCode(false)
        } else {
            setWrongCode(true)
        }

        event.preventDefault()
    }

    function handleSubmitSecurity(event) {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/reset/check', {
            user_id: user_id,
            user_answer: user_answer
        })
            .then((data) => {
                const correct = data.data.correct

                console.log(`continue: ${correct}`)

                if (correct) {
                    setSecuritySuccess(true)
                    setWrongSecurity(false)
                } else {
                    setWrongSecurity(true)
                }
            })

        event.preventDefault()
    }

    function handleSubmitPassword(event) {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/reset/new', {
            user_id: user_id,
            password: password
        })
            .then((data) => {
                navigate('/login')
            })
    
        event.preventDefault()
    }

    return (
        <>
            {!emailSent &&
             !emailSuccess && 
             !securitySuccess && <BoxContainer className="center">
    <FormContainer>
        <Input type="email" placeholder="Email" onChange={e => {
            setEmail(e.target.value)
        }}/>
    </FormContainer>
        <Marginer direction="vertical" margin={10}/>
        <SubmitButton type="submit" onClick={handleSendEmail}>Send Code</SubmitButton>
        <Marginer direction="vertical" margin="1.6em"/>
        <MutedLink href="#">Back to <BoldLink href="#" onClick={switchToSignin}>Signin</BoldLink></MutedLink>
</BoxContainer>}
            {emailSent && 
             !emailSuccess && 
             !securitySuccess && <BoxContainer className="center">
    <FormContainer>
        <Input type="userCode" placeholder="Code" onChange={e => {
            setUserCode(e.target.value)
        }}/>
    </FormContainer>
        <Marginer direction="vertical" margin={10}/>
        <SubmitButton type="submit" onClick={handleSubmitCode}>Submit</SubmitButton>
        <Marginer direction="vertical" margin="1.6em"/>
        <MutedLink href="#">Back to <BoldLink href="#" onClick={switchToSignin}>Signin</BoldLink></MutedLink>
</BoxContainer>}
            {emailSuccess && 
             !securitySuccess && <BoxContainer className="center">
                {security_question_1}
    <FormContainer>
        <Input type="user_answer" placeholder="Answer" onChange={e => {
            setUserAnswer(e.target.value)
        }}/>
    </FormContainer>
        <Marginer direction="vertical" margin={10}/>
        <SubmitButton type="submit" onClick={handleSubmitSecurity}>Submit</SubmitButton>
        <Marginer direction="vertical" margin="1.6em"/>
        <MutedLink href="#">Back to <BoldLink href="#" onClick={switchToSignin}>Signin</BoldLink></MutedLink>
</BoxContainer>}
            {securitySuccess && <BoxContainer className="center">
                <h2>Set your new password</h2>
    <FormContainer>
        <Input type="password" placeholder="Password" onChange={e => {
            setPassword(e.target.value)
        }}/>
    </FormContainer>
        <Marginer direction="vertical" margin={10}/>
        <SubmitButton type="submit" onClick={handleSubmitPassword}>Submit</SubmitButton>
        <Marginer direction="vertical" margin="1.6em"/>
        <MutedLink href="#">Back to <BoldLink href="#" onClick={switchToSignin}>Signin</BoldLink></MutedLink>
</BoxContainer>}
        {wrongEmail && <div>
            <h3 className="center">There is no account associated with that email.</h3>
            </div>}
        {wrongCode && <div>
            <h3 className="center">Wrong code. Please try again.</h3>
            </div>}
        {wrongSecurity && <div>
            <h3 className="center">Wrong answer. Please try again.</h3>
            </div>}
        </>
    )
}