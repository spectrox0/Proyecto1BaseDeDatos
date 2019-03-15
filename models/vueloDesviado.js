const sequelize = require('sequelize');
const db = require('../config/db');

const VueloDesviado = db.define('vuelodesviado', {
    C_vuelo: {

        type: sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false
    },

 
        nuevoDestino: {
            type: sequelize.STRING,
    
            allowNull: false
        },

        C_vueloCharter: {
            type: sequelize.INTEGER,
            allowNull: false
        } 
  

 }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = VueloDesviado;