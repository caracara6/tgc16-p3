const express = require('express');
const router = express.Router();

const { checkIfAuthenticatedJWT } = require('../../middlewares');

const CartServices = require('../../services/cart');

router.get('/', checkIfAuthenticatedJWT, async function (req, res) {
    try {
        let cartServices = new CartServices(req.user.id)
        let cartItems = await cartServices.getCart();

        // don't need to cartItems.toJSON() here because express.json()??
        res.status(200).send(cartItems)

    } catch (e) {
        res.status(500).send({"message" : "Unable to retrieve your cart due to internal server error"})
    }
})

// have to log in for this route to work
router.post('/:product_id', checkIfAuthenticatedJWT, async function(req, res) {
    try {
        let cartServices = new CartServices(req.user.id)
        await cartServices.addToCart(req.params.product_id, 1)

        //!!!!!!!!!!!!!
        res.status(200).send({"message" : "What to send back as response depends on what cartServices.addToCart returns!!!!"})


    } catch (e) {
        res.status(500).send({"message" : "Unable to add to your cart due to internal server error"})
    }
})

router.put('/:product_id', checkIfAuthenticatedJWT, async function(req, res){
    try {

        let cartServices = new CartServices(req.user.id)

        if(req.body.newQuantity == 0) {
            await cartServices.removeFromCart(req.params.product_id);
            return res.status(200).send({"message":"You have removed this item from your cart"})

        } else if (req.body.newQuantity > 0) {
            let result = await cartServices.updateQuantity(req.params.product_id, req.body.newQuantity)
            if(result){
                return res.status(200).send({"message" : "Quantity changed successfully"})
            } else {
                return res.status(400).send({"message":"There is not enough of this item in stock"})
            }
        } else {
            return res.status(400).send({"message": "Please enter a positive number"})
        }

    } catch (e) {
        res.status(500).send({"message" : "Unable to add to your cart due to internal server error"})
    }
})

router.delete('/:product_id', checkIfAuthenticatedJWT, async function(req, res){
    try{

        let cartServices = new CartServices(req.user.id)
        await cartServices.removeFromCart(req.params.product_id);
            return res.status(200).send({"message":"You have removed this item from your cart"})

    } catch (e) {
        res.status(500).send({"message" : "Unable to delete this product from your cart due to internal server error"})
    }
})













module.exports = router;