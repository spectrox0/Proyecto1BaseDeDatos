const sequelize = require('sequelize');
const db = require('../config/db');

const Vuelo = db.define('vuelo', {
    C_vuelo: {

        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    C_avion: {

        type: sequelize.INTEGER,
        allowNull: false
    },
    Fecha_salida: {
        

            type: sequelize.STRING,
            allowNull: false
        
    },
    Hora_salida: {
        

        type: sequelize.STRING,
        allowNull: false
    
},
 hora_llegada: {
        

    type: sequelize.STRING,
    allowNull: false

}
    

 }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = Vuelo;