'use strict';
const { Model } = require('sequelize');
const { Op } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.Store)
    }

    static getEmployeesByPosition(position) {
      if (position === "Staff") {
        return { position: "Staff" }
      } else if (position === "Supervisor") {
        return { position: "Supervisor" }
      } else if (position === "Manager") {
        return { position: "Manager"}
      } else if (position === "CEO") {
        return { position: "CEO" }
      }
    }

    get Age() {
      return 2022 - this.dateOfBirth.getFullYear() 
    }

  }
  Employee.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "firstName tidak boleh null"},
        notEmpty: { msg: "firstName harus diisi"}
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "lastName tidak boleh null"},
        notEmpty: { msg: "lastName harus diisi"}
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "dateOfBirth tidak boleh null" },
        notEmpty:{ msg: "dateOfBirth harus diisi" },
        dateValidation(value) {
          if (new Date().getFullYear() - new Date(value).getFullYear() <= 17) {
            throw new Error("pelamar hanya boleh berumur 17 tahun")
          }
        }
      }
    },
    education: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "education tidak boleh null"},
        notEmpty: { msg: "education harus diisi"}
      }
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "position tidak boleh null"},
        notEmpty: { msg: "position harus diisi"},
        positionValidation() {
          if ((this.education !== 'S2' ||  this.education !== 'S3') && (this.position === "Manager" || this.position === "CEO")) {
            throw new Error("CEO dan Manager hanya untuk S2 atau S3")
          }
        }
      }
    },
    StoreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "StoreId tidak boleh null"},
        notEmpty: { msg: "StoreId harus diisi"}
      }
    },
    salary: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull: { msg: "salary tidak boleh null"},
        notEmpty: { msg: "salary harus diisi"}
      }
    }
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};