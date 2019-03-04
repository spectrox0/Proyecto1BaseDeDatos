const User = require("../models/cliente");
const Pasaje = require("../models/pasaje");
const Boleto = require("../models/boleto");
const Vuelo = require("../models/vuelo");
const asientoModelo = require ("../models/modeloAsiento"); 
const asientoVuelo = require("../models/vueloAsiento");
const Pasajero = require ("../models/pasajero") ;
const Cliente = require ("../models/cliente");
const sql = require('../config/db');
exports.createBoleto = async (req, res) => {
  
    let Boleto= await Boleto.build({
        C_boleto: 2,
        C_vuelo: 3 , 
        C_asiento: 3, 

        Cantidad_Equipaje:1, 
        Pasaporte_P: 2, 
       
  })

}

exports.sendForm = async (req, res) => {

  var vuelo  = await Vuelo.findOne ( {
    where: {
      C_vuelo: req.body.vueloSel
    }
  }) ; 
  let asientos = await asientoVuelo.findAll({
   
     where: {
       C_Vuelo: vuelo.C_vuelo
     }

  }); 
  
  asientos=asientos.map(val => val.dataValues);

  console.log(vuelo.C_avion);
  let precio;
  // Aqui el precio de un vuelo directo
  sql.query('SELECT i.precio_base FROM itinerario i, avion a WHERE a.C_avion = :avion and a.C_itinerario = i.C_itinerario',
    {replacements:{avion:vuelo.C_avion}, type: sql.QueryTypes.SELECT})
    .then(data => {
      if(data) {
        precio = data[0].precio_base;
      }
      console.log(precio);

      if (vuelo,asientos)
      return res.render("formularioCompra", {vuelo,asientos,precio});
    });
}


// No llega nada al req.body
exports.compraEscala = async (req, res) => {
  // escalas,Origen,Destino,Intermedio
  var datos = JSON.parse(req.body.vueloSel);
  let precioTotal = datos[0].avions[0].itinerarios[0].precio_base + datos[1].avions[0].itinerarios[0].precio_base;
  let asientos = await sql.query('SELECT C_asiento FROM asiento', {type: sql.QueryTypes.SELECT});
  // select sum(i.precio_base) from itinerario i, avion a where a.C_avion in (1,6) and a.C_itinerario = i.C_itinerario;
  return res.render("formularioCompra2", {asientos});
};

exports.confirmCompra = async (req,res) => {
  
  var vuelo  = await Vuelo.findOne ( {
    where: {
      C_vuelo: req.params.id
    }

  }) ; 

  vuelo = vuelo.map(val => val.dataValues);
  var cliente = await Cliente.build({
    cedula: req.body.cedulaC,
    name: req.body.nameC , 
    apellido: req.body.apellidoC,
    telefono: req.body.telefonoC ,
    email: req.body.emailC 
  }) ; 
  var pasaporte = await Pasajero.build({
    name: req.body.nameP, 
    apellido: req.body.apellidoP,
    Pasaporte_P: req.body.pasaporte,
    Genero: req.body.genero,
    nacionalidad: req.body.nacionalidadP,
    edad: req.body.edadP

  });
   
   var asiento = await Asiento.findOne ( {
    where: {
     C_asiento : req.body.tipo
    }
   })
   asiento = asiento.map(val => val.dataValues);
   console.log("jjjaksjdkasjkdjkas");
   console.log(vuelo,cliente,pasaporte,asiento);
   res.render("confirmCompra", {vuelo,cliente,pasaporte,asiento});

}

