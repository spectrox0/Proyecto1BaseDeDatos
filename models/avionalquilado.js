const sequelize = require('sequelize');
const db = require('../config/db');

// Modelo de Producto
const AvionAlquilado = db.define('avionalquilado', {
    C_avion: {

        type: sequelize.INTEGER,
        primaryKey: true,

        unique: true,
        allowNull: false
    },
    C_proveedor: {

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

module.exports = AvionAlquilado;