const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const md5 = require("md5");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/db");
const { SALT } = process.env;

const Boleto = db.define('boleto', {
    C_boleto: {

        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    C_vuelo: {

        type: sequelize.INTEGER,
        allowNull: false
    },
    
    C_asiento: {

        type: sequelize.INTEGER,
        allowNull: false
    },
    Pasaporte_P: {

        type: sequelize.INTEGER,
        allowNull: false
    },
    C_equipaje: {

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

module.exports = Boleto;