const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.json("Rapid Drop")
})

const loginRouter = require('./routes/login')
const resetRouter = require('./routes/reset')
const registerRouter = require('./routes/register')
const mfaRouter = require('./routes/mfa')
const customerRouter = require('./routes/customer')
const checkoutRouter = require('./routes/checkout')
const ordersRouter = require('./routes/orders')
const reviewRouter = require('./routes/review')
const adminRouter = require('./routes/adminback')
const driverRouter = require('./routes/driver')

app.use('/login', loginRouter)
app.use('/reset', resetRouter)
app.use('/register', registerRouter)
app.use('/mfa', mfaRouter)
app.use('/customer', customerRouter)
app.use('/checkout', checkoutRouter)
app.use('/orders', ordersRouter)
app.use('/review', reviewRouter)
app.use('/admin', adminRouter)
app.use('/driver', driverRouter)

const db_url = 'mongodb+srv://blythe:CTsaBeHd3tij4fI8@cluster0.mketntz.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_url)
const conn = mongoose.connection
conn.once('open', () => {
    console.log('successfully connected to database')
})
conn.on('error', () => {
    console.log('failed to connect to database')
})

app.listen(process.env.PORT || 3002)

module.exports = conn