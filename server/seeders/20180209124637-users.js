import dotenv from 'dotenv';

const bcrypt = require('bcrypt');

dotenv.load();

const { adminPassword } = process.env;

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    userName: 'admin',
    membership: 'gold',
    email: 'admin@hellobooks.com',
    password: bcrypt.hashSync(adminPassword, 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', [{
    username: 'admin'
  }])
};
