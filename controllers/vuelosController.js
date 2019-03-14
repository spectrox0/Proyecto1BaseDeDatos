const Vuelo = require('../models/vuelo');
const Itinerario = require('../models/itinerario');
const Aeropuerto = require('../models/aeropuerto')
const Avion = require("../models/avion") ;
const modeloAsiento = require("../models/modeloAsiento");
const VueloDesviado = require("../models/vueloDesviado");
const asientoVuelo = require("../models/vueloAsiento");
const sequelize = require('sequelize');
const Op = sequelize.Op;
Vuelo.hasMany(Avion ,  {foreignKey: 'C_avion', sourceKey: "C_avion"});
Avion.belongsTo (Vuelo, {foreignKey: 'C_avion' ,targetKey: "C_avion"});

Avion.hasMany(Itinerario ,  {foreignKey: 'C_itinerario', sourceKey:'C_itinerario'}); 
Itinerario.belongsTo(Avion, {foreignKey: 'C_itinerario' ,targetKey:'C_itinerario'}) ;


exports.getVuelos = async (req, res) => {

   if (req.body.destino===req.body.origen) { 
     return res.render('index'); 
   }

    const itinerario = await Itinerario.findOne({
      where: {
        IATA_origen: req.body.origen,
        IATA_destino: req.body.destino
       },
    }); 
          
     if(itinerario==null) {
      let vuelos = await Vuelo.findAll({
  
        include:[{
        model: Avion,
        required:true,
        include: [{
          model:Itinerario,
           where: {
            IATA_origen: req.body.origen,
           }, } ] 
  }] ,
   where : { 
     Activo:1, 
     Fecha_salida: req.body.fecha
   }
   
});

    var escalas= []; 
    var Intermedio = [] ;
    vuelos = vuelos.map(val => val.dataValues);

      for (var i = 0 ; i<vuelos.length ; i++) { 
   
      var hora = vuelos[i].hora_llegada ; 
      var newOrigen = await Itinerario.findOne( {
         include:[ {
           model:Avion,
           required:true, 
           where: {
           C_avion : vuelos[i].C_avion
           }, 
         }]

      }) ;   

      var vuelo2 = await Vuelo.findOne({
        include:[{
        model: Avion,
        required:true,
        include: [{
          model:Itinerario,
           where: {
            IATA_origen: newOrigen.IATA_destino,
            IATA_destino: req.body.destino
           }, } ] 
  }] ,
   where : { 
     Activo:1, 
     Fecha_salida: req.body.fecha,
     Hora_salida:{ 
      [Op.gte] : hora
   }
    } }
    )
     ;

  if(vuelo2!=null) {
    const vuelox =[] ;
    
     await vuelox.push(vuelos[i]);
     await vuelox.push(vuelo2) ;
     await escalas.push(vuelox);

     let intermedio
     intermedio = await Aeropuerto.findOne( {
       where: {
         IATA: newOrigen.IATA_destino
       } }
     )
      
     Intermedio.push(intermedio);

  }
     };

     let Origen, Destino ; 
     Origen = await Aeropuerto.findOne( {
       where: {
         IATA: req.body.origen
       } }
     )
     Destino = await Aeropuerto.findOne( {
      where: {
        IATA: req.body.destino
      } }
    ) 
    
      return res.render('findVueloEscalas', {escalas,Origen,Destino,Intermedio});
    
    }
     
     
     
     
     
     else {
    let vuelos = await Vuelo.findAll({
  
        include:[{
        model: Avion,
        required:true,
        include: [{
          model:Itinerario,
           where: {
            IATA_origen: req.body.origen,
            IATA_destino: req.body.destino
           }, } ] 
  }] ,
   where : { 
     Activo:1, 
     Fecha_salida: req.body.fecha
   }
   

        
 
    
  
     
});

    vuelos = vuelos.map(val => val.dataValues);
  
    let Origen, Destino ; 
       Origen = await Aeropuerto.findOne( {
         where: {
           IATA: req.body.origen
         } }
       )
       Destino = await Aeropuerto.findOne( {
        where: {
          IATA: req.body.destino
        } }
      ) 
      
     
    
     
  
  
    if (vuelos) {
     
      return res.render("findVuelo", {vuelos,Origen,Destino} );
    } }
  };


 

exports.getAllVuelos = async (req, res) => {

  let vuelos = await Vuelo.findAll();

  vuelos= vuelos.map(val => val.dataValues);

  let Vuelodesviado = await VueloDesviado.findAll();
  let aeropuertos = await Aeropuerto.findAll();
  let aviones = await Avion.findAll();

  Vuelodesviado = Vuelodesviado.map(val => val.dataValues);
  aeropuertos = aeropuertos.map(val => val.dataValues);
  aviones = aviones.map( val => val.dataValues);


  if (vuelos,Vuelodesviado) {
    return res.render("vuelos", {vuelos,Vuelodesviado,aeropuertos,aviones});
  }
};

exports.createVuelo = async (req, res) => {
 try{
  const vuelo = await Vuelo.build({
      C_avion: req.body.C_avion,
      Fecha_salida: req.body.fecha,
      Hora_salida:req.body.horaS , 
      hora_llegada: req.body.horaL 
  });
  await vuelo.save();

  let Asientos1 = await asientoVuelo.build({
   C_vuelo: vuelo.C_vuelo,
   C_asiento:1,
   Disponibles:1,
   Cant_vendidos:0
  });
  let Asientos2 = await asientoVuelo.build({
    C_vuelo: vuelo.C_vuelo,
    C_asiento:2,
    Disponibles:1,
    Cant_vendidos:0
   });
   let Asientos3 = await asientoVuelo.build({
    C_vuelo: vuelo.C_vuelo,
    C_asiento:3,
    Disponibles:1,
    Cant_vendidos:0
   });
   let Asientos4 = await asientoVuelo.build({
    C_vuelo: vuelo.C_vuelo,
    C_asiento:4,
    Disponibles:1,
    Cant_vendidos:0
   });
   await Asientos1.save();
   await Asientos2.save();
   await Asientos3.save();
   await Asientos4.save();

  if (!!vuelo) {
    return res.redirect("vuelos");
  } else {
      return req.flash({ 'error': 'No se creo' }); }
} catch(callback) {
  return  req.flash({ 'error': 'No se creo' });
} }

exports.createVuelodesviado = async (req, res) => {
  try{
   
   const vuelosDesviado = await VueloDesviado.build({
       C_vuelo: req.body.idVuelotoDesviado,
       nuevoDestino: req.body.nuevoDestino,
   });
   await vuelosDesviado.save();
   if (!!vuelosDesviado) {
     return res.redirect("/vuelos");
   } else {
       return res.render("mensajeError",{message:"El desvio del vuelo no se pudo crear", dir:"vuelos"}) ;}
 } catch(error) {
   return  res.render("mensajeError",{message:"El desvio del vuelo no se pudo crear", dir:"vuelos"}) ;
 } }

 exports.updateVuelodesviado = async (req, res) => {
  const C_vuelo = req.params.id;
 
  const vueloDesviado = await VueloDesviado.update(
    { 
       nuevoDestino: req.body.nuevoDestino,
    }, { where: {C_vuelo} }
    );
    if (!!vueloDesviado) {
      return res.redirect("/vuelos");
    }
  
  }

exports.updateVuelo = async (req, res) => {
  const C_vuelo = req.params.id;
 
  const Vuelo = await Vuelo.update(
    { 
      C_avion: req.body.C_avion,
      Fecha_salida: req.body.fecha,
      Hora_salida:req.body.horaS, 
      hora_llegada: req.body.horaL
    },
      
    { where: {C_vuelo} }
  );
  // await aviones.save();
  if (!!Vuelo) {
    return res.redirect("/vuelos");
  }
};

exports.deleteVuelo = async (req, res) => {
  const C_vuelo=req.params.id;
  try{
  const response1 = await asientoVuelo.destroy( {
    where: {
      C_vuelo:C_vuelo
  }
  });
  const response = await Vuelo.destroy({
      where: {
          C_vuelo:C_vuelo
      }
  });
  if (!!response) {
      return res.redirect("/vuelos");
    }
  else {
    return res.render("mensajeError",{message:"El desvio del vuelo no se pudo crear", dir:"vuelos"}) ;
  }}catch(error) {
      return res.render("mensajeError",{message:"El desvio del vuelo no se pudo crear", dir:"vuelos"}) ;
    }

};

exports.deleteVuelodesviado = async (req, res) => {
  const C_vuelo=req.params.id;

  const response = await VueloDesviado.destroy( {
      where: {
          C_vuelo: C_vuelo
      }
  });
  if (!!response) {
      return res.redirect("/vuelos");
    }

};

 
 
 
 
 
 