const sequelize = require('sequelize');
const db = require('../config/db');

// Modelo de Producto
const Avion = db.define('avion', {
    C_avion: {

        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    C_modelo: {

        type: sequelize.INTEGER,
        allowNull: false
    },
    C_estado: {
        

            type: sequelize.INTEGER,
            allowNull: false
        
    },
    Activo: {
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,

        validate: {
            notEmpty: true
        }
    } 
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Avion;