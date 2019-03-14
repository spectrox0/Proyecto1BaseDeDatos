const User = require("../models/cliente");
const Pasaje = require("../models/pasaje");
const Boleto = require("../models/boleto");
const Vuelo = require("../models/vuelo");
const asientoModelo = require ("../models/modeloAsiento"); 
const asientoVuelo = require("../models/vueloAsiento");
const Pasajero = require ("../models/pasajero") ;
const Cliente = require ("../models/cliente");
const Modelo = require ("../models/modelo") ;
const Fabricante = require("../models/fabricante");
exports.getAllModelos = async (req,res) => {
try{
    let modelos = await Modelo.findAll();
    modelos = modelos.map(val=>val.dataValues);
    
    let fabricantes = await Fabricante.findAll();
    fabricantes = fabricantes.map(val=>val.dataValues);
    if(!!modelos) return res.render("modelo", {modelos,fabricantes});
} catch(error) {
    return res.render("mensajeError",{message: "Error no se pudo recuperar los modelos", dir:"index"});
    
}
  

}
exports.createModelo = async (req,res) => {
  try{ 
    let response = await Modelo.build({
      Nombre: req.body.nombre,
      vel_max: req.body.vel_max,
      vel_crucero: req.body.vel_crucero,
      peso_vacio: req.body.peso_vacio,
      peso_max: req.body.peso_max,
      carga_max_equi: req.body.cargaMaxE,
      combustible: req.body.combustible,
      cant_banos : req.body.cant_banos,
      cant_salida_emerg : req.body.cant_salida_emerg,
      dist_despegue_carga_max: req.body.dist_despegue_carga_max,
      C_fabricante: req.body.C_fabricante

    });

await response.save();
   let Asiento1 = await asientoModelo.build( {
     C_modelo: response.C_modelo,
     C_asiento: 1 ,
     Cantidad: req.body.asiento1
   }
   );
   let Asiento2 = await asientoModelo.build( {
    C_modelo: response.C_modelo,
    C_asiento: 2 ,
    Cantidad: req.body.asiento2
  }
  );
  let Asiento3 = await asientoModelo.build( {
    C_modelo: response.C_modelo,
    C_asiento: 3 ,
    Cantidad: req.body.asiento3
  }
  );
  let Asiento4 = await asientoModelo.build( {
    C_modelo: response.C_modelo,
    C_asiento: 4 ,
    Cantidad: req.body.asiento4
  }
  );

    await Asiento1.save();
    await Asiento2.save();
    await Asiento3.save();
    await Asiento4.save();

    if(!!response) return res.redirect("/modelos");
  }catch(error) {
 return res.render("mensajeError",{message: "Error no se pudo crear el modelo de avion", dir:"modelos"});

  }

}

exports.deleteModelo = async (req,res) => {
 try{

    let response1 = await asientoModelo.destroy({
    where: {
        C_modelo: req.params.id}
        
    });

    let response = await Modelo.destroy({
      where: { 
          C_modelo: req.params.id
      }


    }) ; 

     if(!!response) {
        return res.redirect("/modelos")
     }

 } catch(error) {
    return res.render("mensajeError", {message:"No ha sido posible eleiminar el modelo de avion", dir:"modelos"})

 }



}

exports.updateModelo = async (req,res) => {
    try{
       let response = await Modelo.update({
        Nombre: req.body.nombre,
        vel_max: req.body.vel_max,
        vel_crucero: req.body.vel_crucero,
        peso_vacio: req.body.peso_vacio,
        peso_max: req.body.peso_max,
        carga_max_equi: req.body.cargaMaxE,
        combustible: req.body.combustible,
        cant_banos : req.body.cant_banos,
        cant_salida_emerg : req.body.cant_salida_emerg,
        dist_despegue_carga_max: req.body.dist_despegue_carga_max,
        C_fabricante: req.body.C_fabricante

       },
       {
         where: { 
             C_modelo: req.params.id
         }
   
   
       });

        if(!!response) {
           return res.redirect("/modelos")
        }
   
    } catch(error) {
       return res.render("mensajeError", {message:"No ha sido posible actualizar el modelo de avion", dir:"modelos"})
   
    }
   
   
   
   }