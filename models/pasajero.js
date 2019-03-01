const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const md5 = require("md5");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/db");
const { SALT } = process.env;

const pasajeros = sequelize.define("pasajero", {
  Nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Apellido: {
    type: Sequelize.STRING,
    allowNull: false
  },
  edad: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Pasaporte_P: {

    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false ,
    unique: true
    
},
Genero: {
    type: Sequelize.STRING,
    allowNull: false
  },

  nacionalidad: {
    type: Sequelize.STRING,
    allowNull: false
  },


});



module.exports = pasajeros;
