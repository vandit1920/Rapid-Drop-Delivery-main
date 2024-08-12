import AdminNav from '../Components/AdminNav'
import { useState, useEffect } from "react"
import Axios from 'axios'
import '../styles/login.css'

export default function AdminReviews() {

    const [reviews, setReviews] = useState("")
    const [showResults, setShowResults] = useState("")

    useEffect(() => {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/admin/reviews')
            .then(data => {
                setReviews(data.data.reviews)
                setShowResults(true)
            })

    }, [])

    return (
        <>
            <AdminNav></AdminNav>
            {showResults && <ul className="center">
                {reviews.map(review => {
                    return <li>
                        <h2>{review.name}</h2>
                        {review.reviews.map(message => {
                            return <h3 className="card">{message}</h3>
                        })}
                    </li>
                })}    
            </ul>}
        </>
    )

}