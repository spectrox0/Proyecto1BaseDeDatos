 
 //require("dotenv").config({ path: "variables.env" });
 const path = require('path');
 const express = require('express'); 
 const morgan = require ('morgan');
 const app = express(); 



const bodyParser = require("body-parser");
;
const sequelize = require("./config/database");

   //IMPORTS 
   const routes = require("./routes/index");
 

   //SETTINGS 
   app.set("port", process.env.PORT || 3000);
   const server = app.listen(app.get("port"), () => {
     console.log(`Express running → PORT ${server.address().port} 🔥`);
   });

sequelize
  .authenticate()
  .then(value => value)
  .catch(err => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
  });

  sequelize.sync({logging: false});

app.set('views' , path.join(__dirname,'public/views'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);
/*


 //middleware 
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'aplication/vnd.api+json'}));
   //routes 
 app.use('/',indexRoutes);


/*
  //DataBase

 

   //error
 app.use(function(req, res, next) {
    var err = new Error('No encontrado');
    err.status = 404;
    next(err);
});
   //Starting the server

 app.listen(app.get('port'), () => {
   console.log(`Server on port ${app.get('port')}`);

 } ) ;  

 module.exports = app;*/