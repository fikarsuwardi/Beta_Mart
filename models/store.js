'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.hasMany(models.Employee);
    }
  }
  Store.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    location: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Store',
    hooks: {
      beforeCreate: (instance, options) => {
        let code = ""
        if (instance.category === "Mart") {
          code = "001"
        } else if (instance.category === "Midi") {
          code = "002"
        } else if (instance.category === "Express") {
          code = "003"
        }
        let date = new Date()
        instance.code = `${code}-${date.getTime()}`
      } 
    }
  });
  return Store;
};