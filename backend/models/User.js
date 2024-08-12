const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    security_question_1: String,
    answer_1: String,
    security_question_2: String,
    answer_2: String,
    secret: Object,
    new_password: Boolean,
    receipts: Array
})

module.exports = mongoose.model("User", user_schema)