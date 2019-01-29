/*var express = require('express');
var router = express.Router();
const avionController = require("../controllers/avionController");

 router.get('/' ,(req, res ) =>{
  res.render('index');mv 
 });

 router.get('/airPlane', (req, resp ) => {

    resp.render('airPlane');
 }) ;
module.exports = router;

*/
const express = require("express");
const router = express.Router();
const avionController = require("../controllers/avionController");

router.get("/", (req, res) => {
  avionController.getAviones((aviones, err) => {
    if (err)
      res.json({
        success: false,
        msg: 'Failed to show aviones'
      });
    else
      res.render("index", {aviones});
  });
});

router.post("/delete/:id", (req, res) => {
  if (!!req.params.id) {
    avionController.deleteAvion(req.params.id, (err) => {
      if (err)
        res.json({
          success: false,
          msg: 'Failed to delete avion'
        });
      else
        res.redirect('/');
    });
  }
});

router.post("/create", (req, res) => {
  console.log('Hello from routes!');
  console.log(req.body);
  if (!!req.body) {
    avionController.createAvion(req.body, (err) => {
      if (err)
        res.json({
          success: false,
          msg: 'Failed to delete avion'
        });
      else
        res.redirect('/');
    });
  }
});

router.get("/:id");

module.exports = router;