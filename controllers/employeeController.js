"use strict"
const { Store, Employee} = require("../models");
const { Op } = require("sequelize") // untuk search
const convertRp = require("../helpers/convertRp")

class Controller {
    static dataEmployee(req, res) {
        const options = {
            order: [["firstName", "asc"]],
            where: {},
            include : Store,
        }

        if(req.query.position) {
            options.where = {
                position: {
                    [Op.iLike]: `%${req.query.position}%`
                }
            }   
        }

        Employee.findAll(options)
        .then(data => {
            // res.send(data);
            res.render('employeeList', { data, convertRp})
        })
        .catch(err => {
            res.send(err)
        });
    }
}

module.exports = Controller