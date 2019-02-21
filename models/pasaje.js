const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const md5 = require("md5");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/db");
const { SALT } = process.env;

const Boleto = db.define('boleto', {
    C_pasaje: {

        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    Precio_Total: {

        type: sequelize.INTEGER,
        allowNull: false
    } , 
   }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = Boleto;