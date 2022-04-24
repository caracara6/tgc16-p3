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

async function getAllCountries() {
    const allCountries = await OriginCountry.fetchAll().map( 
        country => [country.get('id'), country.get('name')]
    )
    return allCountries
}

async function getAllRegions() {
    const allRegions = await Region.fetchAll().map( 
        region => [region.get('id'), region.get('name')]
    )
    return allRegions
}

async function getAllProducers() {
    const allProducers = await Producer.fetchAll().map( 
        producer => [producer.get('id'), producer.get('name')]
    )
    return allProducers
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

async function getAllProducts() {
    return await Product.fetchAll();
}



module.exports = {
    getAllCategories, 
    getAllCountries, 
    getAllRegions,
    getAllProducers,
    getAllSizes,
    getSizeByID,
    getAllGrapeVarietals,
    getAllProducts
}