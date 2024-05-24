"use strict"

const employeeRoutes = require('express').Router()
const Controller = require("../controllers/employeeController")

employeeRoutes.get("/", Controller.dataEmployee) // done

module.exports = employeeRoutes