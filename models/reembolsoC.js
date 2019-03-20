const sequelize = require('sequelize');
const db = require('../config/db');

const reembolsoCliente = db.define('reembolsoP', {
    C_manifiesto: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true, 
    },

     cedula: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
     Pago: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    fecha_reembolso: {

        type: sequelize.STRING,
        allowNull: false
    },
   }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = reembolsoCliente;