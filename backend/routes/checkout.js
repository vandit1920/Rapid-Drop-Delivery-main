const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongodb')

router.use(express.urlencoded({ extended: true }))

router.route('/')
    .get((req, res) => {
        res.send("checkout route")
    })
    .post(async (req, res) => {
        const { name, package_size, type } = req.body

        const Service = require('../models/Service')
        const services = await Service.where({ name: name }).where({ package_size: package_size })
        const found_service = services[0]

        if (type === "express") {
            res.json({
                "price": found_service.express
            })
        }
        else if (type === "two") {
            res.json({
                "price": found_service.two_day
            })
        }
        else if (type === "five") {
            res.json({
                "price": found_service.five_day
            })
        }
    })

router.route('/save')
    .get((req, res) => {
        res.send("checkout save route")
    })
    .post(async (req, res) => {
        const { name, package_size, type, price, user_id, pickup, dropoff } = req.body

        console.log(`${name} | ${package_size} | ${type} | ${price} | ${user_id}`)

        const User = require('../models/User')
        const users = await User.find({ _id: new ObjectId(user_id) })
        const found_user = users[0]

        const Delivery = require('../models/Delivery')
        const new_delivery = new Delivery({ name: name, customer_name: found_user.name, customer_email: found_user.email,
                                            customer_pickup: pickup, customer_dropoff: dropoff, completed: false })

        const new_receipt = {
            "name": name,
            "package_size": package_size,
            "type": type,
            "price": price,
            "tracking": new_delivery.id
        }

        found_user.receipts.push(new_receipt)
        found_user.save()
        
        new_delivery.save()
    })


module.exports = router