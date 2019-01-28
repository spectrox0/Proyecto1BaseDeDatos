module.exports = function (sequelize, DataTypes) {

    return sequelize.define('avion', {

        C_modelo: {

            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vel_max: {
            type: DataTypes.FLOAT
        },
        vel_crucero: {
            type: DataTypes.FLOAT
        },
        peso_vacio: {
            type: DataTypes.FLOAT
        },
        peso_max: {
            type: DataTypes.FLOAT
        },
        carga_max_equi: {
            type: DataTypes.FLOAT
        },
        combustible: {
            type: DataTypes.STRING
        },
        cant_banos: {
            type: DataTypes.INTEGER
        },
        cant_salida_emerg: {
            type: DataTypes.INTEGER
        },
        dist_despeje_carga_max: {
            type: DataTypes.FLOAT
        }
    })
}
