const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

router.route('/')
    .get((req, res) => {
        res.send("login route")
    })
    .post(async (req, res) => {
        const { email, password } = req.body

        console.log(`email: ${email} password: ${password}`)

        const User = require('../models/User')
        const users = await User.find({ email: email })
        const found_user = users[0]

        if (!found_user) {
            console.log("not found")

            res.json({
                "failed": true
            })
        } else {
            if (found_user.password === password) {

                if (found_user.new_password) {
                    res.json({
                        "user_id": found_user.id,
                        "correct_login": true,
                        "show_captcha": true
                    })
                } else {
                    res.json({
                        "user_id": found_user.id,
                        "correct_login": true,
                        "show_captcha": false
                    })
                }
            } else {
                res.json({
                    "correct_login": false,
                    "failed": true
                })
            }
        }
    })

router.route('/google')
    .get((req, res) => {
        res.send("google login route")
    })
    .post(async (req, res) => {
        const email = req.body.email
        const password = req.body.password
        const fullname = req.body.fullname

        console.log(`email is ${email}`)

        const User = require('../models/User')
        const users = await User.find({ email: email })
        const found_user = users[0]

        if (found_user) {
            res.json({
                "user_id": found_user.id
            })
        } else {
            const new_user = new User({ fullname: fullname, email: email, password: password })
            new_user.save()

            res.json({
                "user_id": new_user.id
            })
        }
    })

module.exports = router