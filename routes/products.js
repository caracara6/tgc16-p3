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

//CATEGORIES CRUD STARTS

router.get('/category', async function (req, res) {
    let categories = (await Category.fetchAll()).toJSON();

    res.render('product_related/category/index', {
        categories
    })
})

router.get('/category/create', async function (req, res) {
    const form = categoryForm();
    res.render('product_related/category/create', {
        'form': form.toHTML(bootstrapField)
    })
})

router.post('/category/create', async (req, res) => {
    const form = categoryForm();

    form.handle(req, {
        'success': async (form) => {
            let { ...formData } = form.data

            const category = new Category(formData);

            await category.save()

            req.flash("success_msg", `New category ${category.get('name')} has been created`)

            res.redirect('/product-related/category');
        },
        'error': async (form) => {
            res.render('product_related/category/create', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

router.get('/category/:category_id/update', async function (req, res) {
    const category = await productDAL.getCategoryById(req.params.category_id);

    const form = categoryForm();
    form.fields.name.value = category.get('name')

    res.render('product_related/category/update', {
        form: form.toHTML(bootstrapField),
        category: category.toJSON()
    })
})

router.post('/category/:category_id/update', async function (req, res) {
    const category = await productDAL.getCategoryById(req.params.category_id);

    const form = categoryForm();

    form.handle(req, {
        'success': async (form) => {
            let { ...formData } = form.data;

            category.set(formData);
            await category.save();

            req.flash("success_msg", `Category ${category.get('name')} has been updated`)

            res.redirect('/product-related/category');
        },
        'error': async (form) => {
            res.render('product_related/category/update', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

router.get('/category/:category_id/delete', async function (req, res) {
    const category = await productDAL.getCategoryById(req.params.category_id);
    res.render('product_related/category/delete', {
        category: category.toJSON()
    })
})

router.post('/category/:category_id/delete', async function (req, res) {
    const category = await productDAL.getCategoryById(req.params.category_id);
    await category.destroy();
    res.redirect('/product-related/category')
})

//CATEGORIES CRUD ENDS


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
        'form': form.toHTML(bootstrapField),
        'cloudinaryName': process.env.CLOUDINARY_NAME,
        'cloudinaryApiKey': process.env.CLOUDINARY_API_KEY,
        'cloudinaryPreset': process.env.CLOUDINARY_UPLOAD_PRESET
    })
})

router.post('/producer/create', async (req, res) => {
    const form = producerForm();

    form.handle(req, {
        'success': async (form) => {
            let { ...formData } = form.data

            const producer = new Producer(formData);

            await producer.save()

            req.flash("success_msg", `New wine producer ${producer.get('name')} has been created`)

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

router.get('/producer/:producer_id/update', async function (req, res) {
    const producer = await productDAL.getProducerById(req.params.producer_id);

    const form = producerForm();
    form.fields.name.value = producer.get('name')
    form.fields.description.value = producer.get('description')
    form.fields.producer_image_url.value = producer.get('producer_image_url')

    res.render('product_related/producer/update', {
        form: form.toHTML(bootstrapField),
        producer: producer.toJSON(),
        'cloudinaryName': process.env.CLOUDINARY_NAME,
        'cloudinaryApiKey': process.env.CLOUDINARY_API_KEY,
        'cloudinaryPreset': process.env.CLOUDINARY_UPLOAD_PRESET
    })
})

router.post('/producer/:producer_id/update', async function (req, res) {
    const producer = await productDAL.getProducerById(req.params.producer_id);

    const form = producerForm();

    form.handle(req, {
        'success': async (form) => {
            let { ...formData } = form.data;

            producer.set(formData);
            await producer.save();

            req.flash("success_msg", `Wine producer ${producer.get('name')} has been updated`)

            res.redirect('/product-related/producer');
        },
        'error': async (form) => {
            res.render('product_related/region/update', {
                'form': form.toHTML(bootstrapField),
                'cloudinaryName': process.env.CLOUDINARY_NAME,
                'cloudinaryApiKey': process.env.CLOUDINARY_API_KEY,
                'cloudinaryPreset': process.env.CLOUDINARY_UPLOAD_PRESET
            })
        }
    })
})

router.get('/producer/:producer_id/delete', async function (req, res) {
    const producer = await productDAL.getProducerById(req.params.producer_id);
    res.render('product_related/producer/delete', {
        producer: producer.toJSON()
    })
})

router.post('/producer/:producer_id/delete', async function (req, res) {
    const producer = await productDAL.getProducerById(req.params.producer_id);
    await producer.destroy();
    res.redirect('/product-related/producer')
})

//PRODUCER CRUD ENDS

//PRODUCT CRUD STARTS

router.get('/product', async function (req, res) {
    // let products = await productDAL.getAllProducts();

    let products = await Product.collection().fetch({
        withRelated: ['category', 'origin_country', 'region', 'producer', 'grape_varietals', 'sizes']
    })

    res.render('product_related/product/index', {
        products: products.toJSON()
    })
})

router.get('/product/create', async function (req, res) {

    const allCategories = await productDAL.getAllCategories()
    const allCountries = await productDAL.getAllCountries()
    const allRegions = await productDAL.getAllRegions()
    const allProducers = await productDAL.getAllProducers()
    const allSizes = await productDAL.getAllSizes()
    const allGrapeVarietals = await productDAL.getAllGrapeVarietals()


    const form = productForm(
        allCategories,
        allCountries,
        allRegions,
        allProducers,
        allGrapeVarietals,
        allSizes,

    );

    res.render('product_related/product/create', {
        'form': form.toHTML(bootstrapField),
        'cloudinaryName': process.env.CLOUDINARY_NAME,
        'cloudinaryApiKey': process.env.CLOUDINARY_API_KEY,
        'cloudinaryPreset': process.env.CLOUDINARY_UPLOAD_PRESET
    })
})

router.post('/product/create', async (req, res) => {

    const allCategories = await productDAL.getAllCategories()
    const allCountries = await productDAL.getAllCountries()
    const allRegions = await productDAL.getAllRegions()
    const allProducers = await productDAL.getAllProducers()
    const allGrapeVarietals = await productDAL.getAllGrapeVarietals()
    const allSizes = await productDAL.getAllSizes()


    const form = productForm(
        allCategories,
        allCountries,
        allRegions,
        allProducers,
        allGrapeVarietals,
        allSizes,

    );

    form.handle(req, {
        'success': async (form) => {

            const product = new Product();

            let {
                sizes, grape_varietals,
                ...restData
            } = form.data;

            product.set(restData);

            await product.save();

            if (sizes) {
                await product.sizes().attach(sizes.split(','))
            }

            if (grape_varietals) {
                console.log(grape_varietals)
                await product.grape_varietals().attach(grape_varietals.split(','))
            }


            req.flash("success_msg", "New product has been created successfully!")
            res.redirect('/product-related/product');
        },
        'error': async (form) => {
            res.render('product/create', {
                'form': form.toHTML(bootstrapField),
                'cloudinaryName': process.env.CLOUDINARY_NAME,
                'cloudinaryApiKey': process.env.CLOUDINARY_API_KEY,
                'cloudinaryPreset': process.env.CLOUDINARY_UPLOAD_PRESET
            })
        }
    })
})

router.get('/product/:product_id/update', async function (req, res) {

    const product = await productDAL.getProductById(req.params.product_id)

    const allCategories = await productDAL.getAllCategories()
    const allCountries = await productDAL.getAllCountries()
    const allRegions = await productDAL.getAllRegions()
    const allProducers = await productDAL.getAllProducers()
    const allSizes = await productDAL.getAllSizes()
    const allGrapeVarietals = await productDAL.getAllGrapeVarietals()


    const form = productForm(
        allCategories,
        allCountries,
        allRegions,
        allProducers,
        allGrapeVarietals,
        allSizes,
    );

    form.fields.name.value = product.get('name');
    form.fields.description.value = product.get('description');
    form.fields.nose_attribute.value = product.get('nose_attribute');
    form.fields.mouth_attribute.value = product.get('mouth_attribute');
    form.fields.category_id.value = product.get('category_id');
    form.fields.producer_id.value = product.get('producer_id');
    form.fields.origin_country_id.value = product.get('origin_country_id');
    form.fields.region_id.value = product.get('region_id');
    form.fields.alcohol_percentage.value = product.get('alcohol_percentage');
    form.fields.price.value = product.get('price');
    form.fields.stock.value = product.get('stock');
    form.fields.vintage.value = product.get('vintage');
    form.fields.image_url.value = product.get('image_url')

    let selectedSizes = await product.related('sizes').pluck('id');
    let selectedGrapeVarietals = await product.related('grape_varietals').pluck('id');
    form.fields.sizes.value = selectedSizes;
    form.fields.grape_varietals.value = selectedGrapeVarietals;



    res.render('product_related/product/update', {
        'form': form.toHTML(bootstrapField),
        'product': product.toJSON(),
        'cloudinaryName': process.env.CLOUDINARY_NAME,
        'cloudinaryApiKey': process.env.CLOUDINARY_API_KEY,
        'cloudinaryPreset': process.env.CLOUDINARY_UPLOAD_PRESET
    })
})

router.post('/product/:product_id/update', async function (req, res) {
    const product = await productDAL.getProductById(req.params.product_id);

    const allCategories = await productDAL.getAllCategories()
    const allCountries = await productDAL.getAllCountries()
    const allRegions = await productDAL.getAllRegions()
    const allProducers = await productDAL.getAllProducers()
    const allSizes = await productDAL.getAllSizes()
    const allGrapeVarietals = await productDAL.getAllGrapeVarietals()

    const form = productForm(
        allCategories,
        allCountries,
        allRegions,
        allProducers,
        allGrapeVarietals,
        allSizes,
    );

    form.handle(req, {
        'success': async (form) => {

            let {
                sizes,
                grape_varietals,
                ...restData
            } = form.data;

            product.set(restData);

            await product.save();

            let selectedSizesIds = sizes.split(',');
            let existingSizes = await product.related('sizes').pluck('id');
            let toRemoveSizes = existingSizes.filter(id => selectedSizesIds.includes(id) === false);

            await product.sizes().detach(toRemoveSizes);
            await product.sizes().attach(selectedSizesIds)

            let selectedGrapeVarietalsIds = grape_varietals.split(',');
            let existingGrapeVarietals = await product.related('grape_varietals').pluck('id');
            let toRemoveGrapeVarietals = existingGrapeVarietals.filter(id => selectedGrapeVarietalsIds.includes(id) === false);

            await product.grape_varietals().detach(toRemoveGrapeVarietals);
            await product.grape_varietals().attach(selectedGrapeVarietalsIds)


            req.flash("success_msg", "Product has been updated successfully!")
            res.redirect('/product-related/product');
        },
        'error': async (form) => {
            res.render('product_related/product/update', {
                'form': form.toHTML(bootstrapField),
                'cloudinaryName': process.env.CLOUDINARY_NAME,
                'cloudinaryApiKey': process.env.CLOUDINARY_API_KEY,
                'cloudinaryPreset': process.env.CLOUDINARY_UPLOAD_PRESET
            })
        }
    })

})


router.get('/product/:product_id/delete', async function (req, res) {
    const product = await productDAL.getProductById(req.params.product_id);
    res.render('product_related/product/delete', {
        product: product.toJSON()
    })
})

router.post('/product/:product_id/delete', async function (req, res) {
    const product = await productDAL.getProductById(req.params.product_id);
    await product.destroy();
    res.redirect('/product-related/product')
})


//PRODUCT CRUD ENDS





module.exports = router