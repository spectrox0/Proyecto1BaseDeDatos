const Vuelo = require('../models/vuelo');
const Itinerario = require('../models/itinerario');
const Aeropuerto = require('../models/aeropuerto')
const Avion = require("../models/avion") ;
const modeloAsiento = require("../models/modeloAsiento");
const VueloDesviado = require("../models/vuelo")
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
     Fecha_salida: req.body.fecha
   }
    } );

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
  let Vuelo = await Vuelo.findAll( {
  }
)
  Vuelo= Vuelo.map(val => val.dataValues);
  let Vuelodesviado = await VueloDesviado.findAll();
  Vuelodesviado = Vuelodesviado.map(val => val.dataValues);

  if (Vuelo,Vuelodesviado) {
    return res.render("vuelos", {Vuelo,Vuelodesviado});
  }
};

exports.createVuelo = async (req, res) => {
 try{
  const Vuelo = await Vuelo.build({
      C_vuelo: req.body.pasaporte,
      cargo: req.body.cargo,
      Nombre: req.body.nombre,
      Apellido: req.body.apellido,
  });
  await Vuelo.save();
  if (!!Vuelo) {
    return res.redirect("Vuelo");
  } else {
      return req.flash({ 'error': 'No se creo' }); }
} catch(callback) {
  return  req.flash({ 'error': 'No se creo' });
} }
 

exports.updateVuelo = async (req, res) => {
  const C_vuelo = req.params.id;
 
  const Vuelo = await Vuelo.update(
    { 
      c_avion: req.body.idAvion,
      Fecha_salida: req.body.nombre,
      Hora_salida: req.body.hora_salida,
      Hora_llegada:  req.body.hora_llegada,
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
  const response = await Vuelo.update({
      Activo: false
  }, {
      where: {
          C_vuelo
      }
  });
  if (!!response) {
      return res.redirect("/Vuelo");
    }

};

 
 
 
 
 
 