const sequelize = require('sequelize');
const db = require('../config/db');

const Fabricante = db.define('fabricante', {
    C_fabricante: {

        type: sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false
    },

 
        Nombre: {
            type: sequelize.STRING,
    
            allowNull: false
        },
  

 }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = Fabricante;