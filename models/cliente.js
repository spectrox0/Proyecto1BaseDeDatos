const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const md5 = require("md5");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/db");
const { SALT } = process.env;

const usuario = sequelize.define("cliente", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  apellido: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  cedula: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true
  },


telefono: {
    type: Sequelize.STRING,
    allowNull: false
    
},


});



module.exports = usuario;
