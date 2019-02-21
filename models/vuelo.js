const sequelize = require('sequelize');
const db = require('../config/db');

const Vuelo = db.define('vuelo', {
    C_vuelo: {

        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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

},
C_itinerario: {

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
    

} }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = Vuelo;