const sequelize = require('sequelize');
const db = require('../config/db');

const VueloAsiento = db.define("vueloasientos", {
 
  Cant_vendidos: {
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  C_vuelo: {
      type: sequelize.INTEGER, 
      primaryKey: true, 
      allowNull:false, 
  } , 
  C_asiento: {
    type: sequelize.INTEGER, 
    primaryKey: true, 
    allowNull:false, 
} ,
 Disponibles: {
    type: sequelize.TINYINT, 
    allowNull:false, 
    defaultValue: 1
 }


}
, {
  timestamps: false,
  freezeTableName: true
} );



module.exports = VueloAsiento;