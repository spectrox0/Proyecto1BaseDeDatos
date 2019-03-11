
const sequelize = require('sequelize');
const db = require('../config/db');
const Asiento = db.define('asiento', {
    C_asiento: {

        type: sequelize.STRING,
        primaryKey: true,

        allowNull: false
    },
    tipo: {
        type: sequelize.STRING,
        allowNull: false

    } 
    ,
   
   }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = Asiento;