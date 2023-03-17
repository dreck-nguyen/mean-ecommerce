const { Category } = require('../models/category');
const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

router.get(`/`, async (req, res) => {
    let filter = {}
    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') }
    }
    const productList = await Product.find(filter).populate('category');

    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
})

router.get(`/:id`, (req, res) => {
    const productList = Product.findById(req.params.id).populate('category').then(
        product => {
            if (!product)
                return res.status(400).json({ message: 'Product not found' })
            return res.status(200).json(product)
        }
    ).catch(
        err => {
            return res.status(500).json({ error: err })
        }
    );
})

router.get(`/get/count`, async (req, res) => {
    const productCount = await Product.countDocuments();

    if (!productCount) {
        res.status(500).json({ success: false })
    }
    res.send({ productCount: productCount });
})


router.get(`/get/featured`, async (req, res) => {
    const productCount = await Product.find({ isFeatured: true });

    if (!productCount) {
        res.status(500).json({ success: false })
    }
    res.send(productCount);
})


router.get(`/get/featured/:count`, async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const productCount = await Product.find({ isFeatured: true }).limit(+count);

    if (!productCount) {
        res.status(500).json({ success: false })
    }
    res.send(productCount);
})

router.post(`/`, async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category)
        return res.status(400).json({ message: 'Invalid Category' })

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    product = await product.save();
    if (!product)
        return res.status(500).send({ message: 'Create Product failed !!!' })
    return res.send(product)
})


router.put(`/:id`, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Id invalid')
    }

    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid Category')
    let product = await Product.findByIdAndUpdate(
        req.params.id
        , {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true })
    if (!product) {
        return res.status(400).send('Update product failed')
    }
    res.send(product)
})


router.delete(`/:id`, (req, res) => {
    Product.findByIdAndRemove(req.params.id).then(
        product => {
            if (!product)
                return res.status(400).json({ message: 'Product not found' })
            return res.status(200).json({ message: 'Product deleted' })
        }
    ).catch(
        err => {
            return res.status(500).json({ error: err })
        }
    );
})

module.exports = router;