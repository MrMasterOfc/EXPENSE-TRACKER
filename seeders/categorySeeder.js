'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          id: 1,
          name: "Housing and Utilities",
          icon: "fa-solid fa-house",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Transportation and Commuting",
          icon: "fa-solid fa-van-shuttle",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: "Leisure and Entertainment",
          icon: "fa-solid fa-face-grin-beam",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: "Food and Dining",
          icon: "fa-solid fa-utensils",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: "Others",
          icon: "fa-solid fa-pen",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
