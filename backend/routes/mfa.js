const express = require('express')
const router = express.Router()
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')
const { ObjectId } = require('mongodb')

router.use(express.urlencoded({ extended: true }))

router.route('/setup')
    .get(async (req, res) => {
        const user_id = req.query.user_id.user_id

        const secret = speakeasy.generateSecret({
            name: "Rapid Drop"
        })

        qrcode.toDataURL(secret.otpauth_url, (err, data) => {
            res.json({
                "code": data
            })
        })

        console.log(user_id)

        const User = require('../models/User')
        const users = await User.find({ _id: new ObjectId(user_id) })
        const found_user = users[0]
        found_user.secret = secret
        found_user.save().then(() => {
            console.log('saved secret for user')
        })
    })

router.route('/authenticate')
    .get((req, res) => {
        res.send("authenticate route")
    })
    .post(async (req, res) => {
        console.log(req.body)

        const { user_id, entered_code } = req.body

        console.log(user_id.user_id)
        console.log(entered_code)

        const User = require('../models/User')
        const users = await User.find({ _id: new ObjectId(user_id.user_id) })
        const found_user = users[0]

        console.log(found_user)

        const verified = speakeasy.totp.verify({
            secret: found_user.secret.ascii,
            encoding: 'ascii',
            token: entered_code
        })

        res.json({
            "verified": verified,
            "id": found_user.id
        })
    })

module.exports = router