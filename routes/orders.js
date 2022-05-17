const express = require('express');
const router = express.Router();
const orderDAL = require('../dal/orders')
const productDAL = require('../dal/products')

const {
    Order,
    OrderBreakdown,
    OrderStatus,
} = require('../models');

const {
    bootstrapField,
    searchOrderForm,
    orderForm
} = require('../forms');

router.get('/', async function (req, res) {
    res.render('order_related/index')
})

router.get('/order', async function (req, res) {
    const allOrderStatuses = await orderDAL.getAllOrderStatuses()
    allOrderStatuses.unshift(["", "All"])
    const allProducts = await productDAL.getAllProducts()
    allProducts.unshift(["", "All"])

    const searchForm = searchOrderForm(allOrderStatuses, allProducts);

    let q = Order.collection();

    searchForm.handle(req, {
        'success': async function (form) {

            if (form.data.order_status_id) {
                q.where('order_status_id', '=', form.data.order_status_id)
            }

            if (form.data.min_amount) {
                q.where('total_amount', '>=', form.data.min_amount);
            }

            if (form.data.max_amount) {
                q.where('total_amount', '<=', form.data.max_amount);
            }

            if (form.data.products) {
                q.query('join', 'orders_product', 'orders.id', 'order_id')
                    .where('product_id', 'in', form.data.products.split(','))
            }

            let orders = await q.fetch({
                withRelated: ['order_status', 'products', 'order_breakdowns']
            })

            res.render('order_related/order/index', {
                orders: orders.toJSON(),
                searchForm: form.toHTML(bootstrapField)
            })
        },
        'error': async function (form) {
            let orders = await q.fetch({
                withRelated: ['order_status', 'products', 'order_breakdowns']
            })

            res.render('order_related/order/index', {
                orders: orders.toJSON(),
                searchForm: form.toHTML(bootstrapField)
            })

        },
        'empty': async function (form) {
            let orders = await q.fetch({
                withRelated: ['order_status', 'products', 'order_breakdowns']
            })

            res.render('order_related/order/index', {
                orders: orders.toJSON(),
                searchForm: form.toHTML(bootstrapField)
            })
        }
    })
})

router.get('/order/:order_id/update', async function (req, res) {

    const order = await orderDAL.getOrderById(req.params.order_id)

    // console.log(order.toJSON())

    const allOrderStatuses = await orderDAL.getAllOrderStatuses()
    // const allProducts = await productDAL.getAllProducts()
    // console.log(allProducts)

    const form = orderForm(allOrderStatuses)
    
    // console.log(form)

    // form.fields.total_amount.value = order.get('total_amount');
    // form.fields.payment_reference.value = order.get('payment_reference');
    form.fields.order_status_id.value = order.get('order_status_id');
    // form.fields.shipping_address.value = order.get('shipping_address');

    // let selectedProducts = await order.related('products').pluck('id');

    // let selectedProducts = (await order.related('products').fetch()).toJSON();
    // let selectedProductsIDs = selectedProducts.map( p => p.id);
    // console.log(selectedProducts)

    // form.fields.products.value = selectedProductsIDs

    res.render('order_related/order/update', {
        form: form.toHTML(bootstrapField),
        order: order.toJSON()
    })

})

router.post('/order/:order_id/update', async function (req, res) {

    const order = await orderDAL.getOrderById(req.params.order_id)

    const allOrderStatuses = await orderDAL.getAllOrderStatuses()
    const allProducts = await productDAL.getAllProducts()
    console.log(allProducts)

    const form = orderForm(allOrderStatuses, allProducts)

    form.handle(req, {
        'success': async(form) => {

            // let {
            //     // products,
            //     // ...restData
            //     order_status_id
            // } = form.data;

            order.set({order_status_id: form.data.order_status_id});
            order.set({date_updated: new Date() })

            await order.save()

            // let selectedProductsIDs = products.split(',');

            // let existingProducts = (await order.related('products').fetch()).toJSON();
            // let existingProductsIDs = existingProducts.map( p => p.id);

            // let toRemoveProducts = existingProductsIDs.filter(id => selectedProductsIDs.includes(id) === false);

            // await order.products().detach(toRemoveProducts);
            // await order.products().attach(selectedProductsIDs)

            req.flash("success_msg", "Order has been updated successfully!")
            res.redirect('/order-related/order');

        }, 'error': async (form) => {
            res.render('order_related/order/update', {
                form: form.toHTML(bootstrapField)
            })
        }
    })

})

router.get('/order/:order_id/delete', async function (req, res) {
    const order = await orderDAL.getOrderById(req.params.order_id)

    res.render('order_related/order/delete', {
        order: order.toJSON()
    })
})

router.post('/order/:order_id/delete', async function (req, res) {
    const order = await orderDAL.getOrderById(req.params.order_id)
    await order.destroy();
    res.redirect('/order-related/order')



})




module.exports = router