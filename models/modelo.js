const sequelize = require('sequelize');
const db = require('../config/db');

const Modelo = db.define('modelo', {
    C_modelo: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nombre: {
        type: sequelize.STRING,
        allowNull: false

    } ,
    vel_max: {
        type: sequelize.FLOAT,
        allowNull: false

    } 
    ,
    vel_crucero: { 
        type: sequelize.FLOAT,
        allowNull:false 
    }
    ,
     peso_max: { 
        type: sequelize.FLOAT,
        allowNull:false 
    } , 
    peso_vacio: { 
        type: sequelize.FLOAT,
        allowNull:false 
    } ,
    combustible: {
        type: sequelize.STRING,
        allowNull: false

    } ,
    cant_banos: {
        type: sequelize.INTEGER,
        allowNull: false

    } ,
    cant_salida_emerg: {
        type: sequelize.INTEGER,
        allowNull: false

    } ,
    dist_despegue_carga_max: {
        type: sequelize.FLOAT,
        allowNull: false

    }
    
   }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = Modelo;