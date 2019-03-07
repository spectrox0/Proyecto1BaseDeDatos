const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const md5 = require("md5");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/db");
const { SALT } = process.env;

const Tripulacion = sequelize.define("tripulacion", {
  Nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Apellido: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Pasaporte_T: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  cargo: {
    type: Sequelize.STRING,
    allowNull: false
    
},
}, {
  timestamps: false,
  freezeTableName: true

});



module.exports = Tripulacion;
