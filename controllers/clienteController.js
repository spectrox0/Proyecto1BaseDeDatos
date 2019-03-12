const Cliente = require ("../models/cliente") ;
const Pasaje = require ("../models/pasaje");

exports.getAllClientes = async (req, res) => {
    try {
 let clientes = await Cliente.findAll();
 clientes = clientes.map(val => val.dataValues);
 let pasajes = await Pasaje.findAll();
 pasajes = pasajes.map( val => val.dataValues);
 if(!!clientes) return res.render("clientes", {clientes,pasajes});
    } catch (error) {
        res.render("mensajeError" , {message:" Ha ocurrido un error no se han podido cargar los clientes", dir:"index"} )
    }

}
exports.updateCliente = async (req,res) => {

    try{
  let response = await Cliente.update({
    Nombre: req.body.nombre,
    Apellido: req.body.apellido,
    email: req.body.email,
    telefono: req.body.telefono
  }, {
      where: { 
          cedula: req.params.id
      }
  })

 if(!!response)
   res.redirect("/clientes");

    } catch ( error ) {
        res.render("mensajeError" , {message:" Ha ocurrido un error no se han podidio actualizar el clientes", dir:"index"} )
    }
}