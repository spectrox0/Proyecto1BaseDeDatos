module.exports = function (sequelize, DataTypes) {

    return sequelize.define('avion', {

        C_boleto: {

            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        
        C_vuelo: {

            type: DataTypes.INTEGER,
        
        },
        C_asiento: {

            type: DataTypes.INTEGER,
            autoIncrement: true
        
        },
        C_pasajero: {

            type: DataTypes.INTEGER,
            autoIncrement: true
        
        },
        C_equipaje: {

            type: DataTypes.INTEGER,
            autoIncrement: true
        
        }



    })
}
