import PublicNav from '../Components/PublicNav'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink, DropDown } from "./common";
import { useState, useEffect } from 'react'
import Axios from 'axios'
import '../styles/login.css'

export default function PublicDetails(props) {

    const { serviceName, packageSize } = useParams()
    const [ showResults, setShowResults ] = useState(false)
    const [ express, setExpress ] = useState("")
    const [ fiveDay, setFiveDay ] = useState("")
    const [ twoDay, setTwoDay ] = useState("")

    const navigate = useNavigate()

    const { user_id } = useParams()

    useEffect(() => {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/customer/package', {
            package_size: packageSize,
            name: serviceName
        })
            .then((data) => {
                setExpress(data.data.express)
                setFiveDay(data.data.five_day)
                setTwoDay(data.data.two_day)
                setShowResults(true)
                console.log(data)
            })

    }, [])

    console.log(`service name: ${serviceName} package size: ${packageSize}`)

    function handleExpress(event) {

        navigate(`/customer/checkout/${serviceName}/${packageSize}/express/${user_id}`)

        event.preventDefault()
    }

    function handleTwoDay(event) {
        event.preventDefault()
    }

    function handleFiveDay(event) {
        event.preventDefault()
    }

    return (
        <>
            <PublicNav></PublicNav>
            <BoxContainer className="center">
                <h3 className="card">Express: ${express}</h3>
                <h3 className="card">2 Day Shipping: ${twoDay}</h3>
                <h3 className="card">5 Day Shipping: ${fiveDay}</h3>
            </BoxContainer>
        </>
    )
}