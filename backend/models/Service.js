const mongoose = require('mongoose')

const service_schema = new mongoose.Schema({
    name: String,
    package_size: String,
    express: String,
    two_day: String,
    five_day: String
})

module.exports = mongoose.model("Service", service_schema)