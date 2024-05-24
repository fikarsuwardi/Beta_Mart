"use strict"
const { Store, Employee} = require("../models");
const convertRp = require("../helpers/convertRp")

class Controller {
    static dataEmployee(req, res) {
        let position = req.query.position
        Employee.findAll({
            include: Store,
            order: [
            ['firstName', 'asc']
            ]
        })
        .then(data => {
            //console.log(data);
            res.render('employeeList', { data, convertRp})
        })
        .catch(err => {
            res.send(err)
        });
    }
}

module.exports = Controller