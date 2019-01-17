module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Borroweds', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    bookId: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER
    },
    expires: {
      type: Sequelize.DATE
    },
    returnDate: {
      type: Sequelize.DATE
    },
    returned: {
      type: Sequelize.BOOLEAN
    },
    title: {
      type: Sequelize.STRING
    },
    cover: {
      type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Borroweds')
};
