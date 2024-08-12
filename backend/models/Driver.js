const mongoose = require('mongoose')

const driver_schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    deliveries: Array,
    lat: String,
    lng: String,
    dropoffs: Array
})

module.exports = mongoose.model("Driver", driver_schema)