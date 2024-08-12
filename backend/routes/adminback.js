const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

router.route('/')
    .get((req, res) => {
        res.send("admin route")
    })

router.route('/delivery')
    .get((req, res) => {
        res.send("admin delivery route")
    })
    .post(async (req, res) => {
        const Driver = require('../models/Driver')

        const drivers = await Driver.where({})
        res.send({
            "drivers": drivers
        })

        /*
        const new_driver = new Driver({ name: "Samantha Walkerton", email: "sam@gmail.com", password: "sam"  })
        new_driver.save()
        */
    })

router.route('/getdevs')
    .get((req, res) => {
        res.send("getdevs route")
    })
    .post(async (req, res) => {
        console.log("getting deliveries")

        const Delivery = require('../models/Delivery')
        const avail_devs = await Delivery.where({ completed: false })

        res.send({
            "deliveries": avail_devs
        })
    })

router.route('/assign')
    .get((req, res) => {
        res.send("assign route")
    })
    .post(async (req, res) => {
        const { pickup_address, name } = req.body

        const Driver = require('../models/Driver')
        const drivers = await Driver.find({ name: name })
        const found_driver = drivers[0]

        found_driver.deliveries.push(pickup_address)
        found_driver.save()

        const Delivery = require('../models/Delivery')
        const deliveries = await Delivery.find({ customer_pickup: pickup_address })
        const found_delivery = deliveries[0]

        found_delivery.driver = name
        found_delivery.save()
    })

router.route('/orders')
    .get((req, res) => {
        res.send("orders route")
    })
    .post(async (req, res) => {
        console.log("getting past orders")

        const User = require('../models/User')
        const users = await User.find({ 'receipts': { $exists: true, $ne: [] } });

        const orders = []
        users.forEach(user => {
            orders.push({
                "customer_name": user.fullname,
                "customer_email": user.email,
                "receipts": user.receipts
            })
        })
        
        res.json({
            "orders": orders
        })
    })

router.route('/reviews')
    .get((req, res) => {
        res.send("reviews route")
    })
    .post(async (req, res) => {
        console.log("getting all reviews")

        const Review = require('../models/Review')
        const reviews = await Review.find({})

        res.json({
            "reviews": reviews
        })
    })

router.route('/add')
    .get((req, res) => {
        res.send("add route")
    })
    .post((req, res) => {
        const { name, package_size, express, five_day, two_day } = req.body

        const Service = require('../models/Service')
        const new_service = new Service({ name: name, package_size: package_size, express: express,
                                          five_day: five_day, two_day: two_day })
        new_service.save()
    })

router.route('/modify')
    .get((req, res) => {
        res.send("modify route")
    })
    .post(async (req, res) => {
        const { name, delivery_option, package_size, price } = req.body

        const Service = require('../models/Service')
        const services = await Service.where({ name: name }).where({ package_size: package_size })
        const found_service = services[0]

        if (delivery_option === "express") {
            found_service.express = price
        }
        else if (delivery_option === "five_day") {
            found_service.five_day = price
        }
        else if (delivery_option === "two_day") {
            found_service.two_day = price
        }

        found_service.save()
    })

module.exports = router