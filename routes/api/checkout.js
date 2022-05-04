const express = require('express');
const router = express.Router();

const { checkIfAuthenticatedJWT } = require('../../middlewares');
const CartServices = require('../../services/cart')
const OrderServices = require('../../services/orders')
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


router.get('/', checkIfAuthenticatedJWT, async function(req, res){
    const cartServices = new CartServices(req.user.id)

    await cartServices.stockCheck();


    let items = await cartServices.getCart();

    if(items.length == 0){
        return res.status(400).send({"message":"Your cart is empty"})
    }

    let insufficientStockItems = await cartServices.stockCheck()

    if(insufficientStockItems.length > 0){
        return res.status(400).send(insufficientStockItems, {"message": "Some items in your cart are out of stock. Your cart has been updated"})
    }



    let lineItems = [];
    let meta = [];

    
    for(let item of items){
        console.log(item.product)
        const lineItem = {
            name: item.related('product').get('name'),
            amount: item.related('product').get('price'),
            quantity: item.get('quantity'),
            ['images'] : [item.related('product').get('image_url')],
            currency: 'SGD'
        }
        lineItems.push(lineItem);
        meta.push({
            product_id : item.get('product_id'),
            quantity: item.get('quantity')
        })
    }
    console.log(lineItems)
    const payment = {
        payment_method_types: ['card'],
        line_items: lineItems,
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CANCELLED_URL,
        metadata: {
            orders: JSON.stringify(meta)
        }
    }


    let stripeSession = await Stripe.checkout.sessions.create(payment)

    res.status(200).send({
        sessionId: stripeSession.id,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      });
})

router.post('/process_payment', express.raw({type: 'application/json'}), async (req, res) => {
    let payload = req.body;
})








module.exports = router;