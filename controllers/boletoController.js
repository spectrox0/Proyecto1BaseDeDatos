
const Pasaje = require("../models/pasaje");
const Boleto = require("../models/boleto");
const Vuelo = require("../models/vuelo");
const asientoModelo = require ("../models/modeloAsiento"); 
const asientoVuelo = require("../models/vueloAsiento");
const Pasajero = require ("../models/pasajero") ;
const Cliente = require ("../models/cliente");
const sql = require('../config/db');


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

  let precio;
  // Aqui el precio de un vuelo directo
  sql.query('SELECT i.precio_base FROM itinerario i, avion a WHERE a.C_avion = :avion and a.C_itinerario = i.C_itinerario',
    {replacements:{avion:vuelo.C_avion}, type: sql.QueryTypes.SELECT})
    .then(data => {
      if(data) {
        precio = data[0].precio_base;
      }

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
    console.log(req.params.id);
  let cliente = await Cliente.findOne( { 
     where: { 
       cedula:req.body.cedula
     }
  }) ; 
  if (cliente==null) {
  let cl = await sql.query('INSERT INTO cliente (Nombre, Apellido, email, telefono, cedula) values (:nombre, :apellido, :email, :telf, :cedula)',
  {replacements: {
    nombre: req.body.nameC,
    apellido: req.body.apellidoC,
    email:req.body.emailC,
    telf:req.body.telefonoC,
    cedula: req.body.cedula
  }, type: sql.QueryTypes.INSERT}); }  
  
  else if (cliente.Nombre!=req.body.nameC || cliente.Apellido!=req.body.apellidoC
    || cliente.email!=req.body.emailC || cliente.telefono!= req.body.telefonoC ){
     
     let message = "Error los datos del cliente comprador no concuerdan con lo guardado";
     let dir = "index" ;
     return res.render('mensajeError', { dir,message});
       
    }

  let pasajero = await Pasajero.findOne({ 
 where: { 
   Pasaporte_P: req.body.pasaporte
 }
  })
   if (pasajero==null)
   { 
    let ps = await sql.query('INSERT INTO pasajero (Nombre, Apellido, Pasaporte_P, Genero, edad, nacionalidad) values (:nombre, :apellido, :pasap, :gen, :edad, :nacionalidad)',
    {replacements: {
      nombre: req.body.nameP,
      apellido: req.body.apellidoP,
      pasap:req.body.pasaporte,
      gen:req.body.genero,
      edad: req.body.edadP,
      nacionalidad: req.body.nacionalidadP
    }, type: sql.QueryTypes.INSERT});
  
   } else if (pasajero.Nombre!=req.body.nameP || pasajero.Apellido!=req.body.apellidoP
               || pasajero.Genero!=req.body.genero || pasajero.edad!= req.body.edadP
               || pasajero.nacionalidad!= req.body.nacionalidadP  ){
                
                let message = "Error los datos del pasajero no concuerdan con lo guardado";
                let dir = "index" ;
                return res.render('mensajeError', { dir,message});
                  
               }
  
  
  if (req.params.id.length > 8) {
    let vuelos = await JSON.parse(req.params.id);
   
   let boleto1 = await Boleto.findOne(
     {
       where: {
        C_vuelo: vuelos[0].C_vuelo,
        Pasaporte_P : req.body.pasaporte,


       }
     }
   ) ; 
   
   let boleto2 = await Boleto.findOne(
    {
      where: {
       C_vuelo: vuelos[1].C_vuelo,
       Pasaporte_P : req.body.pasaporte,


      }
    }
  )
    if(boleto1!=null || boleto2!=null) {
      let message = "Error el pasajero ya dispone de algun boleto para el destino vuelo indicado";
      let dir = "index" ;
      return res.render('mensajeError', { dir,message});

    }
 
    let bol = await sql.query('INSERT INTO boleto (C_vuelo, C_asiento, Pasaporte_P, Activo) values (:vuelo, :asiento, :pasap, false), (:vuelo2, :asiento2, :pasap, false)',
    {replacements: {
      vuelo: vuelos[0].C_vuelo,
      asiento: req.body.tipo1,
      pasap:req.body.pasaporte,
      vuelo2: vuelos[1].C_vuelo,
      asiento2: req.body.tipo2,
    }, type: sql.QueryTypes.INSERT});  

    const nombre = req.body.nameC;
    const apellido = req.body.apellidoC;
    let asientos = [req.body.tipo1,req.body.tipo2]   
      
    let asienAux1 = await asientoVuelo.findOne( {
      where: {
      C_vuelo: vuelos[0].C_vuelo,
       C_asiento: req.body.tipo1,
      }
     }) ;
   
      var actual=  asienAux1.Cant_vendidos+1;

     let asientoVuelox1 = await asientoVuelo.update({
       Cant_vendidos: actual } ,{
       where: {
         C_vuelo: vuelos[0].C_vuelo,
         C_asiento: req.body.tipo1,
       } }
     ) ;

     let asienAux2 = await asientoVuelo.findOne( {
      where: {
      C_vuelo: vuelos[1].C_vuelo,
      C_asiento: req.body.tipo2,
      }
     }) ;
    
     let asientoVuelox2 = await asientoVuelo.update({
       Cant_vendidos: asienAux2.Cant_vendidos+1 }, {
       where: {
         C_vuelo: vuelos[1].C_vuelo,
         C_asiento: req.body.tipo2,
       } }
     ) ;

     var today = await new Date();
     var dd = await today.getDate();
     var mm = await today.getMonth() + 1; 
     
     var yyyy = await today.getFullYear();
     if (dd < 10) {
       dd = '0' + dd;
     } 
     if (mm < 10) {
       mm = '0' + mm;
     } 
     var today = yyyy + '-' + mm + '-' + dd;

     let pasaje = await Pasaje.build({
      Precio_total: req.params.precio,
      fechaCompra: today,
      C_cliente: req.body.cedula,
  
      }) ; 
      await pasaje.save();
      
       console.log("dsdsdas");
    return res.render("confirmCompra", {vuelos,asientos,nombre,apellido});
   
  } else {
   
    let boleto = await Boleto.findOne(
      {
        where: {
         C_vuelo: req.params.id,
         Pasaporte_P : req.body.pasaporte,
 
        }
      }
    ) ; 
    if(boleto!=null) {
      let message = "Error el pasajero ya dispone de algun boleto para el destino vuelo indicado";
      let dir = "index" ;
      return res.render('mensajeError', { dir,message});

    }
    let bol = await sql.query('INSERT INTO boleto (C_vuelo, C_asiento, Pasaporte_P, Activo) values (:vuelo, :asiento, :pasap, false)',
    {replacements: {
      vuelo: req.params.id,
      asiento: req.body.tipo,
      pasap:req.body.pasaporte
    }, type: sql.QueryTypes.INSERT});
   
    
    let asienAux = await asientoVuelo.findOne( {
     where: {
     C_vuelo: req.params.id,
      C_asiento: req.body.tipo
    }
    }) ;
     
    let asientoVuelox = await asientoVuelo.update({ 
      Cant_vendidos: parseInt(asienAux.Cant_vendidos)+1 } ,
       {where: {
        C_vuelo: req.params.id,
        C_asiento: req.body.tipo
      }
    }) ;
    
    let pasaje = await Pasaje.build({
    Precio_total: req.params.precio,
    fechaCompra: Date.now(),
    C_cliente: req.body.cedula,

    }) ; 
    await pasaje.save();
       
    const nombre = req.body.nameC;
    const apellido = req.body.apellidoC;
    let asientos = [req.body.tipo];
    let vuelos = req.params.id;
    
    return res.render("confirmCompra", {vuelos,asientos,nombre,apellido});
  }

  // //insert into boleto (C_vuelo,C_asiento,Pasaporte_P,Activo) values (1,1,1111111,false)

  // // let vuelo = undefined;
  // // let cliente = undefined;
  // // let pasaporte = undefined;
  // // let asiento = undefined;

  // // res.render("confirmCompra", {vuelo,cliente,pasaporte,asiento});

  res.send("hola");

  };
   
   

