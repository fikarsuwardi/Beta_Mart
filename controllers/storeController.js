"use strict"
const { Store, Employee } = require("../models");
const { Op } = require("sequelize")
const convertRp = require("../helpers/convertRp")

class Controller {
    static dataStore(req, res) {
        Store.findAll({
            include: [
                Employee
            ],
            order: ["id"]
            
        })
        .then(data => {
            res.render('home', { data })    
        })
        .catch(err => {
            res.send(err)
        })
    }

    static formAddStore(req, res) {
        res.render('addStore')
    }

    static addStore(req, res) {
        const { name, code, location, category } = req.body
        const option = { name, code, location, category }
        Store.create(option)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            res.send(err);
        })

    }

    static detailStore(req, res) {
        const storeId = +req.params.storeId
        Store.findOne({
            include: [
                Employee
            ],
            where: { id: storeId }
        })
        .then(storeData => {
            let employees = storeData.Employees
            console.log("aaaa", storeData);
            console.log("bbbb", employees);
            res.render('detailStore', {
                storeData, employees, convertRp,
            })
        })
        .catch(err => {
            res.send(err);
        })
    }

    static formAddEmployee(req, res) {
        const errors = req.query.errors
        const storeId = +req.params.storeId
        Store.findByPk(storeId)
            .then((data) => {
                res.render('addEmployee', { data, errors })
            })
            .catch((err) => {
                res.send(err)
            })

    }

    static addEmployee(req, res) {
        const storeId = +req.params.storeId
        const {firstName, lastName, dateOfBirth, education, position, salary} = req.body
        Employee.create({
            firstName, lastName, dateOfBirth, education, position, StoreId: storeId, salary
        })
        .then(_ => {
            res.redirect(`/stores/${storeId}`)
        })
        .catch((err) => {
            let error = []
            if (err.name === `SequelizeValidationError`) {
                err.errors.map(el => error.push(el.message))
            }
            res.send(err)
        })
    }

    static formEditEmployee(req, res) {
        const storeId  = +req.params.storeId
        const employeeId = +req.params.employeeId
        Store.findOne({
            where: {
                id: storeId
            },
            include: [
                {
                    model: Employee,
                    where: { 
                        id: employeeId,
                    }
                }                
            ],
        })
        .then(data => {
            let dataEmployee = data.Employees;
            res.render('editEmployee', { data, dataEmployee})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editEmployee(req, res) {
        const storeId = +req.params.storeId
        const employeeId = +req.params.employeeId
        const { firstName, lastName, dateOfBirth, education, position, salary } = req.body
        const editEmployee = {
            firstName, lastName, dateOfBirth, education, position, salary
        }
        Employee.update(
            editEmployee, {
            where: {
                id: employeeId
            }
        })
        .then(() => {
            res.redirect(`/stores/${storeId}`)
        })
        .catch(err => {
            let error = []
            if (err.name === `SequelizeValidationError`) {
                err.errors.map(el => error.push(el.message))
            }
            res.send(err)
        })

    }

    static deleteEmployee(req, res) {
        const storeId = +req.params.storeId
        const employeeId = +req.params.employeeId
        const options = {
            where: {
                id: employeeId
            }
        }
        Employee.destroy(options)
        .then(() => {
            res.redirect(`/stores/${storeId}`)
        })
        .catch((err) => {
            res.send(err)
        })
    }
}

module.exports = Controller