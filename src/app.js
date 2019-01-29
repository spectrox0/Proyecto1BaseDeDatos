 
 require("dotenv").config({ path: "variables.env" });
 const path = require('path');
 const express = require('express'); 
 const morgan = require ('morgan');
 const app = express(); 



const bodyParser = require("body-parser");
;
const sequelize = require("./config/database");

   //IMPORTS 
   const routes = require("./routes/index");
   const errorHandlers = require("./handlers/errorHandlers");
 

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


// Middleware propio
app.use((req, res, next) => {
  res.locals.h = helpers; // Expondra el archivo helpers en la vistas
  res.locals.user = req.user || null; // Expondra el usuario en la vistas o sera null
  res.locals.currentPath = req.path; // Expondra la ruta
  next(); // Vamos a la siguiente funcion
});

// promisify convertira las algunas API basadas en callback a Promesas
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// Si no conseguimos el archivo le mandamos 404 al cliente
app.use(errorHandlers.notFound);

// Si el error es del cliente le advertimos con un flash
app.use(errorHandlers.flashValidationErrors);

// Si estamos desarrollando y la app falla veamos donde esta el error
if (app.get("env") === "development") {
  app.use(errorHandlers.developmentErrors);
}

// Si la app falla y estamos en produccion los errores cambian
app.use(errorHandlers.productionErrors);
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