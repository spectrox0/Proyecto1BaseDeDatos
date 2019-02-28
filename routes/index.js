const express = require("express");
const router = express.Router();
 // Controladores 
const avionController = require("../controllers/avionController");
const vueloController = require("../controllers/vuelosController");
const boletoController = require("../controllers/boletoController");

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

router.post("/create", catchErrors(avionController.create));
router.get("/aviones", catchErrors(avionController.getAviones));
router.get("/update", catchErrors(avionController.getAviones));
router.get("/update/:id", catchErrors(avionController.getAviones)); 
router.post("/update/:id", catchErrors(avionController.update));
router.get("/delete", catchErrors(avionController.getAviones));
router.get("/delete/:id", catchErrors(avionController.getAviones));
router.post("/delete/:id", catchErrors(avionController.delete));


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

router.get("/index", (req, res) => {
  res.render("index");
});
  /*
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
}); */
 /*
const register = async (req, res, next) => {
  try {
    let { name,apellido,cedula, telefono, email, password } = req.body;
    const salt = await bcrypt.genSalt(parseInt(ROUNDS));
    const hash = await bcrypt.hash(password, salt);
    let response = await User.create({
        name,
        apellido,
        cedula,
        telefono,
        email,
        password: hash
    });
    next();
  } catch (error) {
    next(error);
  }
};  */

 /*
router.post("/register", register, passport.authenticate('local', {
 successRedirect: '/index',
 failureRedirect: '/login'}), (req, res) => {
  res.redirect('/index');
}); */

 /*
router.post("/login", passport.authenticate('local', {
   successRedirect: '/index' ,
   failureRedirect: '/login'}), (req, res) => {
  res.redirect('/index');
  
}); */

 /*
router.post("/delete/:id", (req, res) => {
  if (!!req.params.id) {
    avionController.deleteAvion(req.params.id, (err) => {
      if (err)
        res.json({
          success: false,
          msg: 'Failed to delete product'
        });
      else
        res.redirect('/');
    });
  }
}); */
  //Avion

/*
router.post("/create", (req, res) => {
  console.log('Hello from routes!');
  console.log(req.body);
  if (!!req.body) {
    avionController.createAvion(req.body, (err) => {
      if (err)
        res.json({
          success: false,
          msg: 'Failed to delete product'
        });
      else
        res.redirect('/');
    });
  }
}); router.get("/:id"); */
 

module.exports = router;
