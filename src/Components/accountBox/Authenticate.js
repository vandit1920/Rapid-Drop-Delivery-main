import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink } from "./common";
import { useNavigate, useParams } from "react-router-dom"
import Axios from 'axios'
import { useState } from 'react'
import '../../styles/login.css'

export default function Authenticate(props) {

    const navigate = useNavigate()
    const [entered_code, setEnteredCode] = useState("")
    const user_id = useParams()
    const [wrongCode, setWrongCode] = useState(false)

    function handleSubmit(event) {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/mfa/authenticate', {
            entered_code: entered_code,
            user_id: user_id
        })
            .then((data) => {
                const verified = data.data.verified
                const id = data.data.id

                if (verified) {
                    navigate(`/customer/${id}`)
                    setWrongCode(false)
                } else {
                    setWrongCode(true)
                }
            })

        event.preventDefault()
    }

    return (
        <>
            <BoxContainer className="center">
        <FormContainer>
            <Input placeholder="Google MFA code" onChange={(e) => {
                setEnteredCode(e.target.value)
            }}></Input>
        </FormContainer>
            <SubmitButton type="submit" onClick={handleSubmit}>Submit</SubmitButton>
    </BoxContainer>
            {wrongCode && <div>
                <h3 className="center">Wrong code. Please try again.</h3>
                </div>}
        </>
    )

}