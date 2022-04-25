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

router.get('/', async function (req, res) {
    res.render('product_related/index')
})

//SIZES CRUD STARTS

router.get('/size', async function (req, res) {
    let sizes = (await Size.fetchAll()).toJSON();

    res.render('product_related/size/index', {
        sizes
    })
})

router.get('/size/create', async function (req, res) {
    const form = sizeForm();
    res.render('product_related/size/create', {
        'form': form.toHTML(bootstrapField)
    })
})

router.post('/size/create', async (req, res) => {
    const form = sizeForm();

    form.handle(req, {
        'success': async (form) => {
            let { ...formData } = form.data
            console.log(formData)
            console.log('=======')
            console.log(form.data)
            const size = new Size(formData);

            // size.set(formData);
            await size.save()

            req.flash("success_msg", `New bottle size ${size.get('name')} has been created`)

            res.redirect('/product-related/size');
        },
        'error': async (form) => {
            res.render('product_related/size/create', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

router.get('/size/:size_id/update', async function (req, res) {
    const size = await productDAL.getSizeByID(req.params.size_id);

    const form = sizeForm();
    form.fields.name.value = size.get('name')
    form.fields.volume.value = size.get('volume')

    res.render('product_related/size/update', {
        form: form.toHTML(bootstrapField),
        size: size.toJSON()
    })
})

router.post('/size/:size_id/update', async function (req, res) {
    const size = await productDAL.getSizeByID(req.params.size_id);

    const form = sizeForm();

    form.handle(req, {
        'success': async (form) => {
            let { ...formData } = form.data;

            size.set(formData);
            await size.save();

            req.flash("success_msg", `Bottle size ${size.get('name')} has been updated`)

            res.redirect('/product-related/size');
        },
        'error': async (form) => {
            res.render('product_related/size/update', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

router.get('/size/:size_id/delete', async function (req, res) {
    const size = await productDAL.getSizeByID(req.params.size_id);
    res.render('product_related/size/delete', {
        size: size.toJSON()
    })
})

router.post('/size/:size_id/delete', async function (req, res) {
    const size = await productDAL.getSizeByID(req.params.size_id);
    await size.destroy();
    req.flash("success_msg", `Bottle size ${size.get('name')} has been deleted`)
    res.redirect('/product-related/size')
})

//SIZES CRUD ENDS



//ORIGIN COUNTRIES CRUD STARTS

router.get('/country', async function (req, res) {
    let countries = (await OriginCountry.fetchAll()).toJSON();

    res.render('product_related/country/index', {
        countries
    })
})

router.get('/country/create', async function (req, res) {
    const form = countryForm();
    res.render('product_related/country/create', {
        'form': form.toHTML(bootstrapField)
    })
})

router.post('/country/create', async (req, res) => {
    const form = countryForm();

    form.handle(req, {
        'success': async (form) => {
            let { ...formData } = form.data

            const country = new OriginCountry(formData);

            await country.save()

            req.flash("success_msg", `New origin country ${country.get('name')} has been created`)

            res.redirect('/product-related/country');
        },
        'error': async (form) => {
            res.render('product_related/country/create', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

router.get('/country/:country_id/update', async function (req, res) {
    const country = await productDAL.getCountryByID(req.params.country_id);

    const form = countryForm();
    form.fields.name.value = country.get('name')

    res.render('product_related/country/update', {
        form: form.toHTML(bootstrapField),
        country: country.toJSON()
    })
})

router.post('/country/:country_id/update', async function (req, res) {
    const country = await productDAL.getCountryByID(req.params.country_id);

    const form = countryForm();

    form.handle(req, {
        'success': async (form) => {
            let { ...formData } = form.data;

            country.set(formData);
            await country.save();

            req.flash("success_msg", `Origin country ${country.get('name')} has been updated`)

            res.redirect('/product-related/country');
        },
        'error': async (form) => {
            res.render('product_related/country/update', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

router.get('/country/:country_id/delete', async function (req, res) {
    const country = await productDAL.getCountryByID(req.params.country_id);
    res.render('product_related/country/delete', {
        country: country.toJSON()
    })
})

router.post('/country/:country_id/delete', async function (req, res) {
    const country = await productDAL.getCountryByID(req.params.country_id);
    await country.destroy();
    req.flash("success_msg", `Origin country ${country.get('name')} has been deleted`)
    res.redirect('/product-related/country')
})

//ORIGIN COUNTRIES CRUD ENDS

//REGIONS CRUD STARTS

router.get('/region', async function (req, res) {
    let regions = (await Region.fetchAll()).toJSON();

    res.render('product_related/region/index', {
        regions
    })
})

router.get('/region/create', async function (req, res) {
    const form = regionForm();
    res.render('product_related/region/create', {
        'form': form.toHTML(bootstrapField)
    })
})

router.post('/region/create', async (req, res) => {
    const form = regionForm();

    form.handle(req, {
        'success': async (form) => {
            let { ...formData } = form.data

            const region = new Region(formData);

            await region.save()

            req.flash("success_msg", `New region ${region.get('name')} has been created`)

            res.redirect('/product-related/region');
        },
        'error': async (form) => {
            res.render('product_related/region/create', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

router.get('/region/:region_id/update', async function (req, res) {
    const region = await productDAL.getRegionByID(req.params.region_id);

    const form = regionForm();
    form.fields.name.value = region.get('name')

    res.render('product_related/region/update', {
        form: form.toHTML(bootstrapField),
        region: region.toJSON()
    })
})

router.post('/region/:region_id/update', async function (req, res) {
    const region = await productDAL.getRegionByID(req.params.region_id);

    const form = regionForm();

    form.handle(req, {
        'success': async (form) => {
            let { ...formData } = form.data;

            region.set(formData);
            await region.save();

            req.flash("success_msg", `Region ${region.get('name')} has been updated`)

            res.redirect('/product-related/region');
        },
        'error': async (form) => {
            res.render('product_related/region/update', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

router.get('/region/:region_id/delete', async function (req, res) {
    const region = await productDAL.getRegionByID(req.params.region_id);
    res.render('product_related/region/delete', {
        region: region.toJSON()
    })
})

router.post('/region/:region_id/delete', async function (req, res) {
    const region = await productDAL.getRegionByID(req.params.region_id);
    await region.destroy();
    req.flash("success_msg", `Region ${region.get('name')} has been deleted`)
    res.redirect('/product-related/region')
})

//REGIONS CRUD ENDS


//GRAPE VARIETAL CRUD STARTS

router.get('/grape-varietal', async function (req, res) {
    let grapeVarietals = (await GrapeVarietal.fetchAll()).toJSON();

    res.render('product_related/grape_varietal/index', {
        grapeVarietals
    })
})

router.get('/grape-varietal/create', async function (req, res) {
    const form = grapeVarietalForm();
    res.render('product_related/grape_varietal/create', {
        'form': form.toHTML(bootstrapField)
    })
})

router.post('/grape-varietal/create', async (req, res) => {
    const form = grapeVarietalForm();

    form.handle(req, {
        'success': async (form) => {
            let { ...formData } = form.data

            const grapeVarietal = new GrapeVarietal(formData);

            await grapeVarietal.save()

            req.flash("success_msg", `New grape varietal ${grapeVarietal.get('name')} has been created`)

            res.redirect('/product-related/grape-varietal');
        },
        'error': async (form) => {
            res.render('product_related/grape_varietal/create', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

router.get('/grape-varietal/:grape_varietal_id/update', async function (req, res) {
    const grapeVarietal = await productDAL.getGrapeVarietalByID(req.params.grape_varietal_id);

    const form = regionForm();
    form.fields.name.value = grapeVarietal.get('name')

    res.render('product_related/grape_varietal/update', {
        form: form.toHTML(bootstrapField),
        grapeVarietal: grapeVarietal.toJSON()
    })
})

router.post('/grape-varietal/:grape_varietal_id/update', async function (req, res) {
    const grapeVarietal = await productDAL.getGrapeVarietalByID(req.params.grape_varietal_id);

    const form = regionForm();

    form.handle(req, {
        'success': async (form) => {
            let { ...formData } = form.data;

            grapeVarietal.set(formData);
            await grapeVarietal.save();

            req.flash("success_msg", `Grape varietal ${grapeVarietal.get('name')} has been updated`)

            res.redirect('/product-related/grape-varietal');
        },
        'error': async (form) => {
            res.render('product_related/grape_varietal/update', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

router.get('/grape-varietal/:grape_varietal_id/delete', async function (req, res) {
    const grapeVarietal = await productDAL.getGrapeVarietalByID(req.params.grape_varietal_id);
    res.render('product_related/grape_varietal/delete', {
        grapeVarietal: grapeVarietal.toJSON()
    })
})

router.post('/grape-varietal/:grape_varietal_id/delete', async function (req, res) {
    const grapeVarietal = await productDAL.getGrapeVarietalByID(req.params.grape_varietal_id);
    await grapeVarietal.destroy();
    req.flash("success_msg", `Grape varietal ${grapeVarietal.get('name')} has been deleted`)
    res.redirect('/product-related/grape-varietal')
})

//GRAPE VARIETAL CRUD ENDS

//PRODUCER CRUD STARTS

router.get('/producer', async function (req, res) {
    let producers = (await Producer.fetchAll()).toJSON();

    res.render('product_related/producer/index', {
        producers
    })
})

router.get('/producer/create', async function (req, res) {
    const form = producerForm();
    res.render('product_related/producer/create', {
        'form': form.toHTML(bootstrapField)
    })
})

router.post('/producer/create', async (req, res) => {
    const form = producerForm();

    form.handle(req, {
        'success': async (form) => {
            let { ...formData } = form.data

            const producer = new Producer(formData);

            await producer.save()

            res.redirect('/product-related/producer');
        },
        'error': async (form) => {
            res.render('product_related/producer/create', {
                'form': form.toHTML(bootstrapField),
                'cloudinaryName': process.env.CLOUDINARY_NAME,
                'cloudinaryApiKey': process.env.CLOUDINARY_API_KEY,
                'cloudinaryPreset': process.env.CLOUDINARY_UPLOAD_PRESET
            })
        }
    })
})

//PRODUCER CRUD ENDS




module.exports = router;