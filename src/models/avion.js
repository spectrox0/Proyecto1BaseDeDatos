const sequelize = require("sequelize");
const database= require('../config/database');

    const Avion = database.define("avion", {

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
        
    }
})
module.exports = Avion;

//avion.sync();
