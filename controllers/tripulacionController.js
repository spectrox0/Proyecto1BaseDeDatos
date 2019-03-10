const Tripulacion = require('../models/Tripulacion');

exports.getTripulacion = async (req, res) => {
    let tripulacion = await Tripulacion.findAll( {
    }
)
    tripulacion= tripulacion.map(val => val.dataValues);
     
    let aviones = await aviones.findAll();
    aviones = aviones.map(val => val.dataValues);
    if (tripulacion) {
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
        return req.flash({ 'error': 'No se creo' }); }
} catch(callback) {
    return  req.flash({ 'error': 'No se creo' });
 } }
   

exports.updateTripulacion = async (req, res) => {
    const Pasaporte_T = req.params.id;
   
    const tripulacion = await Tripulacion.update(
      { 
        Pasaporte_T: req.body.pasaporte,
        cargo: req.body.cargo,
        Nombre: req.body.nombre,
        Apellido: req.body.apellido,
      },
        
      { where: {Pasaporte_T} }
    );
    // await aviones.save();
    if (!!tripulacion) {
      return res.redirect("/tripulacion");
    }
  };

  exports.deleteTripulacion = async (req, res) => {
    const Pasaporte_T=req.params.id;
    const response = await Tripulacion.update({
        Activo: false
    }, {
        where: {
            Pasaporte_T
        }
    });
    if (!!response) {
        return res.redirect("/tripulacion");
      }

  };
 