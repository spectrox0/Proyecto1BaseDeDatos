const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;

const sequelize = require("../config/db");


const VueloAsiento = sequelize.define("vueloasientosvendidos", {
 
  disponibles: {
    type: Sequelize.INTEGER,
    allowNull: false,
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
} 


});



module.exports = VueloAsiento;