const sequelize = require('sequelize');
const db = require('../config/db');

const ServiciosAdicionales = db.define('serviciosadicionales', {
    C_avion: {

        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

  
    internet: {
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,

        validate: {
            notEmpty: true
        }
    ,
    cant_tv: {
        type: sequelize.INTEGER,
        allowNull: false,

    }
    

} }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = ServiciosAdicionales;