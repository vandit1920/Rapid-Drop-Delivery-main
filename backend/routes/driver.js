const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongodb')

router.use(express.urlencoded({ extended: true }))

router.route('/')
    .get((req, res) => {
        res.send("driver route")
    })

router.route('/login')
    .get((req, res) => {
        res.send("driver login")
    })
    .post(async (req, res) => {
        const { email, password } = req.body

        const Driver = require('../models/Driver')
        const drivers = await Driver.find({ email: email })
        const found_driver = drivers[0]

        if (found_driver.password === password) {
            res.json({
                "continue": true,
                "driver_id": found_driver.id
            })
        } else {
            res.json({
                "continue": false
            })
        }

    })

router.route('/update')
    .get((req, res) => {
        res.send("update route")
    })
    .post(async (req, res) => {
        const { driver_id, lat, lng } = req.body

        const Driver = require('../models/Driver')
        const drivers = await Driver.find({ _id: new ObjectId(driver_id) })
        const found_driver = drivers[0]

        found_driver.lat = lat
        found_driver.lng = lng

        found_driver.save()
    })

router.route('/pickups')
    .get((req, res) => {
        res.send("pickups route")
    })
    .post(async (req, res) => {
        const { driver_id } = req.body

        const Driver = require('../models/Driver')
        const drivers = await Driver.where({ _id: new ObjectId(driver_id) })
        const found_driver = drivers[0]

        res.json({
            "pickups": found_driver.deliveries
        })
    })

router.route('/getdropoffs')
    .get((req, res) => {
        res.send("getting dropoffs")
    })
    .post(async (req, res) => {
        const { driver_id, location } = req.body

        const Driver = require('../models/Driver')
        const drivers = await Driver.where({ _id: new ObjectId(driver_id) })
        const found_driver = drivers[0]

        console.log(found_driver.name)

        const Delivery = require('../models/Delivery')
        const deliveries = await Delivery.where({ customer_pickup: location })
        const found_delivery = deliveries[0]

        found_driver.dropoffs.push(found_delivery.customer_dropoff)
        found_driver.deliveries = found_driver.deliveries.filter(pickup => {
            return pickup != location
        })

        found_driver.save()
    })

router.route('/dropoffs')
    .get((req, res) => {
        res.send("dropoffs route")
    })
    .post(async (req, res) => {
        const { driver_id } = req.body

        const Driver = require('../models/Driver')
        const drivers = await Driver.where({ _id: new ObjectId(driver_id) })
        const found_driver = drivers[0]

        res.json({
            "dropoffs": found_driver.dropoffs
        })
    })

router.route('/notify')
    .get((req, res) => {
        res.send("notify route")
    })
    .post(async (req, res) => {
        const { driver_id, location } = req.body
        
        const Driver = require('../models/Driver')
        const drivers = await Driver.where({ _id: new ObjectId(driver_id) })
        const found_driver = drivers[0]

        found_driver.dropoffs = found_driver.dropoffs.filter(dropoff => {
            return dropoff != location
        })

        found_driver.save()
    })

router.route('/name')
    .get((req, res) => {
        res.send("get driver's name")
    })
    .post(async (req, res) => {
        const { driver_id } = req.body

        const Driver = require('../models/Driver')
        const drivers = await Driver.where({ _id: new ObjectId(driver_id) })
        const found_driver = drivers[0]

        res.json({
            "fullname": found_driver.name
        })
    })

module.exports = router