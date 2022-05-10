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
        console.log('testing 3')
        let product = await productDAL.getProductById(parseInt(productId))
        let currentStock = product.get('stock')
        console.log(product)
        let cartItem = await cartDAL.getCartItemByUserAndProduct(this.userId, productId)

        // product already in user's cart, and sufficient stock
        if(cartItem && currentStock >= cartItem.get('quantity') + quantity) {
            console.log('1')
            await cartDAL.updateCartItemQuantity(
                this.userId,
                productId, 
                cartItem.get('quantity') + quantity
                )
            console.log('1')

            return "You have added this item to your cart successfully"

            //product already in user's cart but insufficient stock
        } else if (cartItem && currentStock < cartItem.get('quantity') + quantity) {
            console.log('2')

            return `Only ${currentStock} of this item left`

            //product not yet already in user's cart, and sufficient stock
        } else if (!cartItem && currentStock >= quantity) {
            console.log('testing 3')

            cartItem = await cartDAL.createCartItem(
                this.userId,
                productId,
                quantity
            )
            console.log('testing 3')

            return "You have added this item to your cart succesfully";
            
            //product not yet in user's cart and insufficient stock
        } else if( !cartItem && currentStock == 0) {
            console.log('4')

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