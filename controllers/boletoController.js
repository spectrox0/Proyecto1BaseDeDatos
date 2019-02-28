const User = require("../models/cliente");
const Pasaje = require("../models/pasaje");
const Boleto = require("../models/boleto");
const Vuelo = require("../models/vuelo");

exports.createBoleto = async (req, res) => {
  
    let Boleto= await Boleto.build({
        C_boleto: 2,
        C_vuelo: 3 , 
        C_asiento: 3, 

        Cantidad_Equipaje:1, 
        Pasaporte_P: 2, 
       
  })

}

exports.sendForm = async (req, res) => {
   const idVuel = req.body.vueloSel; 
   
 res.render("formularioCompra", {idVuel});

}