const sequelize = require('sequelize');
const db = require('../config/db');

const Pasaje = db.define('pasaje', {
    C_pasaje: {

        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    Precio_total: {

        type: sequelize.FLOAT,
        allowNull: false
    } , 
     fechaCompra: {

        type: sequelize.STRING,
        allowNull: false
    } ,   

    C_cliente: {
        type: sequelize.INTEGER,
        allowNull: false
    },
   }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = Pasaje;