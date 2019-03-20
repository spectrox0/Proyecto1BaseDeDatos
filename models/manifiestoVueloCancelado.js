const sequelize = require('sequelize');
const db = require('../config/db');

const manifiestoVueloCancelado = db.define('manifiestovuelocancelado', {
    C_manifiesto: {

        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true, 
        autoIncrement: true
    },

    C_vuelo: {
        unique: true,
        type: sequelize.INTEGER,
        allowNull: false
    },
    fecha_cancelacion: {

        type: sequelize.STRING,
        allowNull: false
    },
   }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = manifiestoVueloCancelado;