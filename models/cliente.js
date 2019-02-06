const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const md5 = require("md5");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/db");
const { SALT } = process.env;

const usuario = sequelize.define("cliente", {
  Nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Apellido: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  cedula: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  } ,

  C_cliente: {

    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
    
},

telefono: {
    type: Sequelize.STRING,
    allowNull: false
    
},


});

usuario.prototype.encrypt = function ({ password }) {
  const salt = bcrypt.genSaltSync(parseInt(SALT));
  return bcrypt.hashSync(password, salt);
};

usuario.prototype.compare = function(password) {
  const hash = this.password;
  return bcrypt.compareSync(password, hash);
};

module.exports = usuario;
