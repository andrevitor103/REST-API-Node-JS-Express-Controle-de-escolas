"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "testes",
      [
        {
          teste: "Óla mundo das Seeds",
        },
        {
          teste: "Showw rapaa",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("testes", null, {});
  },
};
