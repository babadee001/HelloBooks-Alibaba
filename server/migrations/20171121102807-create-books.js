module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Books', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    isbn: {
      type: Sequelize.TEXT
    },
    author: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    cover: {
      type: Sequelize.STRING
    },
    catId: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Books')
};
