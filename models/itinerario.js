const sequelize = require('sequelize');
const db = require('../config/db');

const Itinerario = db.define('itinerario', {
    C_itinerario: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    IATA_origen: {
        type: sequelize.STRING,
        allowNull: false

    } ,
    IATA_destino: {
        type: sequelize.STRING,
        allowNull: false

    } 
    ,
    precio_base: { 
        type: sequelize.FLOAT,
        allowNull:false 
    }
   }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = Itinerario;