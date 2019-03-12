const sequelize = require('sequelize');
const db = require('../config/db');

const pasajeros = db.define("pasajero", {
  Nombre: {
    type: sequelize.STRING,
    allowNull: false
  },
  Apellido: {
    type: sequelize.STRING,
    allowNull: false
  },
  edad: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  Pasaporte_P: {

    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false ,
    unique: true
    
},
Genero: {
    type: sequelize.STRING,
    allowNull: false
  },

  nacionalidad: {
    type: sequelize.STRING,
    allowNull: false
  },
}, {
  timestamps: false,
  freezeTableName: true

});



module.exports = pasajeros;
