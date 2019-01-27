const express = require('express');
const router = express.Router();

 router.get('/' ,(req,res)=>{
  res.render('index');
 });

 router.get('/airPlane', (req,resp) => {

    resp.render('airPlane');
 })
module.exports = router;