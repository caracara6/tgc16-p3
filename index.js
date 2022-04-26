const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();

const session = require('express-session');
const flash = require('connect-flash');
const FileStore = require('session-file-store')(session);

const csrf = require('csurf');

// create an instance of express app
const app = express();

// set the view engine
app.set("view engine", "hbs");

// static folder
app.use(express.static("public"));

// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// enable forms
app.use(
	express.urlencoded({
		extended: false
	})
);

app.use(session({
    'store': new FileStore(),
    'secret': 'keyboard cat',
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
app.use(csrf());

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

const routes = {
	landingRoutes: require('./routes/landing'),
	productRoutes: require('./routes/products'),
    userRoutes: require('./routes/users'),
    cloudinaryRoutes: require('./routes/cloudinary')

}

async function main() {
	app.use("/", routes.landingRoutes);
	app.use("/product-related", routes.productRoutes);
    app.use('/cloudinary', routes.cloudinaryRoutes);
    app.use('/user', routes.userRoutes)

}

main();

app.listen(8080, () => {
	console.log("Server has started");
});