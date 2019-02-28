const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;

const sequelize = require("../config/db");


const ModeloAsiento = sequelize.define("modeloasientos", {
 
  Cantidad: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  C_modelo: {
      type: Sequelize.INTEGER, 
      primaryKey: true, 
      allowNull:false, 
  } , 
  C_asiento: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    allowNull:false, 
} 


});



module.exports = ModeloAsiento;