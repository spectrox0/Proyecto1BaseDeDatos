module.exports = function (sequelize, DataTypes) {

    return sequelize.define('avion', {

        C_avion: {

            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        C_modelo: {

            type: DataTypes.INTEGER,
            allowNull: false
        },
        C_estado: {
            C_modelo: {

                type: DataTypes.INTEGER,
                allowNull: false
            }
        }
    })


}