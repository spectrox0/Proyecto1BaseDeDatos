const sequelize = require('sequelize');
const db = require('../config/db');

const VueloCharter = db.define('vuelocharter', {
    C_vuelo: {

        type: sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
  
 precio_distancia: {
        

    type: sequelize.INTEGER,
    allowNull: false


    

} }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = VueloCharter;