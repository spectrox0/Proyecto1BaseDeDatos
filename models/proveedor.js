const sequelize = require('sequelize');
const db = require('../config/db');

// Modelo de Proveedor
const Proveedores = db.define('proveedores', {
    C_proveedor: {

        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    Nombre: {

        type: sequelize.STRING,
        allowNull: false
    },
    tiempo_respuesta: {

            type: sequelize.INTEGER,
            allowNull: false
        
    },
    }, {
     // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
    freezeTableName: true
});

module.exports = Proveedores;