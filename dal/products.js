const {
    Category,
    OriginCountry,
    Region,
    Producer,
    Size,
    GrapeVarietal,
    Product
} = require('../models');

async function getAllCategories() {
    const allCategories = await Category.fetchAll().map(
        category => [category.get('id'), category.get('name')]
    )
    return allCategories
}

async function getCategoryById(categoryId) {
    return await Category.where({
        'id': categoryId
    }).fetch()
}

async function getAllCountries() {
    const allCountries = await OriginCountry.fetchAll().map(
        country => [country.get('id'), country.get('name')]
    )
    return allCountries
}

async function getCountryByID(sizeId) {
    return await OriginCountry.where({
        'id': sizeId
    }).fetch()
}

async function getAllRegions() {
    const allRegions = await Region.fetchAll().map(
        region => [region.get('id'), region.get('name')]
    )
    return allRegions
}

async function getRegionByID(regionId) {
    return await Region.where({
        'id': regionId
    }).fetch()
}

async function getAllProducers() {
    const allProducers = await Producer.fetchAll().map(
        producer => [producer.get('id'), producer.get('name')]
    )
    return allProducers
}

async function getProducerById(producerId) {
    return await Producer.where({
        'id': producerId
    }).fetch()
}

async function getAllSizes() {
    const allSizes = await Size.fetchAll().map(
        size => [size.get('id'), size.get('name')]
    )
    return allSizes
}

async function getSizeByID(sizeId) {
    return await Size.where({
        'id': sizeId
    }).fetch()
}

async function getAllGrapeVarietals() {
    const allGrapeVarietals = await GrapeVarietal.fetchAll().map(
        grape => [grape.get('id'), grape.get('name')]
    )
    return allGrapeVarietals
}

async function getGrapeVarietalByID(grapeVarietalId) {
    return await GrapeVarietal.where({
        'id': grapeVarietalId
    }).fetch()
}

async function getAllProducts(query) {
    // 
    let q = Product.collection();

    // let q = Product.query

    console.log('query', query)

    if (query.categoryFilter) {
        q.where('category_id', '=', query.categoryFilter)
    }

    //what if select more than one country??
    // if (query.countryFilter) {
    //     q.where('origin_country_id', '=', query.countryFilter)
    // }



    //how to find by description, producer name, region etc too?
    // how to find by and / or for e.g. white wine and from france
    // if (query.searchInput) {
    //     console.log(query.searchInput)
    //     q.where('name', 'like', '%' + query.searchInput + '%')
    // }

    if (query.searchInput) {
        q = q.query(qb => {
            qb.where('name', 'ilike', '%' + query.searchInput + '%')
            .orWhere('description', 'ilike', '%' + query.searchInput + '%')
            .orWhere('nose_attribute', 'ilike', '%' + query.searchInput + '%')
            .orWhere('mouth_attribute', 'ilike', '%' + query.searchInput + '%')
        })
    }

    // if (query.grapeVarietalFilter) {
    //     let selectedGrapeVarietals = query.grapeVarietalFilter.split(',');

    //     q.query('join', 'grape_varietal_product', 'product.id', 'product_id')
    //         .where('grape_varietal_id', 'in', selectedGrapeVarietals)
    // }

    return await q.fetch({
        withRelated: [
            'category',
            'origin_country',
            'region',
            'producer',
            'grape_varietals',
            'sizes'
        ]
    });
}

async function getProductById(productId) {
    console.log('testing getProductById', typeof productId)
    return await Product.where({
        'id': productId,
    }).fetch({
        require: true,
        withRelated: [
            'category',
            'origin_country',
            'region',
            'producer',
            'grape_varietals',
            'sizes'
        ]
    });

}



module.exports = {
    getAllCategories,
    getCategoryById,
    getAllCountries,
    getCountryByID,
    getAllRegions,
    getRegionByID,
    getAllProducers,
    getProducerById,
    getAllSizes,
    getSizeByID,
    getAllGrapeVarietals,
    getGrapeVarietalByID,
    getAllProducts,
    getProductById
}