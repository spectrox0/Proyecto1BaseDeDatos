const sequelize = require('sequelize');
const db = require('../config/db');

const TripulacionVuelo = db.define("vuelotripulacion", {

  Pasaporte_T: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    
  },
  C_vuelo: {

    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
},
}, {
  timestamps: false,
  freezeTableName: true

});

module.exports = TripulacionVuelo;
