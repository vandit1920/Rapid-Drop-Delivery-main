const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

router.route('/')
    .get((req, res) => {
        res.send("review route")
    })
    .post(async (req, res) => {
        const { name, review, rating } = req.body

        console.log(`${name} | ${review} | ${rating}`)

        const Review = require('../models/Review')
        const reviews = await Review.find({ name: name })
        const found_service = reviews[0]

        if (found_service) {
            console.log("found")

            const old_rating = parseFloat(found_service.rating)
            const new_rating = parseFloat(rating)
            const total = found_service.reviews.length + 1

            const average = ((old_rating + new_rating) / total)

            found_service.rating = average.toString()
            found_service.reviews.push(review)

            found_service.save()

        } else {
            const new_reviews = []
            new_reviews.push(review)

            const new_review = new Review({
                name: name,
                reviews: new_reviews,
                rating: rating
            })

            new_review.save()
        }
    })

module.exports = router