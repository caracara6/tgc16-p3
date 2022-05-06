const express = require('express')
const router = express.Router();

const productDAL = require('../../dal/products.js')

const {
    Category,
    OriginCountry,
    Region,
    Producer,
    Size,
    GrapeVarietal,
    Product
} = require('../../models');

router.get('/categories', async (req, res) => {
    try {
        let categories = await Category.fetchAll()

        res.status(200).send(categories)

    } catch (e) {
        res.status(500).send({ "message": "Unable to retrieve categories due to internal server error" })
    }
})

router.get('/countries', async (req, res) => {
    try {
        let countries = await OriginCountry.fetchAll()

        res.status(200).send(countries)

    } catch (e) {
        res.status(500).send({ "message": "Unable to retrieve countries due to internal server error" })
    }
})

router.get('/regions', async (req, res) => {
    try {
        let regions = await Region.fetchAll()

        res.status(200).send(regions)

    } catch (e) {
        res.status(500).send({ "message": "Unable to retrieve regions due to internal server error" })
    }
})

router.get('/sizes', async (req, res) => {
    try {
        let sizes = await Size.fetchAll()

        res.status(200).send(sizes)

    } catch (e) {
        res.status(500).send({ "message": "Unable to retrieve sizes due to internal server error" })
    }
})

router.get('/producers', async (req, res) => {
    try {
        let producers = await Producer.fetchAll()

        res.status(200).send(producers)

    } catch (e) {
        res.status(500).send({ "message": "Unable to retrieve producers due to internal server error" })
    }
})

router.get('/grape-varietals', async (req, res) => {
    try {
        let grapeVarietals = await GrapeVarietal.fetchAll()

        res.status(200).send(grapeVarietals)

    } catch (e) {
        res.status(500).send({ "message": "Unable to retrieve grape varietals due to internal server error" })
    }
})

router.get('/products', async (req, res) => {
    // try {
        let products = await productDAL.getAllProducts(req.query)

        // let q = Product.collection();

        // if(req.query.searchInput){
        //     q.where('name', 'ILIKE', '%' + query.searchInput + '%')
        // }

        console.log(req.query)

        // let products = await q.fetch({
        //     withRelated: [
        //         'category', 
        //         'origin_country', 
        //         'region', 
        //         'producer', 
        //         'grape_varietals', 
        //         'sizes'
        //     ]
        // });


        //req.query filter here
        // console.log(products.toJSON())

        res.status(200).send(products)


    // } catch (e) {
    //     res.status(500).send({ "message": "Unable to retrieve products due to internal server error" })
    // }
})

router.get('/products/:product_id', async (req, res) => {
    try {
        console.log(req.params.product_id)
        let product = await productDAL.getProductById(req.params.product_id)

        console.log(product.toJSON())

        res.status(200).send(product)


    } catch (e) {
        res.status(500).send({ "message": "Unable to retrieve product due to internal server error" })
    }
})

module.exports = router;