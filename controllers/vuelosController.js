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
       Origen = await Aeropuerto.findAll( {
         where: {
           IATA: req.body.origen
         } }
       )
       Destino = await Aeropuerto.findAll( {
        where: {
          IATA: req.body.destino
        } }
      ) 
      Origen = Origen.map(val => val.dataValues);
      Destino = Destino.map(val => val.dataValues);
   
     
    
     
  
  
    if (vuelos) {
     
      return res.render("findVuelo", {vuelos,Origen,Destino} );
    }
  };


  exports.getVuelo = async (req,res) => {
   var vuelo  = Vuelo.findOne ( {
    where: {
      C_vuelo: req.body.selVuelo
    }

  })

  vuelo = vuelo.map(val => val.dataValues);

}
 
 
 
 
 