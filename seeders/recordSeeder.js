"use strict";

const bcrypt = require("bcryptjs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let transaction;

    try {
      transaction = await queryInterface.sequelize.transaction();

      const hash = await bcrypt.hash("12345678", 10);

      await queryInterface.bulkInsert(
        "Users",
        [
          {
            id: 1,
            name: "Guangzhi",
            email: "user1@example.com",
            password: hash,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            name: "Xiaoxin",
            email: "user2@example.com",
            password: hash,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { transaction }
      );

      await queryInterface.bulkInsert(
        "Expenses",
        [
          {
            id: 1,
            name: "Lunch",
            date: new Date("2019-04-23"),
            amount: 60,
            userId: 1,
            categoryId: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            name: "Dinner",
            date: new Date("2019-04-23"),
            amount: 60,
            userId: 1,
            categoryId: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 3,
            name: "MRT",
            date: new Date("2019-04-23"),
            amount: 120,
            userId: 1,
            categoryId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 4,
            name: "Movie: Captain America",
            date: new Date("2019-04-23"),
            amount: 220,
            userId: 2,
            categoryId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 5,
            name: "Rent",
            date: new Date("2019-04-01"),
            amount: 25000,
            userId: 1,
            categoryId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      if (transaction) await transaction.rollback();
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Expenses", null, {});
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
