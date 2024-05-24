"use strict"

const routes = require('express').Router()
const storeRoutes = require("./store")
const employeeRoutes = require("./employee")

routes.get("/", (req, res) => {
    res.redirect("/stores");
});
routes.use("/stores", storeRoutes)
routes.use("/employees", employeeRoutes)

module.exports = routes
