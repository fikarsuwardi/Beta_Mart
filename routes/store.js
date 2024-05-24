"use strict"

const storeRoutes = require("express").Router();
const Controller = require("../controllers/storeController")

storeRoutes.get("/", Controller.dataStore) //done

storeRoutes.get("/add", Controller.formAddStore) //done
storeRoutes.post("/add", Controller.addStore) //done

storeRoutes.get("/:storeId", Controller.detailStore)

storeRoutes.get("/:storeId/employees/add", Controller.formAddEmployee) //done
storeRoutes.post("/:storeId/employees/add", Controller.addEmployee) //done

storeRoutes.get("/:storeId/employees/:employeeId/edit", Controller.formEditEmployee)
storeRoutes.post("/:storeId/employees/:employeeId/edit", Controller.editEmployee)

storeRoutes.get("/:storeId/employees/:employeeId/delete", Controller.deleteEmployee)

module.exports = storeRoutes