import AdminNav from '../Components/AdminNav'
import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink, DropDown } from "./common";
import { useState } from "react"
import '../styles/login.css'
import Axios from 'axios'

const options = ["small", "medium", "large"]
const delivery_options = ["express", "five_day", "two_day"]

export default function AdminServices() {

    const [name, setName] = useState("")
    const [package_size, setPackageSize] = useState("")
    const [express, setExpress] = useState("")
    const [five_day, setFiveDay] = useState("")
    const [two_day, setTwoDay] = useState("")
    const [cur_name, setCurName] = useState("")
    const [delivery_option, setDeliveryOption] = useState("")
    const [price, setPrice] = useState("")

    function handleSubmit(event) {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/admin/add', {
            name: name,
            package_size: package_size,
            express: express,
            five_day, five_day,
            two_day: two_day
        })

        console.log("adding new service")
        console.log(`${package_size}`)

        event.preventDefault()
    }

    function modifyPrice(event) {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/admin/modify', {
            name: cur_name,
            delivery_option: delivery_option,
            package_size: package_size,
            price: price
        })

        event.preventDefault()
    }

    return (
        <>
            <AdminNav></AdminNav>
            <BoxContainer className="center">
                <h2>Add a new service</h2>
                <FormContainer>
                    <Input type="text" placeholder="Service name" onChange={(e) => {
                        setName(e.target.value)
            }       }/>
                    <DropDown value={package_size} onChange={(e) => {
                        setPackageSize(e.target.value)
                    }}>
                        <option value="">Select Package Size</option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </DropDown>
                    <Input type="text" placeholder="Express delivery price" onChange={(e) => {
                        setExpress(e.target.value)
            }       }/>
                    <Input type="text" placeholder="Five day delivery price" onChange={(e) => {
                        setFiveDay(e.target.value)
            }       }/>
                    <Input type="text" placeholder="Two day delivery price" onChange={(e) => {
                        setTwoDay(e.target.value)
            }       }/>
                </FormContainer>
                <SubmitButton type="submit" onClick={handleSubmit}>Add new service</SubmitButton>
            </BoxContainer>
            <BoxContainer className="center">
                <h2>Adjust the price of an existing service</h2>
                <FormContainer>
                    <Input type="text" placeholder="Service name" onChange={(e) => {
                        setCurName(e.target.value)
                    }}/>
                    <DropDown value={delivery_option} onChange={(e) => {
                        setDeliveryOption(e.target.value)
                    }}>
                        <option value="">Select Delivery Option</option>
                        {delivery_options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </DropDown>
                    <DropDown value={package_size} onChange={(e) => {
                        setPackageSize(e.target.value)
                    }}>
                        <option value="">Select Package Size</option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </DropDown>
                    <Input type="text" placeholder="New price" onChange={(e) => {
                        setPrice(e.target.value)
                    }}/>
                </FormContainer>
                <SubmitButton type="submit" onClick={modifyPrice}>Modify price</SubmitButton>
            </BoxContainer>
        </>
    )

}