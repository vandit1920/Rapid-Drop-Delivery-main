const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const { ObjectId } = require('mongodb')

router.use(express.urlencoded({ extended: true }))

router.route('/')
    .get((req, res) => {
        res.send("reset route")
    })
    .post(async (req, res) => {
        const { email } = req.body

        const User = require('../models/User')
        const users = await User.find({ email: email })
        const found_user = users[0]

        if (!found_user) {
            console.log("no user found")

            res.json({
                "failed": true
            })
        } else {
            const user_id = found_user.id
    
            console.log(email)

            const otp = `${Math.floor(1000 + Math.random() * 9000)}`

            console.log(`otp is ${otp}`)

            sendMail(otp, res, email)

            res.json({
                "user_id": user_id,
                "code": otp
            })
        }
    })

router.route('/populate')
    .get((req, res) => {
        res.send("populate route")
    })
    .post(async (req, res) => {

        console.log("populating...")
        const { user_id } = req.body

        console.log(user_id)

        const User = require('../models/User')
        const users = await User.find({ _id: new ObjectId(user_id) })
        const found_user = users[0]

        res.json({
            "security_question_1": found_user.security_question_1,
            "security_question_2": found_user.security_question_2,
            "answer_1": found_user.answer_1,
            "answer_2": found_user.answer_2
        })
    })

router.route('/check')
    .get((req, res) => {
        res.send("check route")
    })
    .post(async (req, res) => {
        const { user_id, user_answer } = req.body

        const User = require('../models/User')
        const users = await User.find({ _id: new ObjectId(user_id) })
        const found_user = users[0]

        if (found_user.answer_1 === user_answer) {
            res.json({
                correct: true
            })
        } else {
            res.json({
                correct: false
            })
        }

        console.log(`user id: ${user_id} user answer: ${user_answer}`)
    })

router.route('/new')
    .get((req, res) => {
        res.send("new password route")
    })
    .post(async (req, res) => {

        const { user_id, password } = req.body

        console.log(`user id is: ${user_id} and password is: ${password}`)

        const User = require('../models/User')
        const users = await User.find({ _id: new ObjectId(user_id) })
        const found_user = users[0]

        found_user.new_password = true

        found_user.password = password
        found_user.save()

        res.json({
            "saved": true
        })
    })

async function sendMail(otp, res, email) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            auth: {
                user: "hammettblythe@gmail.com",
                pass: "XTqnpmshSWgyG1td"
            }
        })
    
        const mailOptions = {
            from: "hammettblythe@gmail.com",
            to: email,
            subject: "Verify the Code",
            html: `<p>Enter ${otp}</p>`
        }
    
        await transporter.sendMail(mailOptions)
    
        console.log("message sent")
        } catch (error) {
            res.send("failed")
        }
    
    return otp
}


module.exports = router