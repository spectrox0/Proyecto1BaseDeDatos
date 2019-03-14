const sequelize = require('sequelize');
const db = require('../config/db');

const Mantenimiento = db.define('mantenimiento', {
    C_mantenimiento: {

        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    Nombre: {

        type: sequelize.STRING,
        allowNull: false
    } , 
     dias: {

        type: sequelize.INTEGER,
        allowNull: false
    } ,   

   }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = Mantenimiento;