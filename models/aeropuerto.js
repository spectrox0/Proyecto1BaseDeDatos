const sequelize = require('sequelize');
const db = require('../config/db');

const Aeropuerto = db.define('aeropuerto', {
    IATA: {

        type: sequelize.STRING,
        primaryKey: true,

        allowNull: false
    },
    Pais: {
        type: sequelize.STRING,
        allowNull: false

    } ,
    Ciudad: {
        type: sequelize.STRING,
        allowNull: false

    } 
    ,
    Nombre: {
        type: sequelize.STRING,
        allowNull: false

    } 
    ,
    Dist_pista: { 
        type: sequelize.STRING,
        allowNull:false 
    }
   }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = Aeropuerto;