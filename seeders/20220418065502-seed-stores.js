'use strict';
const fs = require('fs');

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  const stores = JSON.parse(fs.readFileSync("./data/stores.json", "utf-8"))
  stores.forEach(el => {
    el.createdAt = new Date();
    el.updatedAt = new Date();
  });
  return queryInterface.bulkInsert("Stores", stores, {});
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Employees", null, {});
  }
};
