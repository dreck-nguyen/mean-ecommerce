const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const productsRouter = require('./routers/products')
const api = process.env.API_URL

require('dotenv').config()
// require('dotenv/config')

// const dbMain = 'eshop-database'
const dbTest = 'mean-shop'
const dbNameStr = dbTest;

// Middleware
app.use(express.json())
app.use(morgan('tiny'))

// Routers
app.use(`${api}/products`, productsRouter)

//MongoDb Connection
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbNameStr
})
    .then(() => {
        console.log('Database Connection is ready ...');
    })
    .catch((err) => {
        console.log(err);
    })

// Server Listening
app.listen(3000, () => {
    console.log(api);
    console.log('server is running http://localhost:3000');
})
