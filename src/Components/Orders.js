import Navbar from '../Components/Navbar'
import { useEffect, useState } from "react"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"
import '../styles/login.css'

export default function Orders() {

    const [orders, setOrders] = useState([])
    const [showResults, setShowResults] = useState(false)
    const { user_id } = useParams()

    useEffect(() => {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/orders', {
            user_id: user_id
        })
            .then((data) => {
                setOrders(data.data.orders)
                setShowResults(true)
            })

    }, [])

    return (
        <>
            <Navbar id={user_id}></Navbar>
            {showResults && <ul className="center">
                {orders.map(order => {
                    return <li className="card">
                        <h3>Service: {order.name}</h3>
                        <h3>Package size: {order.package_size}</h3>
                        <h3>Delivery type: {order.type}</h3>
                        <h3>Price: {order.price}</h3>
                        <h3>Tracking ID: {order.tracking}</h3>
                        <Link to={`/customer/review/${order.name}/${user_id}`} className="link">Submit a review for this service</Link>
                    </li>
                })}
            </ul>}
        </>
    )
}