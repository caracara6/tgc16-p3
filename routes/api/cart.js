const express = require('express');
const router = express.Router();

const { checkIfAuthenticatedJWT } = require('../../middlewares');

const CartServices = require('../../services/cart');

router.get('/', checkIfAuthenticatedJWT, async function (req, res) {
    let cartServices = new CartServices(req.user.id)

})













module.exports = router;