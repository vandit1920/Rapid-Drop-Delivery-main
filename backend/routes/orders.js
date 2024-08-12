const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongodb')

router.use(express.urlencoded({ extended: true }))

router.route('/')
    .get((req, res) => {
        res.send("orders route")
    })
    .post(async (req, res) => {
        const { user_id } = req.body

        const User = require('../models/User')
        const users = await User.find({ _id: new ObjectId(user_id) })
        const found_user = users[0]

        
        res.json({
            "orders": found_user.receipts
        })
    })

module.exports = router