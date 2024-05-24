'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Employees', 'salary', Sequelize.INTEGER, {});
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Employees", "salary");
  }
};
