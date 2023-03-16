const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

require('dotenv').config()
// require('dotenv/config')

//Database Name
let dbMain = 'eshop-database'
dbMain = 'mean-shop'
const dbNameStr = dbMain;

// Middleware
app.use(express.json())
app.use(morgan('tiny'))

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

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
