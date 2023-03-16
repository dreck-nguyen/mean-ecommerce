const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

require('dotenv/config')
// Middleware
app.use(express.json())
app.use(morgan('tiny'))

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
    const product = req.body
    console.log(product);
    res.send(product)
})

app.listen(3000, () => {
    console.log(api);
    console.log('server is running http://localhost:3000');
})
