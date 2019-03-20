const sequelize = require('sequelize');
const db = require('../config/db');

// Modelo de Proveedor
<<<<<<< HEAD
const Proveedor = db.define('proveedor', {
=======
const Proveedores = db.define('proveedores', {
>>>>>>> 19803b2457ee8ab59b480aa9d3dbd449ac7acffd
    C_proveedor: {

        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

<<<<<<< HEAD
    nombre: {
=======
    Nombre: {
>>>>>>> 19803b2457ee8ab59b480aa9d3dbd449ac7acffd

        type: sequelize.STRING,
        allowNull: false
    },
<<<<<<< HEAD
    tiempo_de_respuesta: {
=======
    tiempo_respuesta: {
>>>>>>> 19803b2457ee8ab59b480aa9d3dbd449ac7acffd

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

<<<<<<< HEAD
module.exports = Proveedor;
=======
module.exports = Proveedores;
>>>>>>> 19803b2457ee8ab59b480aa9d3dbd449ac7acffd
