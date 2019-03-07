const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const md5 = require("md5");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/db");
const { SALT } = process.env;

const pasajeros = sequelize.define("pasajero", {
Pasaporte_P: {
    
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false ,
    unique: true
    
},
  cant_Equipaje: {
    type: Sequelize.STRING,
    allowNull: false
  },
  C_vuelo: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Nro_Asiento: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
}, {
  timestamps: false,
  freezeTableName: true

});



module.exports = pasajeros;
