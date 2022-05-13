const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();

const session = require('express-session');
const flash = require('connect-flash');
const FileStore = require('session-file-store')(session);

const csrf = require('csurf');

const cors = require('cors')

// create an instance of express app
const app = express();

// set the view engine
app.set("view engine", "hbs");

// static folder
app.use(express.static("public"));

// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

app.use(cors({origin: ['http://localhost:3000']}));

// enable forms
app.use(
	express.urlencoded({
		extended: false
	})
);



app.use(session({
    'store': new FileStore(),
    'secret': process.env.SESSION_SECRET_KEY,
    'resave': false,
    'saveUninitialized': true
}))

app.use(flash());

app.use(function(req,res,next){
    res.locals.success_msg = req.flash("success_msg");
    res.locals.err_msg = req.flash("err_msg");
    next();    
})

//CSRF
const csurfInstance = csrf();
app.use(function(req,res,next){

    if (req.url === '/checkout/process_payment' || req.url.slice(0,5)=='/api/') {
        next();
    } else {
        csurfInstance(req,res,next);
    }
})

app.use(function(req,res,next){
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use((err, req, res, next)=>{
    if (err && err.code == "EBADCSRFTOKEN") {
        req.flash('err_msg', 'The form has expired. Please try again');
        res.redirect('back');
    } else {
        next()
    }
})

app.use(function(req,res,next){
    res.locals.user = req.session.user;
    next();
})

const http = {
	landingRoutes: require('./routes/landing'),
	productRoutes: require('./routes/products'),
    userRoutes: require('./routes/users'),
    cloudinaryRoutes: require('./routes/cloudinary')

}

const api = {
    userRoutes : require('./routes/api/users'),
    productRoutes: require('./routes/api/products'),
    cartRoutes: require('./routes/api/cart'),
    checkoutRoutes: require('./routes/api/checkout')
}



const { checkIfAuthorised } = require('./middlewares');

async function main() {
	app.use("/", http.landingRoutes);
	app.use("/product-related", checkIfAuthorised, http.productRoutes);
    app.use('/cloudinary', http.cloudinaryRoutes);
    app.use('/user', http.userRoutes)
    app.use('/api/user', express.json(), api.userRoutes);
    app.use('/api/product-related', express.json(), api.productRoutes);
    app.use('/api/cart', express.json(), api.cartRoutes);
    app.use('/api/checkout', api.checkoutRoutes);

}

main();

app.listen(process.env.PORT, () => {
	console.log("Server has started");
});