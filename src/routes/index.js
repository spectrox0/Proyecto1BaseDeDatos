'use strict';
 
var routesIndex = function(app, controllers){
 
  //Index
  app.get("/", controllers.index.main);
  //app.route('/').get(controllers.index.main);
  app.get("/airplane", controllers.index.airplane);
  app.get("/client", controllers.index.cliente);

app.get("/flight", controllers.index.buscarDatos);


app.get("/modelAirplane", controllers.index.modelAirplane);


}



module.exports = routesIndex;