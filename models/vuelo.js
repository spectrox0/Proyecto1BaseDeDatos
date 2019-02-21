const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const md5 = require("md5");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/db");
const { SALT } = process.env;

const Vuelo = db.define('vuelo', {
    C_avion: {

        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    C_modelo: {

        type: sequelize.INTEGER,
        allowNull: false
    },
    C_estado: {
        

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
    } ,
    Internet: {
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,

        validate: {
            notEmpty: true
        }
    } ,
    TV: {
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,

        validate: {
            notEmpty: true
        }
    } ,
    IATA: {
        

        type: sequelize.INTEGER,
        allowNull: true
    
}

}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Avion;