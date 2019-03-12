const express = require("express");
const router = express.Router();
 // Controladores 
const avionController = require("../controllers/avionController");
const vueloController = require("../controllers/vuelosController");
const boletoController = require("../controllers/boletoController");
const tripulacionController = require("../controllers/tripulacionController");
const checkinController = require('../controllers/checkinController');
const estadisticaController = require('../controllers/estadisticaController');
const modeloController = require('../controllers/modeloController');
const pasajeroController = require('../controllers/pasajeroController');
const clienteController = require('../controllers/clienteController');

const { catchErrors } = require("../handlers/errorHandlers");

router.get("/", (req, res) => {
  res.redirect('/index');
});
 
 router.post("/findVuelo", catchErrors(vueloController.getVuelos));


 router.post("/formularioCompra", catchErrors(boletoController.sendForm)) ;

 router.post("/confirmCompra/:id/:precio", catchErrors(boletoController.confirmCompra)) ; 
router.post("/formularioCompra2" , boletoController.compraEscala) ; 

router.get("/index", (req, res) => {
  res.render("index");
});
router.get("/check_in", (req, res) => {
  res.render("check_in");
});

router.post("/checkinON", catchErrors(checkinController.checkInOn));
router.post("/checkFinal/:p/:nv/:ca", checkinController.checkFinal);


  // Crud de tripulacion  
router.get("/tripulacion" , tripulacionController.getTripulacion) ; 
router.post("/update/tripulacion/:id",tripulacionController.updateTripulacion);
router.post("/delete/tripulacion/:id",tripulacionController.deleteTripulacion);
router.post("/create/tripulacion", tripulacionController.createTripulacion);

router.get("/vueloTripulacion" , tripulacionController.getTripulacioninVuelo);
router.post("/asignarVuelo" , tripulacionController.createTripulacioninVuelo);
router.post("/delete/tripulacionInvuelo/:id1/:id2",tripulacionController.deleteTripulacioninVuelo);

// Crud de Avion
router.get("/aviones", catchErrors(avionController.getAviones));
router.post("/create/Avion", catchErrors(avionController.create));
router.post("/update/Avion/:id", catchErrors(avionController.update));
router.post("/delete/Avion/:id", catchErrors(avionController.delete));

router.post("/create/serviciosAdicionales", catchErrors(avionController.createServiciosAdicionales));
router.post("/update/serviciosAdicionales/:id", catchErrors(avionController.updateServiciosAdicionales));
router.post("/delete/serviciosAdicionales/:id", catchErrors(avionController.deleteServiciosAdicionales));



// Crud de Vuelos
router.get("/vuelos", catchErrors(vueloController.getAllVuelos));
router.post("/create/vuelo", catchErrors(vueloController.createVuelo));
router.post("/update/vuelo/:id", catchErrors(vueloController.updateVuelo));
router.post("/delete/vuelo/:id", catchErrors(vueloController.deleteVuelo));

router.post("/create/Vuelodesviado", catchErrors(vueloController.createVuelodesviado));
router.post("/update/Vuelodesviado/:id", catchErrors(vueloController.updateVuelodesviado));
router.post("/delete/Vuelodesviado/:id", catchErrors(vueloController.deleteVuelodesviado));


//statistics
router.post("/statistics",estadisticaController.getVuelos);

router.get("/searchStatistic", (req,res)=> {
 
  res.render("searchStatistics");
});

// Crud Modelo 
router.get("/modelos", catchErrors(modeloController.getAllModelos));
router.post("/create/modelo" , catchErrors(modeloController.createModelo) );
router.post("/delete/modelo/:id" , catchErrors(modeloController.deleteModelo) );
router.post("/update/modelo/:id" , catchErrors(modeloController.updateModelo) );
 
// Crud Pasajeros 
router.get("/searchPasajeros", (req,res)=> {
 
  res.render("searchPasajeros");
});
router.post("/pasajeros", catchErrors(pasajeroController.getPasajeros));

router.get("/clientes", catchErrors(clienteController.getAllClientes));

module.exports = router;
