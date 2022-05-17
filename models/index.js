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
    category: function() {
        return this.belongsTo('Category')
    },
    origin_country : function() {
        return this.belongsTo('OriginCountry')
    },
    region: function() {
        return this.belongsTo('Region')
    },
    producer: function() {
        return this.belongsTo('Producer')
    },
    grape_varietals: function() {
        return this.belongsToMany('GrapeVarietal');
    },
    sizes: function() {
        return this.belongsToMany('Size');
    },
    orders: function() {
        return this.belongsToMany('Order');
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

const Order = bookshelf.model('Order',{
    tableName: 'orders',
    user: function() {
        return this.belongsTo('User')
    },
    order_status: function() {
        return this.belongsTo('OrderStatus')
    },
    order_breakdowns: function() {
        return this.hasMany('OrderBreakdown')
    },
    products: function() {
        return this.belongsToMany('Product');
    }
})

const OrderBreakdown = bookshelf.model('OrderBreakdown', {
    tableName: 'orders_product',
    order: function() {
        return this.belongsTo('Order')
    },
    product: function () {
        return this.belongsTo("Product");
    }
})


const OrderStatus = bookshelf.model('OrderStatus',{
    tableName: 'order_status'
})

const CartItem = bookshelf.model('CartItem', {
    tableName: 'cart_item',
    product:function(){
        return this.belongsTo('Product')
    },
    user:function(){
        return this.belongsTo('User');
    }
})

const BlacklistedToken = bookshelf.model('BlacklistedToken',{
    tableName: 'blacklisted_token'
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
    UserType,
    Order,
    OrderBreakdown,
    OrderStatus,
    CartItem,
    BlacklistedToken
};