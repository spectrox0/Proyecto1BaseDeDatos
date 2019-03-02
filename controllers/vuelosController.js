const Vuelo = require('../models/vuelo');
const Itinerario = require('../models/itinerario');
const Aeropuerto = require('../models/aeropuerto')
const Avion = require("../models/avion") ;
const modeloAsiento = require("../models/modeloAsiento");
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


  exports.getVuelo = async (req,res) => {
   var vuelo  = Vuelo.findAll ( {
    where: {
      C_vuelo: req.body.selVuelo
    }

  })

  vuelo = vuelo.map(val => val.dataValues);

}
 
 
 
 
 