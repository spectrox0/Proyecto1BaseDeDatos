const Tripulacion = require('../models/Tripulacion');
const Avion = require('../models/avion');
const Vuelo = require ('../models/vuelo');
const TripulacionVuelo = require('../models/tripulacionVuelo');

exports.getTripulacion = async (req, res) => {
    let tripulacion = await Tripulacion.findAll( 
);
    tripulacion= tripulacion.map(val => val.dataValues);
     
    let aviones = await Avion.findAll();
    aviones = aviones.map(val => val.dataValues);
    if (!!tripulacion) {
      return res.render("tripulacion", {tripulacion,aviones});
    }
  };

  exports.createTripulacion = async (req, res) => {
   try{
    const tripulacion = await Tripulacion.build({
        Pasaporte_T: req.body.pasaporte,
        cargo: req.body.cargo,
        Nombre: req.body.nombre,
        Apellido: req.body.apellido,
    });
    await tripulacion.save();
    if (!!tripulacion) {
      return res.redirect("tripulacion");
    } else {
      res.render("mensajeError", {message:"Error no se pudo crear al tripulante",dir:"tripulacion"}); }
} catch(error) {
    return  res.render("mensajeError", {message:"Error no se pudo crear al tripulante",dir:"tripulacion"});
} }

exports.updateTripulacion = async (req, res) => {
    const Pasaporte_T = req.params.id;
   try {
    const tripulacion = await Tripulacion.update(
      { 
        cargo: req.body.cargo,
        Nombre: req.body.nombre,
        Apellido: req.body.apellido,
      },
        
      { where: {Pasaporte_T} }
    );
    
    if (!!tripulacion) {
      return res.redirect("/tripulacion");
    } else  return  res.render("mensajeError", {message:"Error no se pudo actualizar al tripulante",dir:"tripulacion"});
  } catch(error){ 
    return  res.render("mensajeError", {message:"Error no se pudo actualizar al tripulante",dir:"tripulacion"});
  }}

  exports.deleteTripulacion = async (req, res) => {
    const Pasaporte_T=req.params.id;
    const response = await Tripulacion.destroy( {
        where: {
            Pasaporte_T:Pasaporte_T
        }
    });
    if (!!response) {
        return res.redirect("/tripulacion");
      }

  };
 
  exports.getTripulacioninVuelo = async (req, res) => {
    let tripulacionVuelos = await TripulacionVuelo.findAll();
    tripulacionVuelos = tripulacionVuelos.map(val => val.dataValues);
    let vuelos = await Vuelo.findAll();
    vuelos = vuelos.map(val=> val.dataValues) ;
    let tripulantes = await Tripulacion.findAll();
    tripulantes = tripulantes.map(val=> val.dataValues);
    if(!!tripulacionVuelos)
     res.render("vueloTripulacion",{tripulacionVuelos,vuelos,tripulantes});


  }

  exports.createTripulacioninVuelo = async (req, res) => {
    try{
      const tripulacion = await TripulacionVuelo.build({
          Pasaporte_T: req.body.pasaporte,
          C_vuelo: req.body.vuelo
      });
      await tripulacion.save();
      if (!!tripulacion) {
        return res.redirect("vueloTripulacion");
      } else {
        res.render("mensajeError", {message:"Error no se pudo asignar al tripulante",dir:"vueloTripulacion"}); }
  } catch(error) {
      return  res.render("mensajeError", {message:"Error no se pudo asignar al tripulante",dir:"vueloTripulacion"});
  } } 


  exports.deleteTripulacioninVuelo = async (req, res) => {
 const Pasaporte_T=req.params.id1;
 const C_vuelo=req.params.id2;
    const response = await TripulacionVuelo.destroy( {
        where: {
            Pasaporte_T:Pasaporte_T, 
            C_vuelo: C_vuelo
        }
    });
    if (!!response) {
        return res.redirect("/vueloTripulacion");
      }

  };
