const express = require("express");
const router = express.Router();
 // Controladores 
const avionController = require("../controllers/avionController");
const vueloController = require("../controllers/vuelosController");
const boletoController = require("../controllers/boletoController");
const tripulacionController = require("../controllers/tripulacionController");
const checkinController = require('../controllers/checkinController');

const passport = require("passport");
const bcrypt = require("bcryptjs")
const User = require('../models/cliente');

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/", (req, res) => {
  res.redirect('/index');
});

router.get("/login", (req, res) => {
  res.render("login");
});


router.get("signin", (req, res) => {
  res.render("auth/signin", { title: "Iniciar Sesion" });
});
router.post("signin", authController.signin);
router.get("signup", (req, res) => {
  res.render("auth/signup", { title: "Registrarse" });
});
router.post("signup", userController.signup, authController.signin);


 
router.get("/register", (req, res) => {
  res.render("register");
});

 //router.get("/findVuelo", (req, res) => {



//res.render("findVuelo");
//});
 
 router.post("/findVuelo", catchErrors(vueloController.getVuelos));

 //router.get("/formularioCompra", (req,res) => {
  // res.render("formularioCompra");
 //}) 

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

// Crud de Avion
router.get("/aviones", catchErrors(avionController.getAviones));
router.post("/create/Avion", catchErrors(avionController.create));
router.post("/update/Avion/:id", catchErrors(avionController.update));
router.post("/delete/Avion/:id", catchErrors(avionController.delete));

router.post("/create/serviciosAdicionales", catchErrors(avionController.createserviciosAdicionales));
router.post("/update/serviciosAdicionales/:id", catchErrors(avionController.updateserviciosAdicionales));
router.post("/delete/serviciosAdicionales/:id", catchErrors(avionController.deleteserviciosAdicionales));



// Crud de Vuelos
router.get("/vuelos", catchErrors(vueloController.getAllVuelos));
router.post("/create/vuelo", catchErrors(vueloController.createVuelo));
router.post("/update/vuelo/:id", catchErrors(vueloController.updateVuelo));
router.post("/delete/vuelo/:id", catchErrors(vueloController.deleteVuelo));

router.post("/create/Vuelodesviado", catchErrors(vueloController.createVuelodesviado));
router.post("/update/Vuelodesviado/:id", catchErrors(vueloController.updateVuelodesviado));
router.post("/delete/Vuelodesviado/:id", catchErrors(vueloController.deleteVuelodesviado));


//statistics
router.get("/statistics", (req, res) => {
  res.render("statistics");
});



 

module.exports = router;
