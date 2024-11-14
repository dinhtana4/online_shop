const express = require('express')
const env = require('./config/envConfig')
const connect = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const cors = require('cors')
const app = express()

//database connection
connect()

//add middleware
app.use(express.json())
app.use(cors())
app.use('/api/user', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/payment', paymentRoutes)

app.get("/", (req, res) => {
    res.json({msg: 'Welcome to new shopify'})
})

const port = env.PORT || 5000

app.listen(port, () => {
    console.log(`Your server is running at port number: ${port}`)
})