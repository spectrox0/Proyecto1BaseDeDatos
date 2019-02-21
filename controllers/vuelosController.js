const Vuelo = require('../models/vuelo');
const Itinerario = require('../models/itinerario');
const Aeropuerto = require('../models/aeropuerto')

Vuelo.hasOne(Itinerario ,  {foreignKey: 'C_itinerario'});

exports.getVuelos = async (req, res) => {
    let vuelos = await Vuelo.findAll({
        where: {
        Activo:1, 
        Fecha_Salida: req.body.fecha,
    } , 
    include:[{
      model: Itinerario,
      where: {
        IATA_origen: req.body.origen, 
        IATA_destino: req.body.destino
      }
    } ]
     
});    
    vuelos = vuelos.map(val => val.dataValues);

    if (vuelos) {
      return res.render("findVuelo", {vuelos});
    }
  };
