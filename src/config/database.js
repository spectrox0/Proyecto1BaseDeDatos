const Sequelize = require("sequelize");
let { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sequelize = () => {
  console.log(DB_NAME, DB_USER, DB_PASSWORD);
  DB_NAME = 'areopuertosguacamaya';
  DB_USER = 'root';
  DB_PASSWORD = 'Trino';
  return new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
}

module.exports = sequelize;