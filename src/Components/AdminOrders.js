import AdminNav from '../Components/AdminNav'
import { useState, useEffect } from "react"
import Axios from 'axios'
import '../styles/login.css'

export default function AdminOrders() {

    const [orders, setOrders] = useState("")
    const [showResults, setShowResults] = useState("")

    useEffect(() => {
        
        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/admin/orders')
            .then(data => {
                setOrders(data.data.orders)
                setShowResults(true)
            })

    }, [])

    return(
        <>
            <AdminNav></AdminNav>
            {showResults && <ul className="center">
                {orders.map(order => {
                    return <li>
                        <h2>{order.customer_name}</h2>
                        <h3>{order.customer_email}</h3>
                        {order.receipts.map(receipt => {
                            return <div className="card">
                                <h4>{receipt.name}</h4>
                                <h4>{receipt.package_size}</h4>
                                <h4>{receipt.type}</h4>
                                <h4>{receipt.price}</h4>
                            </div>
                        })}
                    </li>
                })}    
            </ul>}
        </>
    )

}