'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn("Employees", "StoreId", {
      type: Sequelize.INTEGER,
      references : {
        model: 'Stores',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  down (queryInterface, Sequelize) {
    queryInterface.removeColumn("Employees", "StoreId");
  }
};