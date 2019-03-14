const Vuelo = require('../models/vuelo');
const Itinerario = require('../models/itinerario');
const Aeropuerto = require('../models/aeropuerto')
const Avion = require("../models/avion");
const modeloAsiento = require("../models/modeloAsiento");
const VueloDesviado = require("../models/vueloDesviado")
const asientoVuelo = require("../models/vueloAsiento");
const Asiento = require('../models/asiento');
const Boleto = require("../models/boleto");
const Abordados = require("../models/abordados");
Vuelo.hasMany(Avion, { foreignKey: 'C_avion', sourceKey: "C_avion" });
Avion.belongsTo(Vuelo, { foreignKey: 'C_avion', targetKey: "C_avion" });

Avion.hasMany(Itinerario, { foreignKey: 'C_itinerario', sourceKey: 'C_itinerario' });
Itinerario.belongsTo(Avion, { foreignKey: 'C_itinerario', targetKey: 'C_itinerario' });

exports.getVuelos = async (req, res) => {
    let C_vuelo = req.body.busquedad;

    let vuelosAsientos = await asientoVuelo.findAll({
        where: {
            C_vuelo: C_vuelo
        }

    });
    vuelosAsientos = vuelosAsientos.map(val => val.dataValues);

    let Asientos = await Asiento.findAll();
    Asientos = Asientos.map(val => val.dataValues);

    let nroAsientos = await Asiento.count();

    let abordados = [];

    for (var i = 1; i <= nroAsientos; i++) {

        let abordado1 = await Abordados.count({
            where: {
                C_vuelo: C_vuelo,
                nro_Asiento: i
            }

        });
        await abordados.push(abordado1);

    }

    res.render("statistics", { abordados, Asientos, vuelosAsientos })

}