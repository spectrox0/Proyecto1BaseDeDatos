const sequelize = require('sequelize');
const db = require('../config/db');

const Tripulacion = db.define("tripulacion", {
  Nombre: {
    type: sequelize.STRING,
    allowNull: false
  },
  Apellido: {
    type: sequelize.STRING,
    allowNull: false
  },
  Pasaporte_T: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  cargo: {
    type: sequelize.STRING,
    allowNull: false
    
},
}, {
  timestamps: false,
  freezeTableName: true

});



module.exports = Tripulacion;
