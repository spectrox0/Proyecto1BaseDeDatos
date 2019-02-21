const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const md5 = require("md5");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/db");
const { SALT } = process.env;

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