const Asiento = db.define('asiento', {
    C_asiento: {

        type: sequelize.STRING,
        primaryKey: true,

        allowNull: false
    },
    Nombre: {
        type: sequelize.STRING,
        allowNull: false

    } 
    ,
    Dist_pista: { 
        type: sequelize.STRING,
        allowNull:false 
    }
   }, {
    timestamps: false,
    freezeTableName: true
} );

module.exports = Aeropuerto;