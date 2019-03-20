const sequelize = require('sequelize');
const db = require('../config/db');

const clienteBoleto = db.define("clienteboleto", {
  cedula: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  C_boleto: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  }
}, {
  timestamps: false,
  freezeTableName: true

});



module.exports = clienteBoleto;
