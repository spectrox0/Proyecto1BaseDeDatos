const sequelize = require('sequelize');
const db = require('../config/db');

const cliente = db.define("cliente", {
  Nombre: {
    type: sequelize.STRING,
    allowNull: false
  },
  Apellido: {
    type: sequelize.STRING,
    allowNull: false
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true
  },
  cedula: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true
  },


telefono: {
    type: sequelize.STRING,
    allowNull: false
    
},
}, {
  timestamps: false,
  freezeTableName: true

});



module.exports = cliente;
