const {
    Category,
    OriginCountry,
    Region,
    Producer,
    Size,
    GrapeVarietal,
    Product
} = require('../models');

async function getAllCountries() {
    const allCountries = await OriginCountry.fetchAll().map( 
        country => [country.get('id'), country.get('name')]
    )
    return allCountries
}

async function getAllCountries() {
    const allCountries = await OriginCountry.fetchAll().map( 
        country => [country.get('id'), country.get('name')]
    )
    return allCountries
}



module.exports = {
    getAllCountries
}