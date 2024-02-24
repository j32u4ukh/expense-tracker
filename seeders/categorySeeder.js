"use strict";

const { _, CATEGORY } = require("../services/record");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        id: 1,
        name: CATEGORY[1].description,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: CATEGORY[2].description,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: CATEGORY[3].description,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: CATEGORY[4].description,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: CATEGORY[5].description,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null);
  },
};
