const dotenv = require('dotenv');

dotenv.load();

module.exports = {
  development: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    port: process.env.port,
    dialect: 'postgres'
  },
  test: {
    url: process.env.DB_TEST_URL,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
