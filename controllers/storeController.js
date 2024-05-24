"use strict"
const { Store, Employee } = require("../models");
const { Op } = require("sequelize")
const convertRp = require("../helpers/convertRp")

class Controller {
    static dataStore(req, res) {
        Store.findAll({
            include: [Employee],
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
        //let totalSalary = 0
        Store.findOne({
            include: [Employee],
            where: { id: storeId }
        })
        .then(data => {
            console.log(data, "asdsdas");
            // console.log(data.name, "aaaaaaaaaaaaaa");
            let employee = data.Employees[0]
            let salary = data.Employees[0].salary
            // let age = employee.
            console.log(data.Employees.length, "---0-0-0-0-0-");
            // console.log(salary); //500000
            // console.log(employee.firstName); //uchiha
            res.render('detailStore', {data, convertRp, employee, salary})
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
        Employee.create({firstName, lastName, dateOfBirth, education, position, salary})
        .then(_ => {
            res.redirect(`/stores/${toreId}`)
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
        const errors = req.query.errors
        Store.findByPk(storeId)
        .then(data => {
            res.render('addEmployee', { data, errors, convertRp })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editEmployee(req, res) {
        const storeId = +req.params.storeId
        const { firstName, lastName, dateOfBirth, education, position, salary } = req.body
        Employee.create({ firstName, lastName, dateOfBirth, education, position, salary })
        .then(_ => {
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