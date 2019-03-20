const Vuelo = require('../models/vuelo');
const Itinerario = require('../models/itinerario');
const Aeropuerto = require('../models/aeropuerto')
const Avion = require("../models/avion") ;
const modeloAsiento = require("../models/modeloAsiento");
const VueloDesviado = require("../models/vueloDesviado")
const asientoVuelo = require("../models/vueloAsiento");
const Modelo = require("../models/modelo");
const Asiento = require('../models/asiento');
const estadoAvion = require("../models/estadoAvion");
const Boleto = require("../models/boleto");
const Abordados = require("../models/abordados");
const Estado = require('../models/estadoAvion');
const Pasaje = require("../models/pasaje");
const sequelize = require('sequelize');
const Op = sequelize.Op;
Vuelo.hasMany(Avion ,  {foreignKey: 'C_avion', sourceKey: "C_avion"});
Avion.belongsTo (Vuelo, {foreignKey: 'C_avion' ,targetKey: "C_avion"});

Avion.hasMany(Itinerario ,  {foreignKey: 'C_itinerario', sourceKey:'C_itinerario'}); 
Itinerario.belongsTo(Avion, {foreignKey: 'C_itinerario' ,targetKey:'C_itinerario'}) ;

Avion.hasMany(Modelo ,  {foreignKey: 'C_modelo', sourceKey:'C_modelo'}); 
Modelo.belongsTo(Avion, {foreignKey: 'C_modelo' ,targetKey:'C_modelo'}) ;

Itinerario.hasMany(Aeropuerto, {foreignKey: 'IATA', sourceKey:'IATA_destino'});
Avion.hasMany(Estado ,  {foreignKey: 'C_estado', sourceKey:'C_estado'}); 

Estado.belongsTo(Avion, {foreignKey: 'C_estado' ,targetKey:'C_estado'}) ;

exports.getVuelos = async (req, res) => {
    let C_vuelo= req.body.busquedad;

    let vuelosAsientos = await asientoVuelo.findAll({
     where: {
         C_vuelo: C_vuelo
     }

    });

    let vuelo = await Vuelo.findOne({include:[{model:Avion, required:true, include:[{model:Modelo,required:true}]}] , where:{C_vuelo:C_vuelo}});
    var  C_modelo = await vuelo.avions[0].modelos[0].C_modelo;
    let mAsiento = await modeloAsiento.findAll({ where:{C_modelo:C_modelo}});
    
    vuelosAsientos = await vuelosAsientos.map( val => val.dataValues);
    mAsiento = await mAsiento.map(val => val.dataValues) ;

    let Asientos = await Asiento.findAll();
    Asientos = Asientos.map(val => val.dataValues);
     
    let nroAsientos = await Asiento.count();
    
    let abordados = [];
    
    for(var i = 1 ; i<=nroAsientos ; i++) {
     
        let abordado1 = await Abordados.count({
            where: {
                C_vuelo:C_vuelo,
                nro_Asiento: i
            }
            
        }) ;
        await abordados.push(abordado1);

    }

     res.render("statistics", {abordados,Asientos,vuelosAsientos,mAsiento})





}

exports.getAllVuelosDestinos = async(req,res) => {
   try{ 
    let aeropuertos = await Aeropuerto.findAndCountAll();
    var cantAeropuertos = aeropuertos.count; 
    aeropuertos= await aeropuertos.rows.map(val => val.dataValues);
      Vuelos = [] ; 
    for(var i = 0 ; i < cantAeropuertos ; i++) {
      let vuelo = await Vuelo.findAndCountAll( { 
       include: [{
           model:Avion, 
           required:true, 
           include: [ {
           model: Itinerario,
           required:true, 
           include: [{
            model: Aeropuerto, 
            required:true
           }],
        where: { 
            IATA_destino : aeropuertos[i].IATA,
        }

           }]
       }]

      })
     await Vuelos.push(vuelo);
    
    }
    nroVuelos = await Vuelo.count();
    return res.render("estadisticaVisitas", {Vuelos,aeropuertos,nroVuelos});
   
} catch (error) {

        return res.render("mensajeError",{message:"Error no se pudo recuperar las estadisticas", dir:"searchStatistics"});
    }

}

exports.getAllAvionesEstados = async (req, res) => {
  try { 
    let estados = await Estado.findAndCountAll();
    var nroEstados = estados.count ; 
    estados = await estados.rows.map(val => val.dataValues);
    
     aviones = []; 
    for( var i = 0 ; i<nroEstados ; i++) {

     let avion = await Avion.count({
         where:{ C_estado: estados[i].C_estado}
     }

     ) ;
     await aviones.push(avion) ;


    }
    let nroAvion = await Avion.count();
     return res.render("estadisticasEstadosAviones", {estados, aviones,nroAvion})


  } catch(error) { 
   return res.render("mensajeError", {message:"No se pudieron recuperar los aviones", dir:"searchStatistic"});
  }


}

exports.getAllAvionesVuelo = async (req, res) => {
try {
 let aviones_ = await Avion.findAndCountAll(); 
  const Nroaviones = aviones_.count; 
   aviones_ = await aviones_.rows.map(val => val.dataValues) ; 
   
   vuelos = []; 

   for(var i = 0 ; i< Nroaviones ; i++) {
     let vuelo = await Vuelo.count({
         where: {C_avion:aviones_[i].C_avion}});
         await vuelos.push(vuelo);
   }
   nroVuelos = await Vuelo.count() ; 
   return res.render("estadisticaUsoAvion", {vuelos, aviones_,nroVuelos});
 }catch(error) {
    return res.render("mensajeError", {message:"No se pudieron recuperar los aviones", dir:"searchStatistic"});

   }
}

exports.getAllGanancias = async (req, res) => { 
 try {
     var fechaInicial = req.body.fecha1; 
     var fechaFinal = req.body.fecha2; 
      if(fechaInicial>fechaFinal) { 
       return res.render("mensajeError", {message:"La fecha inicial debe ser igual o posterior a la final", dir:"searchStatistic"});
   
      }
     
     let pasajes = await Pasaje.findAndCountAll({
         where:{ 
        fechaCompra: {
            [Op.between] : [fechaInicial, fechaFinal] 
        }
         }
     }) ; 
      const nroPasajes= pasajes.count; 
       var gananciaTotal = 0 ; 
       pasajes = pasajes.rows.map (val => val.dataValues) ; 

      for(var i = 0 ; i<nroPasajes ; i++) { 
       gananciaTotal = gananciaTotal +pasajes[i].Precio_total ;
      } ; 
      
      return res.render("estadisticaGanancias", {gananciaTotal,pasajes})

   
    }catch(error) {
       return res.render("mensajeError", {message:"No se pudieron recuperar las ganancias", dir:"searchStatistic"});
   
      }


}

exports.getAllSobreventas = async (req,res) => {
    try {
        Vuelos = await Vuelo.findAll();
        Vuelos = Vuelos.map( val=> val.dataValues);
        const asientos = await Asiento.findAll();
    
        var sobreventas = [];

        for(var i = 0 ; i<Vuelos.length ;i ++) {
            response = await asientoVuelo.findAll({
                where:{
                    Disponibles:0,
                    C_vuelo: Vuelos[i].C_vuelo
                }

            }) ; 
            response = await response.map(val => val.dataValues);
            if(response[0]!=null) {
                var sobreventa = {
                    C_vuelo: 0,
                    Cantidad: 0,
                    abordados: 0 , 
                   };
            const nroAbordados = await Abordados.count({
                 where:{
                     C_vuelo: Vuelos[i].C_vuelo
                 }
             });
            var cantidadSobreventa = 0;
            var cantAbordados = 0;
            for(var j = 0 ; j<asientos.length ; j++ ) {
               let Abordadox = await Abordados.count({
                 where:{
                    C_vuelo: Vuelos[i].C_vuelo,
                    nro_Asiento: asientos[j].C_asiento
                 }

               });
               let asientoVuelox = await asientoVuelo.findOne({
                   where:{
                    C_vuelo: Vuelos[i].C_vuelo,
                    C_asiento: asientos[j].C_asiento
                   }
              
                 }); 
                 if(Abordadox<asientoVuelox.Cant_vendidos) {
                    cantidadSobreventa = cantidadSobreventa + (Abordadox - asientoVuelox.Cant_vendidos);
                    cantAbordados = cantAbordados + Abordadox;
                 }
               } 
             sobreventa.C_vuelo = Vuelo[i].C_vuelo; 
             sobreventa.Cantidad =   cantidadSobreventa;
             sobreventa.abordados = cantAbordados;
             await sobreventas.push(sobreventa) ; 
        }
            } 
            return res.render("estadisticaSobreventa", {sobreventas});
        } catch(error) {
           return res.render("mensajeError", {message:"No se pudieron recuperar los vuelos con sobreventa", dir:"searchStatistic"});
       
          }


}