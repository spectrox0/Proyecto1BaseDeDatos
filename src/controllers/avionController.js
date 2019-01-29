const sequelize = require('sequelize');
const database = require('../config/database');
const Avion = require('../models/Avion');

const controller = {};

controller.getAviones = async function (callback) {
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
}

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

controller.createAvion = async function (data, callback) {
    try {
        console.log(data.nombre, data.precio);
        // code goes here
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;