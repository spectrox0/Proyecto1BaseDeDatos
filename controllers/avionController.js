const Avion = require('../models/avion');
const ServiciosAdicionales = require('../models/serviciosAdicionales');
const Modelo = require('../models/modelo');
const Mantenimiento = require('../models/mantenimiento');
const Itinerario = require('../models/itinerario');
const Aeropuerto = require('../models/aeropuerto');

exports.getAviones = async (req, res) => {
  let aviones = await Avion.findAll();
  aviones = aviones.map(val => val.dataValues);
  let serviciosAdicionales = await ServiciosAdicionales.findAll();
  serviciosAdicionales = serviciosAdicionales.map(val => val.dataValues);
  let modelos = await Modelo.findAll();
  modelos = modelos.map(val => val.dataValues);
  let mantenimiento = await Mantenimiento.findAll();
  mantenimiento = mantenimiento.map(val => val.dataValues);
  let itinerarios = await Itinerario.findAll();
  itinerarios = itinerarios.map(val => val.dataValues);
  if (aviones, serviciosAdicionales, modelos, itinerarios) {
    return res.render("aviones", { aviones, serviciosAdicionales, modelos, mantenimiento, itinerarios });
  }
};

exports.create = async (req, res) => {


  const aviones = await Avion.build({
    C_estado: req.body.estado,
    C_modelo: req.body.modelo,
  });
  await aviones.save();
  if (!!aviones) {
    return res.redirect("/aviones");
  }

};

exports.createServiciosAdicionales = async (req, res) => {
  var cantTV = req.body.CantTV;
  var Internet = req.body.Internet;
  var internet;
  console.log(cantTV);

  if (Internet == 'on') {
    internet = 1
  } else internet = 0;
  console.log(req.body)
  try {
    const serviciosAdicionales = await ServiciosAdicionales.build({

      C_avion: req.body.C_avion,
      internet: internet,
      cant_TV: cantTV
    });
    await serviciosAdicionales.save();
    console.log(serviciosAdicionales)
    if (!!serviciosAdicionales) {
      return res.redirect("/aviones");
    } else {
      return res.render("mensajeError", { message: "No se pudo crear el servicio Adicional", dir: "aviones" });
    }
  } catch (error) {

    return res.render("mensajeError", { message: "No se pudo crear el servicio Adicional", dir: "aviones" });
  }

};

exports.updateServiciosAdicionales = async (req, res) => {
  const C_avion = req.params.id;
  const cantTV = req.body.cantTV;
  var Internet = req.body.Internet;
  let internet;

  if (Internet == 'on') {
    internet = 1
  } else internet = 0;
  try {
    const servicioAdicionales = await ServiciosAdicionales.update({
      internet: internet,
      cant_TV: cantTV,

    }, {
        where: {
          C_avion: C_avion
        }


      });
    if (!!servicioAdicionales) {
      return res.redirect("/aviones");
    }
  } catch (error) {
    return res.render("mensajeError", { message: "No se pudo actualizar el servicio Adicional", dir: "aviones" });
  }

}



exports.update = async (req, res) => {
  const C_avion = req.params.id;


  const aviones = await Avion.update(
    {
      C_estado: req.body.estado,
      C_modelo: req.body.modelo,
      C_itinerario: req.body.itinerario


    },

    { where: { C_avion: C_avion } }
  );
  // await aviones.save();
  if (!!aviones) {
    return res.redirect("/aviones");
  }
};

exports.delete = async (req, res) => {
  const C_avion = req.params.id;
  try {
    const response = await Avion.destroy({

      where: {
        C_avion: C_avion
      }
    });
    if (!!response) {
      return res.redirect("/aviones");
    }
    else return res.render("mensajeError", { message: "No se pudo eliminar el Avion", dir: "aviones" });

  } catch (error) {
    return res.render("mensajeError", { message: "No se pudo eliminar el Avion", dir: "aviones" });

  }
};

exports.deleteServiciosAdicionales = async (req, res) => {
  try {
    const C_avion = req.params.id;
    const response = await ServiciosAdicionales.destroy({
      where: {
        C_avion: C_avion
      }
    });
    if (!!response) {
      return res.redirect("/aviones");
    }
    else return res.render("mensajeError", { message: "No se pudo eliminar el servicio", dir: "aviones" });

  } catch (error) {
    return res.render("mensajeError", { message: "No se pudo eliminar el servicio", dir: "aviones" });
  }
}
