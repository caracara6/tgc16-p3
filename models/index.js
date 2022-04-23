const bookshelf = require('../bookshelf')

const Category = bookshelf.model('Category', {
    tableName:'category'
});

const OriginCountry = bookshelf.model('OriginCountry', {
    tableName:'origin_country'
});

const Region = bookshelf.model('Region', {
    tableName:'region'
});

const Producer = bookshelf.model('Producer', {
    tableName:'producer'
});

const Size = bookshelf.model('Size', {
    tableName:'size'
});

const GrapeVarietal = bookshelf.model('GrapeVarietal', {
    tableName:'grape_varietal'
});

const Product = bookshelf.model('Product', {
    tableName:'product',
    category() {
        return this.belongsTo('Category')
    },
    origin_country() {
        return this.belongsTo('OriginCountry')
    },
    region() {
        return this.belongsTo('Region')
    },
    producer() {
        return this.belongsTo('Producer')
    },
    grape_varietal() {
        return this.belongsToMany('GrapeVarietal');
    },
    size() {
        return this.belongsToMany('Size');
    }
    

});







module.exports = { 
    Category,
    OriginCountry,
    Region,
    Producer,
    Size,
    GrapeVarietal,
    Product
};