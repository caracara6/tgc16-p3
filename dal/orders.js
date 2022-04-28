const {
    Order,
    OrderBreakdown,
    OrderStatus,
} = require('../models')

async function getAllOrderStatuses() {
    return await OrderStatus.fetchAll().map(status => [status.get('id'), status.get('name')])
}

async function getAllOrdersByUser(userId) {
    return await Order.collection().where({
        user_id: userId
    }).fetch({
        withRelated: ['order_status, order_breakdown']
    })
}

async function getSpecificOrderByUser(orderId, userId) {
    return await Order.where({
        id: orderId,
        user_id: userId
    }).fetch({
        withRelated: ['order_status, order_breakdown.product']
    })
}

async function getAllOrders() {
    return await Order.collection().fetch({
        withRelated:['order_status']
    })
}

async function createOrderBreakdown(orderId, productId, quantity){
    let orderBreakdown = new OrderBreakdown({
        order_id: orderId,
        product_id: productId,
        quantity
    })
    return await orderBreakdown.save()
}

module.exports = { 
    getAllOrderStatuses,
    getAllOrdersByUser,
    getSpecificOrderByUser,
    getAllOrders,
    createOrderBreakdown
 }