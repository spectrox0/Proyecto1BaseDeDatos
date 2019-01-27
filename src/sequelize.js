var Sequelize = require('sequelize');
var AirPlane = require('./models/airplane');
var FlighModel = require('./models/flight');
var ClientModel = require('./models/client');

var sequelize = new Sequelize('codementor', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}) ;

var Airplane = AirPlane(sequelize, Sequelize);
var Flight = FlighModel(sequelize, Sequelize);
var Client = ClientModel(sequelize, Sequelize);

//Flight.belongsToMany(Client, { through: FlightClient, unique: false });
//Client.belongsToMany(Flight, { through: FlightClient, unique: false });
//Flight.belongsTo(Airplane);

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  });

module.exports = {
  Airplane:any,
  Flight:any,
  Client:any
} ;