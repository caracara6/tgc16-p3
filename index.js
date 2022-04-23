const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();

const app = express();

app.set("view engine", "hbs");

app.use(express.static("public"));

wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

app.use(
  express.urlencoded({
    extended: false
  })
);

const routes = {
    landingRoutes : require('./routes/landing')
}



async function main() {
    app.use('/', routes.landingRoutes)
  
}

main();

app.listen(8080, () => {
  console.log("Server has started");
});