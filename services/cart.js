const cartDAL = require('../dal/cart_items');
const productDAL = require('../dal/products')

class CartServices {
    constructor(userId) {
        this.userId = userId
    }

    async getCart() {
        return await cartDAL.getCart(this.userId)
    }

    async addToCart(productId, quantity) {
        let product = await productDAL.getProductById(productId)
        let currentStock = product.get('stock')

        let cartItem = await cartDAL.getCartItemByUserAndProduct(this.userId, productId)

        if(cartItem && currentStock >= cartItem.get('quantity') + quantity) {
            await cartDAL.updateCartItemQuantity(
                this.userId,
                productId, 
                cartItem.get('quantity') + quantity
                )
            return cartItem
        } else if (cartItem && currentStock < cartItem.get('quantity') + quantity) {
            // what to return if not enough stock to add to cart??
        } else if (!cartItem && currentStock >= quantity) {
            cartItem = await cartDAL.createCartItem(
                this.userId,
                productId,
                quantity
            )
            return cartItem;
        } else if( !cartItem && currentStock == 0) {
            //what to return if no stock at all??
        }
    }

    async updateQuantity(productId, newQuantity) {
        let product = await productDAL.getProductById(productId)
        // let cartItem = await cartDAL.getCartItemByUserAndProduct(this.userId, productId)

        if(product.get('stock') >= newQuantity) {
            await cartDAL.updateCartItemQuantity(this.userId, productId, newQuantity);
            return true
        } else {
            return false
        }
    }

    async removeFromCart(productId) {
        await cartDAL.removeFromCart(this.userId, productId);
    }

}

module.exports = CartServices;