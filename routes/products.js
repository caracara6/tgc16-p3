const express = require('express');
const router = express.Router();
const productDAL = require('../dal/products')

const {
    Category,
    OriginCountry,
    Region,
    Producer,
    Size,
    GrapeVarietal,
    Product
} = require('../models');

const {
    bootstrapField, 
    categoryForm, 
    countryForm, 
    regionForm,
    grapeVarietalForm,
    sizeForm,
    producerForm,
    productForm
} = require('../forms');
const async = require('hbs/lib/async');


// router.get('/product/create', async (req, res)=>{
//     const allCategories = await productDAL.getAllCategories()
//     const allCountries = await productDAL.getAllCountries()
//     const allRegions = await productDAL.getAllRegions()
// })

router.get('/', async function(req, res) {
    res.render('product_related/index')
})

router.get('/size', async function(req, res){
    let sizes = (await Size.fetchAll()).toJSON();

    res.render('product_related/size/index', {
        sizes
    })
})

router.get('/size/create', async (req, res)=>{
    const form = sizeForm();
    res.render('product_related/size/create',{
        'form': form.toHTML(bootstrapField)
    })
})

router.post('/size/create', async (req, res) => {
    const form = sizeForm();

    form.handle(req, {
        'success' : async (form) => {
            let { ...formData } = form.data
            console.log(formData)
            console.log('=======')
            console.log(form.data)
            const size = new Size(formData);
        
            // size.set(formData);
            await size.save()

            res.redirect('/');
        },
        'error':async(form) => {
            res.render('product_related/size/create',{
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

module.exports = router;