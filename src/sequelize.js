var Sequelize = require('sequelize');
var AvionModel = require('./models/avion');
var VueloModel = require('./models/vuelo');
var ClienteModel = require('./models/cliente');

var sequelize = new Sequelize('aereopuertoguacamaya', 'root', '2413180s', {
  host: 'localhost',
  dialect: 'mysql',
  port:3306,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}) ;

var Avion = AvionModel(sequelize, Sequelize);
var Vuelo = VueloModel(sequelize, Sequelize);
var Cliente = ClienteModel(sequelize, Sequelize);
///Preguntar
Vuelo.belongsTo(Avion);

Vuelo.belongsTo(Cliente);

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  });

module.exports = {
  Avion:any,
  Vuelo:any,
  cliente:any
} ;
sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
  })