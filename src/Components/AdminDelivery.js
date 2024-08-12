import AdminNav from '../Components/AdminNav'
import { useState, useEffect } from "react"
import Axios from 'axios'
import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink, DropDown } from "./common";
import '../styles/login.css'

export default function AdminDelivery() {

    const [drivers, setDrivers] = useState("")
    const [showResults, setShowResults] = useState(false)
    const [deliveries, setDeliveries] = useState([])
    const [selected, setSelected] = useState("")

    useEffect(() => {
        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/admin/delivery')
            .then(data => {
                setDrivers(data.data.drivers)
                setShowResults(true)
            })

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/admin/getdevs')
            .then(data => {
                setDeliveries(data.data.deliveries)
            })
    }, [])

    function handleSubmit(driver) {

        console.log(`delivery is ${selected}`)
        console.log(`for driver ${driver.name}`)

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/admin/assign', {
            pickup_address: selected,
            name: driver.name
        })

    }

    return (
        <>
            <AdminNav></AdminNav>
            {showResults && <ul className="center">
                {drivers.map(driver => {

                    return <li>
                        <BoxContainer>
                            <FormContainer>
                                <h2>{driver.name}</h2>
                                <DropDown value={selected} onChange={(e) => {
                                    setSelected(e.target.value)
                                }}>
                                    <option value="">Select a delivery to assign to this driver</option>
                                    {deliveries.map((delivery, index) => (
                                        <option key={index}>{delivery.customer_pickup}</option>
                                    ))}
                                </DropDown>
                            </FormContainer>
                            <SubmitButton type="submit" onClick={() => {
                                handleSubmit(driver)
                            }}>Assign driver to delivery</SubmitButton>
                        </BoxContainer>
                    </li>
                })} 
            </ul>}
        </>
    )

}