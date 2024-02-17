"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert(
        "users",
        [
          {
            id: 1,
            name: "廣志",
            email: "hiroshi@email.com",
            password: "password",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            name: "小新",
            email: "shinnnosuke@email.com",
            password: "password",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {
          transaction,
        }
      );
      await queryInterface.bulkInsert(
        "records",
        [
          {
            id: 1,
            name: "午餐",
            date: "2019-04-23",
            amount: 60,
            userId: 1,
            categoryId: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            name: "晚餐",
            date: "2019-04-23",
            amount: 60,
            userId: 1,
            categoryId: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 3,
            name: "捷運",
            date: "2019-04-23",
            amount: 120,
            userId: 1,
            categoryId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 4,
            name: "電影：驚奇隊長",
            date: "2019-04-23",
            amount: 220,
            userId: 2,
            categoryId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 5,
            name: "租金",
            date: "2015-04-01",
            amount: 25000,
            userId: 1,
            categoryId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {
          transaction,
        }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null);
  },
};
