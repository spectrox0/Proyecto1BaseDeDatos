const sequelize = require('sequelize');
const db = require('../config/db');

const avionMantenimiento = db.define('avionmantenimiento', {
    C_mantenimiento: {

        type: sequelize.INTEGER,
        allowNull: false
    },

    C_avion: {
        unique: true,
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },

   }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = avionMantenimiento;