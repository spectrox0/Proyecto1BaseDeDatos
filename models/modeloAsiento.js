const sequelize = require('sequelize');
const db = require('../config/db');


const ModeloAsiento = db.define("modeloasientos", {
 
  Cantidad: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  C_modelo: {
      type: sequelize.INTEGER, 
      primaryKey: true, 
      allowNull:false, 
  } , 
  C_asiento: {
    type: sequelize.INTEGER, 
    primaryKey: true, 
    allowNull:false, 
} 


}
, {
  timestamps: false,
  freezeTableName: true
} );



module.exports = ModeloAsiento;