const sequelize = require('sequelize');
const db = require('../config/db');

const Boleto = db.define('boleto', {
    C_pasaje: {

        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    Precio_Total: {

        type: sequelize.INTEGER,
        allowNull: false
    } , 
   }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = Boleto;