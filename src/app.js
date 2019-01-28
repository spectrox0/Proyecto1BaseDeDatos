 
 var path = require('path');
 var express = require('express'); 
 var morgan = require ('morgan');
 var app = express(); 
 var bodyParser = require('body-parser');
   //IMPORTS 
  var indexRoutes = require('./routes/index');
 

   //SETTINGS 
app.set('port' , process.env.PORT || 3000) ;
app.set('views' , path.join(__dirname,'public/views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));



 //middleware 
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'aplication/vnd.api+json'}));
   //routes 
 app.use('/',indexRoutes);



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

 module.exports = app;