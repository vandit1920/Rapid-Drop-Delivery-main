const mongoose = require('mongoose')

const review_schema = new mongoose.Schema({
    name: String,
    reviews: Array,
    rating: String
})

module.exports = mongoose.model("Review", review_schema)