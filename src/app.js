 
 const path = require('path');
 const express = require('express'); 
 const morgan = require ('morgan');
 const app = express(); 
   //IMPORTS 
  const indexRoutes = require('./routes/index');
 

   //SETTINGS 
 app.set('port' , process.env.PORT || 3000)
 app.set('views' , path.join(__dirname,'public/views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));
 //middleware 
app.use(morgan('dev'));

   //routes 
 app.use('/',indexRoutes);

 app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));

 app.use(function(req, res, next) {
    var err = new Error('No encontrado');
    err.status = 404;
    next(err);
});
   //Starting the server

 app.listen(app.get('port'), () => {
   console.log(`Server on port ${app.get('port')}`);

 } ) ;  