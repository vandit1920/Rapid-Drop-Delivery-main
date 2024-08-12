const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongodb')

router.use(express.urlencoded({ extended: true }))

const services = [
    {
        "name": "FedEx",
        "package_size": "medium",
        "price": 24.32
    },
    {
        "name": "USPS",
        "package_size": "small",
        "price": 13.45
    },
    {
        "name": "UPS",
        "package_size": "large",
        "price": 30.22
    }
]

router.route('/name')
    .get((req, res) => {
        res.send("get name")
    })
    .post(async (req, res) => {
        
        const { user_id } = req.body

        const User = require('../models/User')
        const users = await User.where({ _id: new ObjectId(user_id) })
        const found_user = users[0]

        if (found_user) {
            res.json({
                "fullname": found_user.fullname
            })
        }

    })

router.route('/home')
    .get((req, res) => {
        res.send("customer home route")
    })
    .post((req, res) => {
        const { source_address, destination_address, package_size } = req.body

        // TODO: get service details from db based on criteria

        console.log(package_size)

        const return_service = services.find(service => {
            return service.package_size === package_size
        })

        res.json({
            "name": return_service.name
        })
    })

router.route('/services')
    .get((req, res) => {
        res.send("services route")
    })
    .post(async (req, res) => {

        const { package_size } = req.body

        const Service = require('../models/Service')
        const services = await Service.find({ package_size: package_size })

        const result = []

        async function getReviews() {
            for (const service of services) {
                const Review = require('../models/Review')
                const reviews = await Review.find({ name: service.name })
                const found_review = reviews[0]

                let rating = 0

                if (found_review) {
                    rating = found_review.rating
                }

                const temp = {
                    name: service.name,
                    package_size: service.package_size,
                    lowest_price: service.five_day,
                    rating: rating
                }

                result.push(temp)
            }
        }

        await getReviews()

        res.json({
            "services": result
        })
    })

router.route('/reviews')
    .get((req, res) => {
        res.send("reviews route")
    })
    .post(async (req, res) => {
        const { name } = req.body

        const Review = require('../models/Review')
        const reviews = await Review.find({ name: name })
        const found_review = reviews[0]

        res.json({
            "reviews": found_review.reviews
        })

        
        
        console.log(`getting reviews for ${name}`)
    })

router.route('/package')
    .get((req, res) => {
        res.send("package route")
    })
    .post(async (req, res) => {

        const { package_size, name } = req.body

        const Service = require('../models/Service')
        const services = await Service.where({ package_size: package_size }).where({ name: name })

        const found_service = services[0]

        console.log("found this service")
        console.log(found_service)

        res.json({
            "name": found_service.name,
            "package_size": found_service.package_size,
            "express": found_service.express,
            "five_day": found_service.five_day,
            "two_day": found_service.two_day
        })
    })

router.route('/location')
    .get((req, res) => {
        res.send("location route")
    })
    .post(async (req, res) => {

        console.log("calling location route")

        const { trackingId } = req.body

        const Delivery = require('../models/Delivery')
        const deliveries = await Delivery.where({ _id: new ObjectId(trackingId) })
        const found_delivery = deliveries[0]

        if (!found_delivery) {
            res.json({
                "no_delivery": true
            })
        } else {
            const driver_name = found_delivery.driver

            if (!driver_name) {
                res.json({
                    "no_driver": true
                })
            } else {
                const Driver = require('../models/Driver')
                const drivers = await Driver.where({ name: driver_name })
                const found_driver = drivers[0]

                res.json({
                    "lat": found_driver.lat,
                    "lng": found_driver.lng
                })
            }
        }
    })


module.exports = router