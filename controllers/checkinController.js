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

	// res.redirect(`/checkInOn/${pasaporte}/${nvuelo}`);
	res.render('checkinOn', {pasaporte, nvuelo});
};
   abordados = await Cliente.findAndCount()
exports.checkInOn_Get = (req, res) => {
	console.log(req.body);
	res.render('checkinOn');
};

exports.checkFinal = async (req, res) => {

	sql.query('UPDATE abordados SET cant_Equipaje=:cant WHERE Pasaporte_P=:pasap AND C_vuelo=:vuelo',
	{replacements:{
		cant: req.body.nroEquipaje,
		pasap:req.params.p,
		vuelo:req.params.nv
	}, type: sql.QueryTypes.UPDATE})
		.catch(error => {
			if(error) {
				console.log(error);
			}
		});

	let modelo = await sql.query('SELECT a.C_modelo FROM avion a, vuelo v WHERE v.C_vuelo=:vuelo AND v.C_avion=a.C_avion',
	{replacements:{
		vuelo:req.params.nv
	}, type: sql.QueryTypes.SELECT})
		.catch(error => {
			if(error) {
				console.log(error);
			}
		});

	sql.query('UPDATE modeloasientos SET Cantidad=Cantidad-1 WHERE C_modelo=:modelo AND C_asiento=1 AND Cantidad > 0',
	{replacements: {
		modelo: modelo[0].C_modelo
	}, type: sql.QueryTypes.UPDATE});
	res.send("hola");
};

// update modeloasientos 
// set Cantidad=Cantidad-1
// where C_modelo=1 AND C_asiento=2 AND Cantidad > 19;

// select a.C_modelo 
// from avion a, vuelo v
// where v.C_vuelo=1 and v.C_avion=a.C_avion;