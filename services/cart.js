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
            return "You have added this item to your cart successfully"
        } else if (cartItem && currentStock < cartItem.get('quantity') + quantity) {
            // what to return if not enough stock to add to cart??

            return `Only ${currentStock} of this item left`

        } else if (!cartItem && currentStock >= quantity) {
            cartItem = await cartDAL.createCartItem(
                this.userId,
                productId,
                quantity
            )
            return "You have added this item to your cart succesfully";
        } else if( !cartItem && currentStock == 0) {
            return "This item is currently out of stock"
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

    async stockCheck() {
        let cartItems = await cartDAL.getCart(this.userId)

        let insufficientStockItems = cartItems.filter(
            cartItem => cartItem.related('product').get('stock') < cartItem.get('quantity')
        )

        if(insufficientStockItems.length > 0) {
            insufficientStockItems.map(
                // item is CartItem, not Product!!!!!!
                async item => {
                    let quantityInStock = item.related('product').get('stock')

                    quantityInStock ? 
                    
                    await cartDAL.updateCartItemQuantity(this.userId, item.related('product').get('id'), quantityInStock) : await cartDAL.removeFromCart(this.userId, item.related('product').get('id'))
                    // console.log(quantityInStock)
                    // await cartDAL.updateCartItemQuantity(this.userId, item.related('product').get('id'), item.related('product').get('stock'))
                }
            )
        }
        return insufficientStockItems
        // console.log(cartItems.toJSON())
    }

}

module.exports = CartServices;