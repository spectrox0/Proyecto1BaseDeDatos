const express = require("express");
const router = express.Router();
const avionController = require("../controllers/avionController");
const passport = require("passport");
const bcrypt = require("bcryptjs")
const { ROUNDS } = process.env;
const User = require('../models/cliente');

router.get("/", (req, res) => {
  res.redirect('/login');
});

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login"
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register"
  });
});

router.get("/index", (req, res) => {
  res.render("index", {
    title: ""
  });
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

const register = async (req, res, next) => {
  try {
    let { name,apellido,Cedula, Telefono, Email, password } = req.body;
    const salt = await bcrypt.genSalt(parseInt(ROUNDS));
    const hash = await bcrypt.hash(password, salt);
    let response = await User.create({
        Nombre: name,
        Apellido: apellido,
        cedula:Cedula,
        telefono: Telefono,
        email: Email,
        password: hash
    });
    next();
  } catch (error) {
    next(error);
  }
};

router.post("/register", register, passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/index'}), (req, res) => {
  res.redirect('/index');
});

router.post("/login", passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/index' }), (req, res) => {
  res.redirect('/index');
});


router.get("/aviones", (req, res) => {
  avionController.getAviones((aviones, err) => {
    if (err)
      res.json({
        success: false,
        msg: 'Failed to show products'
      });
    else
      res.render("aviones", {aviones});
  });
});

 router.post("/update/:id", (req,res) => {
   console.log('sas llego aca');
  if (!!req.params.id && !!req.body) {
    avionController.updateAvion(req.body, req.params.id, (err) => {
      if (err)
        res.json({
          success: false,
          msg: 'Failed to update product'
        });
      else
        res.redirect('/');
    });
  }
});

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
});
  //Avion
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
});

router.get("/:id");

module.exports = router;
