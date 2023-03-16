const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

const dbMain = 'eshop-database'
const dbTest = 'mean-shop'
const dbNameStr = dbTest;


require('dotenv/config')
// Middleware
app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(morgan('tiny'))

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number
})

const Product = mongoose.model('Product', productSchema)

const api = process.env.API_URL

app.get(`${api}/products`, (req, res) => {
    const product = {
        id: 1,
        name: 'hair dresser',
        image: 'some_url'
    }
    res.send(product)
})

app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    product.save()
        .then((createdProduct) => {
            // res.send(product)
            return res.status(201).json(createdProduct)
        })
        .catch((err) => {
            return res.status(500).json({
                error: err,
                success: false,
                message: 'Save error'
            })
        });
})

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
app.listen(3000, () => {
    console.log(api);
    console.log('server is running http://localhost:3000');
})
