const orderDAL = require('../dal/orders');

async function createOrderBreakdown(orderId, orderData){
    return await orderDAL.createOrderBreakdown(orderId, orderData)
}

async function createOrder(stripeSessionEvent) {

    let shippingAddress = `
    Addressee: ${stripeSessionEvent.shipping.name}
    -Address Line 1: ${stripeSessionEvent.shipping.address.line1}
    -Address Line 2: ${stripeSessionEvent.shipping.address.line2}
    -City: ${stripeSessionEvent.shipping.address.city}
    -State: ${stripeSessionEvent.shipping.address.state}
    -Country: ${stripeSessionEvent.shipping.address.country}
    -Postcode: ${stripeSessionEvent.shipping.address.postal_code}
    `
    let orderData = {
        total_amount: stripeSessionEvent.amount_total,
        payment_reference: stripeSessionEvent.payment_intent,
        user_id: stripeSessionEvent.client_reference_id,
        shipping_address: shippingAddress,
        // items: []
    }

    let orderMetadata = JSON.parse(stripeSessionEvent.metadata.orders);
    // orderMetadata.map( order => {
    //     orderData.items.push({

    //     })
    // })

}

module.exports = {
    createOrderBreakdown,
    createOrder
}