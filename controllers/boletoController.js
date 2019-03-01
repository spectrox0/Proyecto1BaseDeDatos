const User = require("../models/cliente");
const Pasaje = require("../models/pasaje");
const Boleto = require("../models/boleto");
const Vuelo = require("../models/vuelo");
const asientoModelo = require ("../models/modeloAsiento"); 
const asientoVuelo = require("../models/vueloAsiento");
const Pasajero = require ("../models/pasajero") ;
const Cliente = require ("../models/cliente");
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
      C_vuelo: req.body.selVuelo
    }

  }) ; 

  vuelo = vuelo.map(val => val.dataValues);
  
  let asientos = await asientoVuelo.FindAll({
   
     where: {
       C_Vuelo: vuelo.C_Vuelo
     }

  }); 
  asientos=asientos.map(val => val.dataValues);
  if (vuelo,asientos)
  return res.render("formularioCompra", {vuelo,asientos});

}

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

   res.render("confirmCompra", {vuelo,cliente,pasaporte,asiento});

}

