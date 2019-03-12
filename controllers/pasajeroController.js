const Pasajero = require ("../models/pasajero") ;
const Boleto = require ("../models/boleto");
Pasajero.belongsTo(Boleto, {foreignKey: 'Pasaporte_P' ,targetKey: "Pasaporte_P"})

exports.getPasajeros = async (req,res) => {
let pasajeros = Pasajero.findAll({ 
  include: [ {
   model:Boleto,
   required:true,
   where: {
     C_vuelo: req.body.busquedad
   }
  }

  ]
});
pasajeros = await pasajeros.map(val => val.dataValues);
console.log(pasajeros)
if(!!pasajeros)
 return res.render("pasajeros", {pasajeros});
}