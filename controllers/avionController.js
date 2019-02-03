const sequelize = require('sequelize');
const db = require('../config/db');
const Avion = require('../models/Avion');

const controller = {};

controller.getAviones = async function (callback) {
    try {
        let response = await Avion.findAll({
            where: {
                Activo: 1
            }
        });
        let aviones= response.map(result => result.dataValues);
        console.log(aviones);
        callback(aviones, null);
    } catch (error) {
        callback(null, error);
    }
}

controller.deleteAvion= async function (C_avion, callback) {
    try {
        let response = await Avion.update({
            Activo: false
        }, {
            where: {
                C_avion
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createAvion = async function (data, callback) {
    try {
         var tv, internet ;
        
          if (data.TV=='on') {
              tv=1;
          } else tv=0;
          if (data.Internet=='on') {
              internet=1
          } else internet=0;
        // code goes here
        let response = await Avion.create({
        C_estado: data.estado,
        C_modelo: data.modelo,
        IATA: data.IATA,
        TV: tv,
        Internet : internet,
        } 
        );
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.updateAvion = async function (data,C_avion, callback) {
    try {
         var tv, internet ;
         console.log('Llego aca');
          if (data.TV=='on') {
              tv=1;
          } else tv=0;
          if (data.Internet=='on') {
              internet=1
          } else internet=0;
        // code goes here
        let response = await Avion.update({
        C_estado: data.estado,
        C_modelo: data.modelo,
        IATA: data.IATA,
        TV: tv,
        Internet : internet
        },{
            where: {
               C_avion
            } }); 
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;