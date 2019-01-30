module.exports = function (sequelize, DataTypes) {

    return sequelize.define('avion', {

    IATA: {

            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            allowNull: false
        },
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       Pais: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Ciudad: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
}