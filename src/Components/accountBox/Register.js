import React, { useContext, useState } from "react";
import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink, DropDown } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useNavigate } from "react-router-dom"
import Axios from 'axios'
import '../../styles/login.css'

export default function Register(props){

    const [selectedOptionOne, setSelectedOptionOne] = useState("");
    const [selectedOptionTwo, setSelectedOptionTwo] = useState("");
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [security_question_1, setSecurity1] = useState("")
    const [answer_1, setAnswer1] = useState("")
    const [security_question_2, setSecurity2] = useState("")
    const [answer_2, setAnswer2] = useState("")

    const optionsOne = ["In what city were you born?", "What is the name of your favorite pet?", "What high school did you attend?", "What year was your father born?", "What year was your father (or mother) born?", "What sport did you play growing up?", "What is your oldest siblings middle name?", "In what city or town did your parents meet?"];
    const optionsTwo = optionsOne.filter((option) => option !== selectedOptionOne);

    const navigate = useNavigate()

    function switchToSignin() {
        navigate('/login')
    }

    function handleSubmit(event) {
        
        try {
            const r = Axios.put('https://api.chatengine.io/users/', {
                username: fullname, secret: fullname
            }, {
                headers: {
                    "private-key": "502e2bf2-8a3b-4acf-a433-6ff092bd14ab" 
                }
            })
        } catch (e) {

        }

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/register', {
            fullname: fullname,
            email: email,
            password: password,
            security_question_1: security_question_1,
            answer_1: answer_1,
            security_question_2: security_question_2,
            answer_2: answer_2
        })
            .then((data) => {
                const user_id = data.data.user_id

                console.log(`user id is ${user_id}`)

                navigate(`/mfa/setup/${user_id}`)
            })

        event.preventDefault()
    }

    return <BoxContainer className="center">
        <FormContainer>
            <Input type="text" placeholder="Full Name" onChange={(e) => {
                setFullname(e.target.value)
            }}/>
            <Input type="email" placeholder="Email" onChange={(e) => {
                setEmail(e.target.value)
            }}/>
            <Input type="password" placeholder="Password" onChange={(e) => {
                setPassword(e.target.value)
            }}/>
            <Input type="password" placeholder="Confirm Password"/>
            <DropDown value={selectedOptionOne} onChange={(e) => {const value = e.target.value;
                setSecurity1(value)
                setSelectedOptionOne(value);
                //reset second dropdown when the first dropdown changes
                setSelectedOptionTwo(""); }}>
                <option value="">Select First Security Question</option>
                {optionsOne.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </DropDown>
            <Input type="text" placeholder="Answer" onChange={(e) => {
                setAnswer1(e.target.value)
            }}/>
            <DropDown value={selectedOptionTwo} onChange={(e) => {
                setSelectedOptionTwo(e.target.value)
                setSecurity2(e.target.value)
            }}>
                <option value="">Select Second Security Question</option>
                {optionsTwo.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </DropDown>
            <Input type="text" placeholder="Answer" onChange={(e) => {
                setAnswer2(e.target.value)
            }}/>
        </FormContainer>
            <Marginer direction="vertical" margin={10}/>
            <SubmitButton type="submit" onClick={handleSubmit}>Sign Up</SubmitButton>
            <Marginer direction="vertical" margin="1.6em"/>
            <MutedLink href="#">Already have an account? <BoldLink href="#" onClick={switchToSignin}>Log In</BoldLink></MutedLink>
    </BoxContainer>
    
}