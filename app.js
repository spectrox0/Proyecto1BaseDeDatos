const path = require('path');

//Inicializo el servidor express
var express=require('express');
var app= express();


//Set static Path
app.use(express.static(path.join(__dirname,'public')));



//Configuración de la aplicación express
require('./app/config/set-config-express')(app);



//Exporto mi instancia de app para utilizarlo en otros archivos
module.exports = app;
 
//Rutas de mi aplicación
//require(path.join(process.cwd(), 'app', 'routes'))();


app.get("/",function (req, res) {

    //try {
      return res.render('crearAereopuerto');
   // } catch (e) {
    //  console.log("Error");
    });
//Ejecuto el servidor
app.listen(3306);

