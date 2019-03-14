const sequelize = require('sequelize');
const db = require('../config/db');

const EstadoAvion = db.define('estadoavion', {
    C_estado: {

        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    Nombre: {

        type: sequelize.STRING,
        allowNull: false
    } 
   }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = EstadoAvion;