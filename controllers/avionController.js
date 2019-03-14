const Avion = require('../models/avion');
const ServiciosAdicionales = require('../models/serviciosAdicionales');
const Modelo = require('../models/modelo');
const Mantenimiento = require('../models/mantenimiento');
const Estado = require('../models/estadoAvion');
const Itinerario = require('../models/itinerario');
const Aeropuerto = require('../models/aeropuerto');
const AvionMantenimiento= require("../models/avionmantenimiento");
const AvionAlquilado = require("../models/avionalquilado");
AvionMantenimiento.hasMany(Mantenimiento ,  {foreignKey: 'C_mantenimiento', sourceKey:'C_mantenimiento'});
Mantenimiento.belongsTo(AvionMantenimiento, {foreignKey: 'C_mantenimiento' ,targetKey:'C_mantenimiento'} );

Avion.hasMany(Itinerario ,  {foreignKey: 'C_itinerario', sourceKey:'C_itinerario'}); 
Itinerario.belongsTo(Avion, {foreignKey: 'C_itinerario' ,targetKey:'C_itinerario'}) ;

Avion.hasMany(Estado ,  {foreignKey: 'C_estado', sourceKey:'C_estado'}); 
Estado.belongsTo(Avion, {foreignKey: 'C_estado' ,targetKey:'C_estado'}) ;

AvionAlquilado.hasMany(Avion,  {foreignKey: 'C_avion', sourceKey:'C_avion'}); 
Avion.belongsTo(AvionAlquilado, {foreignKey: 'C_avion' ,targetKey:'C_avion'}) ;


Avion.hasMany(Modelo ,  {foreignKey: 'C_modelo', sourceKey:'C_modelo'}); 
Modelo.belongsTo(Avion, {foreignKey: 'C_modelo' ,targetKey:'C_modelo'}) ;

exports.getAviones = async (req, res) => {
    let aviones = await Avion.findAll({
      include: [{
        model:Itinerario,
      } ,
      
     {
      model:AvionAlquilado,
    } , 
    {
      model:Estado,
    },
    {
      model:Modelo,
    }] });

    aviones = aviones.map(val => val.dataValues);
    console.log(aviones);
    let serviciosAdicionales = await ServiciosAdicionales.findAll();
    serviciosAdicionales = serviciosAdicionales.map( val => val.dataValues);
    let modelos = await Modelo.findAll();
    modelos = modelos.map(val => val.dataValues) ;
    let mantenimiento = await Mantenimiento.findAll();
    mantenimiento = mantenimiento.map (val=> val.dataValues);
    let estados = await Estado.findAll();
    estados = estados.map (val=> val.dataValues);
    let itinerarios = await Itinerario.findAll();
    itinerarios = itinerarios.map(val => val.dataValues);
    let avionmantenimiento = await AvionMantenimiento.findAll({ 
   
      include: [ {
        required:true,
        model: Mantenimiento,
      
      }]
    });

     avionmantenimiento = avionmantenimiento.map( val => val.dataValues);
 
    let avionalquilado = await AvionAlquilado.findAll();
    avionalquilado = avionalquilado.map(val => val.dataValues);
    if (aviones,serviciosAdicionales,modelos,itinerarios) {
      return res.render("aviones", {aviones,serviciosAdicionales,modelos,mantenimiento,itinerarios,estados,
                                     avionmantenimiento , avionalquilado});
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
    var internet ;
     console.log(cantTV);
   
    if (Internet=='on') {
        internet=1
    } else internet=0;
    console.log(req.body)
    try{
    const serviciosAdicionales = await ServiciosAdicionales.build({

           C_avion: req.body.C_avion,
           internet: internet, 
           cant_TV: cantTV
    });
    await serviciosAdicionales.save();
    console.log(serviciosAdicionales)
    if (!!serviciosAdicionales) {
      return res.redirect("/aviones");
    }else { 
        return res.render("mensajeError", {message: "No se pudo crear el servicio Adicional", dir:"aviones"});} 
 }catch(error) {

        return res.render("mensajeError", {message: "No se pudo crear el servicio Adicional", dir:"aviones"});
    }
    
  };

 exports.updateServiciosAdicionales = async (req,res) =>{
    const C_avion = req.params.id;
    const cantTV = req.body.cantTV;
    var Internet = req.body.Internet;
    let internet ;
  
    if (Internet=='on') {
        internet=1
    } else internet=0;
try {
    const servicioAdicionales = await ServiciosAdicionales.update( {
        internet: internet, 
        cant_TV: cantTV,
        
    }, {
    where: {
         C_avion:C_avion
        }


    });
    if (!!servicioAdicionales) {
        return res.redirect("/aviones");
      } }catch(error) {
return res.render("mensajeError", {message: "No se pudo actualizar el servicio Adicional", dir:"aviones"});
    }

      }
 


exports.update = async (req, res) => {
    const C_avion = req.params.id;
 

    const aviones = await Avion.update(
      {  C_estado: req.body.estado,
        C_modelo: req.body.modelo,
        C_itinerario: req.body.itinerario
        
    
    },
       
      { where: {C_avion: C_avion} }
    );
    // await aviones.save();
    if (!!aviones) {
      return res.redirect("/aviones");
    }
  };

  exports.delete = async (req, res) => {
    const C_avion=req.params.id;
    try{
    const response = await Avion.destroy({
    
        where: {
            C_avion:C_avion
        }
    });
    if (!!response) {
        return res.redirect("/aviones");
      }
      else return res.render("mensajeError",{message:"No se pudo eliminar el Avion" , dir: "aviones"});

  }catch(error) {
    return res.render("mensajeError",{message:"No se pudo eliminar el Avion" , dir: "aviones"});

  } } ;
  
  exports.deleteServiciosAdicionales = async (req,res) => {
      try{
    const C_avion=req.params.id;
    const response = await ServiciosAdicionales.destroy({
        where: {
            C_avion:C_avion
        }
    });
    if (!!response) {
        return res.redirect("/aviones");
      }
      else return res.render("mensajeError",{message:"No se pudo eliminar el servicio" , dir: "aviones"});

  } catch(error) {
    return res.render("mensajeError",{message:"No se pudo eliminar el servicio" , dir: "aviones"});
  }
}

exports.createMantenimiento = async (req, res) => {
 try{
   let mantenimiento = await AvionMantenimiento.build({ 
    C_avion: req.body.C_avion,
    C_mantenimiento: req.body.mantenimiento
   }) ; 
  await mantenimiento.save();
   if (!!mantenimiento) {
     res.redirect("/aviones");
   }
  }catch (error) {
  res.render("mensajeError", {message:"No se pudo crear el mantenimiento ", dir:"aviones"});

 }


}

exports.deleteMantenimiento= async (req,res) => {
  try{
const C_avion=req.params.id;
const response = await AvionMantenimiento.destroy({
    where: {
        C_avion:C_avion
    }
});
if (!!response) {
    return res.redirect("/aviones");
  }
  else return res.render("mensajeError",{message:"No se pudo eliminar el mantenimiento" , dir: "aviones"});

} catch(error) {
return res.render("mensajeError",{message:"No se pudo eliminar el mantenimiento" , dir: "aviones"});
}
}

exports.updateMantenimiento = async (req,res) =>{

try {
  const mantenimiento = await AvionMantenimiento.update( {
    C_mantenimiento: req.body.mantenimiento
      
  }, {
  where: {
       C_avion:req.params.id }


  }) ;
  if (!!mantenimiento) {
      return res.redirect("/aviones");
    }  } catch(error) {
return res.render("mensajeError", {message: "No se pudo actualizar el servicio Adicional", dir:"aviones"});
  }

    }