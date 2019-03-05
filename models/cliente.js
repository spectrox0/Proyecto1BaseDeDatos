const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const md5 = require("md5");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/db");
const { SALT } = process.env;

const cliente = sequelize.define("cliente", {
  Nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Apellido: {
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
}, {
  timestamps: false,
  freezeTableName: true

});



module.exports = cliente;
