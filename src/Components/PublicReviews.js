import PublicNav from '../Components/PublicNav'
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Axios from 'axios'
import '../styles/login.css'

export default function PublicReviews() {

    const { serviceName } = useParams()
    const [reviews, setReviews] = useState("")
    const [showResults, setShowResults] = useState(false)

    useEffect(() => {

        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/customer/reviews', {
            name: serviceName
        })
            .then(data => {
                setReviews(data.data.reviews)
                setShowResults(true)
            })

    }, [])

    return (
        <>
            <PublicNav></PublicNav>
            {showResults && <ul className="center">
                {reviews.map(review => {
                    return (
                        <li key={review} className="card">
                            <h3>{review}</h3>
                        </li>
                    )
                })}
            </ul>}
        </>
    )

}