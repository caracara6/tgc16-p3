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
    tableName:'size',
    products:function(){
        return this.belongsToMany('Product')
    }
});

const GrapeVarietal = bookshelf.model('GrapeVarietal', {
    tableName:'grape_varietal',
    products:function(){
        return this.belongsToMany('Product')
    }
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
    grape_varietals() {
        return this.belongsToMany('GrapeVarietal');
    },
    sizes() {
        return this.belongsToMany('Size');
    }
});

const User = bookshelf.model('User',{
    tableName: 'user',
    user_type() {
        return this.belongsTo('UserType')
    }
})

const UserType = bookshelf.model('UserType',{
    tableName: 'user_type'
})


module.exports = { 
    Category,
    OriginCountry,
    Region,
    Producer,
    Size,
    GrapeVarietal,
    Product,
    User,
    UserType
};