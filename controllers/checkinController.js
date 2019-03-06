const User = require("../models/cliente");
const Pasaje = require("../models/pasaje");
const Boleto = require("../models/boleto");
const Vuelo = require("../models/vuelo");
const asientoModelo = require ("../models/modeloAsiento"); 
const asientoVuelo = require("../models/vueloAsiento");
const Pasajero = require ("../models/pasajero") ;
const Cliente = require ("../models/cliente");
const sql = require('../config/db');

exports.checkInOn = async (req, res) => {
	console.log(req.body);
	sql.query('INSERT INTO abordados VALUES (:pasap,:vuelo,0,1)',
	{replacements: {
		pasap: req.body.Pasaporte,
		vuelo: req.body.NroVuelo
	}, type: sql.QueryTypes.INSERT})
		.catch(error => {
			if(error) {
				console.log(error);
			}
		});

	let pasaporte = req.body.Pasaporte;
	let nvuelo = req.body.NroVuelo;

	// return res.redirect(`/checkInOn/${pasaporte}/${nvuelo}`);
	return res.render('checkinOn',{pasaporte , nvuelo } );
};
exports.checkInOn_Get = async (req, res) => {
	return await res.render('checkinOn');
};