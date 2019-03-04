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
  // let asientos = await sql.query('SELECT C_asiento FROM asiento', {type: sql.QueryTypes.SELECT});
  
  let asientos1 = await asientoVuelo.findAll({
    where: {
      C_Vuelo: datos[0].C_vuelo
    }

 }); 
 let asientos2 = await asientoVuelo.findAll({
  where: {
    C_Vuelo: datos[1].C_vuelo
  }

}); 

  // select sum(i.precio_base) from itinerario i, avion a where a.C_avion in (1,6) and a.C_itinerario = i.C_itinerario;
  return res.render("formularioCompra2", {asientos1,asientos2,datos,precioTotal});
};

exports.confirmCompra = async (req,res) => {

  console.log(req.body);
  console.log(req.params);
  let cl = await sql.query('INSERT INTO cliente (Nombre, Apellido, email, telefono, cedula) values (:nombre, :apellido, :email, :telf, :cedula)',
  {replacements: {
    nombre: req.body.nameC,
    apellido: req.body.apellidoC,
    email:req.body.emailC,
    telf:req.body.telefonoC,
    cedula: req.body.cedula
  }, type: sql.QueryTypes.INSERT});
  
  let ps = await sql.query('INSERT INTO pasajero (Nombre, Apellido, Pasaporte_P, Genero, edad, nacionalidad) values (:nombre, :apellido, :pasap, :gen, :edad, :nacionalidad)',
  {replacements: {
    nombre: req.body.nameP,
    apellido: req.body.apellidoP,
    pasap:req.body.pasaporte,
    gen:req.body.genero,
    edad: req.body.edadP,
    nacionalidad: req.body.nacionalidadP
  }, type: sql.QueryTypes.INSERT});


  sql.query('INSERT INTO boleto (C_vuelo, C_asiento, Pasaporte_P, Activo) values (:vuelo, :asiento, :pasap, false)',
  {replacements: {
    vuelo: req.params.id,
    asiento: req.body.tipo,
    pasap:req.body.pasaporte
  }, type: sql.QueryTypes.INSERT});

  //insert into boleto (C_vuelo,C_asiento,Pasaporte_P,Activo) values (1,1,1111111,false)

  // let vuelo = undefined;
  // let cliente = undefined;
  // let pasaporte = undefined;
  // let asiento = undefined;

  // res.render("confirmCompra", {vuelo,cliente,pasaporte,asiento});

  res.send("hola");

  };
   
   

