const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;

const sequelize = require("../config/db");


const VueloAsiento = sequelize.define("vueloasientos", {
 
  Cant_vendidos: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  C_vuelo: {
      type: Sequelize.INTEGER, 
      primaryKey: true, 
      allowNull:false, 
  } , 
  C_asiento: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    allowNull:false, 
} ,
 Disponibles: {
    type: Sequelize.TINYINT, 
    allowNull:false, 
    defaultValue: 1
 }


}
, {
  timestamps: false,
  freezeTableName: true
} );



module.exports = VueloAsiento;