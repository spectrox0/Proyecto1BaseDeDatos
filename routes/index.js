const express = require("express");
const router = express.Router();
const avionController = require("../controllers/avionController");

router.get("/", (req, res) => {
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
