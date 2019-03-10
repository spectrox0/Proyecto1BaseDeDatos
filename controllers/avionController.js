const Avion = require('../models/avion');
const ServiciosAdicionales = require('../models/serviciosAdicionales');
/*
controller.getAviones = async function (callback) {
    try {
        let response = await Avion.findAll({
            where: {
                Activo: 1
            }
        });
        let aviones= response.map(result => result.dataValues);
        console.log(aviones);
        callback(aviones, null);
    } catch (error) {
        callback(null, error);
    }
} */


exports.getAviones = async (req, res) => {
    let aviones = await Avion.findAll( {
        where: {
        Activo:1
    }
});
    aviones = aviones.map(val => val.dataValues);
    let serviciosAdicionales = await ServiciosAdicionales.findAll();
    serviciosAdicionales = serviciosAdicionales.map( val => val.dataValues);
    if (aviones) {
      return res.render("aviones", {aviones,serviciosAdicionales});
    }
  };

  exports.create = async (req, res) => {
    const { estado, modelo, IATA,TV, Internet} = req.body;
    /* var tv, internet ;
        
    if (TV=='on') {
        tv=1;
    } else tv=0;
    if (Internet=='on') {
        internet=1
    } else internet=0; */

    const aviones = await Avion.build({
        C_estado: req.body.estado,
        C_modelo: req.body.modelo,
    });
    await aviones.save();
    if (!!aviones) {
      return res.redirect("/aviones");
    }
    // req.flash({ 'error': 'No se creo' });
  };
 /*
controller.deleteAvion= async function (C_avion, callback) {
    try {
        let response = await Avion.update({
            Activo: false
        }, {
            where: {
                C_avion
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createAvion = async function (data, callback) {
    try {
         var tv, internet ;
        
          if (data.TV=='on') {
              tv=1;
          } else tv=0;
          if (data.Internet=='on') {
              internet=1
          } else internet=0;
        // code goes here
        let response = await Avion.create({
        C_estado: data.estado,
        C_modelo: data.modelo,
        IATA: data.IATA,
        TV: tv,
        Internet : internet,
        } 
        );
        callback(null);
    } catch (error) {
        callback(error);
    }
}
  */
exports.update = async (req, res) => {
    const C_avion = req.params.id;
     /*var tv, internet ;
          if (req.body.TV=='on') {
              tv=1;
          } else tv=0;
          if (req.body.Internet=='on') {
              internet=1
          } else internet=0; */
    const aviones = await Avion.update(
      {  C_estado: req.body.estado,
        C_modelo: req.body.modelo},
       // IATA: req.body.IATA,
       // TV: tv,
        //Internet : internet},
      { where: {C_avion} }
    );
    // await aviones.save();
    if (!!aviones) {
      return res.redirect("/aviones");
    }
  };

  exports.delete = async (req, res) => {
    const C_avion=req.params.id;
    const response = await Avion.update({
        Activo: false
    }, {
        where: {
            C_avion
        }
    });
    if (!!response) {
        return res.redirect("/aviones");
      }

  };
  
  exports.updateServiciosAdicionales = async (req,res) => {
   

  }



  /*
controller.updateAvion = async function (data,C_avion, callback) {
    try {
         var tv, internet ;
          if (data.TV=='on') {
              tv=1;
          } else tv=0;
          if (data.Internet=='on') {
              internet=1
          } else internet=0;
        // code goes here
        let response = await Avion.update({
        C_estado: data.estado,
        C_modelo: data.modelo,
        IATA: data.IATA,
        TV: tv,
        Internet : internet
        },{
            where: {
               C_avion
            } }); 
        callback(null);
    } catch (error) {
        callback(error);
    }
}  */
