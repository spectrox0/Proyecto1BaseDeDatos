const sequelize = require('sequelize');
const db = require('../config/db');

// Modelo de Producto
const Avion = db.define('avion', {
    C_avion: {

        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
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
    C_itinerario: {

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

module.exports = Avion;