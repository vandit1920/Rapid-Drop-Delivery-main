const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

router.route('/')
    .get((req, res) => {
        res.send("register route")
    })
    .post((req, res) => {
        const { fullname, email, password,
                security_question_1, answer_1, security_question_2,
                answer_2 } = req.body
        
        const User = require('../models/User')
        const new_user = new User({ fullname: fullname, email: email, password: password,
                                    security_question_1: security_question_1, answer_1: answer_1,
                                    security_question_2: security_question_2, answer_2: answer_2})
        new_user.save().then(() => {
            console.log("user saved")

            const user_id = new_user.id

            res.json({
                "user_id": user_id
            })
        })
    })

module.exports = router