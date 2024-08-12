const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true }))


router.route('/home')
    .get((req, res) => {
        res.send("admin home route")
    })
    .post((req, res) => {
        const { employee_name } = req.body

        console.log(employee_name)

        // TODO: get that employee's information from db

        res.json({
            "employee_name": "amanda"
        })
    })

module.exports = router