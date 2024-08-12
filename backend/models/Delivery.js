const mongoose = require('mongoose')

const delivery_schema = new mongoose.Schema({
    name: String,
    customer_name: String,
    customer_email: String,
    customer_pickup: String,
    customer_dropoff: String,
    completed: Boolean,
    lat: String,
    lng: String,
    driver: String
})

module.exports = mongoose.model("Delivery", delivery_schema)