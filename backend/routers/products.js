const express = require('express')
const router = express.Router()
const {Product} = require('../models/product')
const app = express()


app.get('/', (req, res) => {
    const productList = Product.find().then((productList) => {
        return res.status(200).json(productList)
    }).catch((err) => {
        return res.status(400).json({ message: 'Cannot find any productList' })
    })
    // res.send(productList)
})

app.post('/', (req, res) => {
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

module.exports = router