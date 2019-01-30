const sequelize = require('sequelize');
const database = require('../config/database');
const Avion = require('../models/avion');

const controller = {};

controller.getAviones = async function (callback) {
    console.log("sasad");
    try {
        let response = await Avion.findAll({
           where: {
               Activo: 1
           }
        });
        let aviones = response.map(result => result.dataValues);
        console.log(aviones);
        callback(aviones, null);
    } catch (error) {
        callback(null, error);
    }
};

controller.deleteAvion = async function (id, callback) {
    try {
        let response = await Avion.update({
            Activo: false
        }, {
            where: {
                id
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}
controller.updateAvion = async function (data, callback) {
    try {
        let response = await Avion.update({
        C_avion : data.C_avion,
        C_modelo : data.C_modelo,
        C_estado : data.C_estado

        }, {
            where: {
                data
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createAvion = async function (data, callback) {
    try {
        console.log(data.C_avion, data.C_estado,C_modelo);
        // code goes here
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;