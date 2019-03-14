const sequelize = require('sequelize');
const db = require('../config/db');

const ServiciosAdicionales = db.define('serviciosadicionales', {
    C_avion: {

        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },

  
    internet: {
        type: sequelize.TINYINT,
        allowNull: false,
    }
    ,
    cant_TV: {
        type: sequelize.INTEGER,
        allowNull: false,

    }
    

} , {
    timestamps: false,
    freezeTableName: true
} );

module.exports = ServiciosAdicionales;