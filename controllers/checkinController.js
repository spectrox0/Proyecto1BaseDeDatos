const User = require("../models/cliente");
const Pasaje = require("../models/pasaje");
const Boleto = require("../models/boleto");
const Vuelo = require("../models/vuelo");
const Avion = require("../models/avion");
const asientoModelo = require ("../models/modeloAsiento"); 
const asientoVuelo = require("../models/vueloAsiento");
const Pasajero = require ("../models/pasajero") ;
const Itinerario = require("../models/itinerario");
const Aeropuerto = require ("../models/aeropuerto");
const Cliente = require ("../models/cliente");
const Abordados = require("../models/abordados");
const sql = require('../config/db');
const Modelo= require('../models/modelo');
Avion.belongsTo (Vuelo, {foreignKey: 'C_avion' ,targetKey: "C_avion"});
Modelo.belongsTo (Avion, {foreignKey: 'C_modelo' ,targetKey: "C_modelo"});
Itinerario.belongsTo(Avion, {foreignKey: "C_itinerario",targetKey: "C_itinerario"});
exports.checkInOn = async (req, res) => {
    console.log(req.body);
    let boleto = await Boleto.findOne( {
	where: {
	 C_vuelo: req.body.NroVuelo,
	 Pasaporte_P: req.body.Pasaporte

	}

	}
	);
	 if (boleto==null) {
		const message= "No existe ningun boleto que cumplas las especificaciones dadas"; 
		const dir = "check_in";
      return res.render('mensajeError',{message,dir});

	 }
	 else {
	const C_asientox = boleto.C_asiento;

	let vuelo = await Vuelo.findOne({ where:{C_vuelo: req.body.NroVuelo}});
	 let itinerario = await Itinerario.findOne ( {
		
		 include: [{
			required:true,
		model: Avion ,
		include: [ {
		model: Vuelo ,
		
		where: { 
			C_vuelo: req.body.NroVuelo
		}

		}]
		 }]
	 }) ; 

	 let Origen, Destino ; 

       Origen = await Aeropuerto.findOne( {
         where: {
           IATA: itinerario.IATA_origen
         } }
       );
       Destino = await Aeropuerto.findOne( {
        where: {
          IATA: itinerario.IATA_destino
        } }
	  ) ;
	   
	let pasaporte = req.body.Pasaporte;  
	 console.log(Destino.Ciudad); 
	 console.log(Origen.Ciudad)
	return res.render('checkinOn', {pasaporte, vuelo, Origen, Destino, C_asientox});
	} } 

   /*
  	sql.query('INSERT INTO abordados VALUES (:pasap,:vuelo,0,nroAsiento)',
	{replacements: {
		pasap: req.body.Pasaporte,
		vuelo: req.body.NroVuelo,
		nroAsiento: C_asientox
	}, type: sql.QueryTypes.INSERT})
		.catch(error => {
			if(error) {
				console.log(error);
			}
		}); 
	
	}

 /*
	let pasaporte = req.body.Pasaporte;
	let nvuelo = req.body.NroVuelo;

	abordados = await Abordados.findAndCount();
	let modelo = await Modelo.findOne(
    {
     include: [ {
	  model: Avion,
	  required:true,
	  include: [ {
	  model: Vuelo,
	  where: {
		C_vuelo: nvuelo
	    }
	  }]
	 }
	 ]	
	}
	); 
	
	modeloAsientos = await modeloAsientos.findOne({
    where: { 
	C_asiento: C_asientox,
	C_modelo: modelo.C_modelo 

	}

	}) ;

	if(abordados>=modeloAsientos.cantidad) {
     const vueloAsientos = asientoVuelo.update({
	   Disponibilidad: 0 ,
	   where: { 
		C_asiento: C_asientox,
		C_vuelo: nvuelo
	   }


	 })

	}

	
	// res.redirect(`/checkInOn/${pasaporte}/${nvuelo}`);
	res.render('checkinOn', {pasaporte, nvuelo}); */

  


exports.checkFinal = async (req, res) => {

	console.log(req.body) ; 
	console.log(req.params);

	let abordados = await sql.query('INSERT INTO abordados VALUES (:pasap,:vuelo,:cant,:nroAsiento)',
	{replacements: {
		nroAsiento: req.params.ca,
		cant: req.body.nroEquipaje,
		pasap:req.params.p,
		vuelo:req.params.nv
	}, type: sql.QueryTypes.INSERT})
		.catch(error => {
			if(error) {
				console.log(error);
			}
		}); 
	

    let C_asientox = req.params.ca;
	let pasaporte = req.params.p;
	let nvuelo = req.params.nv;
	console.log(pasaporte);

	abordados1 = await Abordados.findAndCountAll( {
		required:true,
		 where: {
		  C_vuelo: nvuelo,
		  nro_Asiento: C_asientox,
		 }

	});

	let modelo = await Modelo.findOne(
    {
     include: [ {
	  required:true,
	  model: Avion,
	  include: [ {
	  model: Vuelo,
	  where: {
		C_vuelo: nvuelo
	    }
	  }]
	 }
	 ]	
	}
	); 
	console.log(modelo.C_modelo);
	
	let modeloAsientos = await asientoModelo.findOne({
    where: { 
	C_asiento: C_asientox,
	C_modelo: modelo.C_modelo 

	}

	}) ;

	if(abordados1.count>=modeloAsientos.Cantidad) {
     const vueloAsientos = asientoVuelo.update({
	   Disponibilidad: 0 ,
	   where: { 
		C_asiento: C_asientox,
		C_vuelo: nvuelo
	   }


	 }); } 
	 let pasajero = await Pasajero.findOne ({ 
		 where: {
			 Pasaporte_P:pasaporte
		 }
	 })
	
	 return res.render("checkinsucces", {message:`Ha confirmado su vuelo ${pasajero.Nombre} ${pasajero.Apellido}`});	
	};

	/*sql.query('UPDATE abordados SET cant_Equipaje=:cant WHERE Pasaporte_P=:pasap AND C_vuelo=:vuelo',
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
	res.send("hola"); */

