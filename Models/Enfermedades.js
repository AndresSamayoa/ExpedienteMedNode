const { DataTypes, Model } = require('sequelize')

module.exports = (db) => {
    class enfermedades extends Model {}
    enfermedades.init(
      {
        ENF_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        ENF_nombre: DataTypes.STRING,
        ENF_descripcion: DataTypes.STRING,
        ENF_tipo_enfermedad: DataTypes.STRING,
        ENF_fecha_eliminacion: DataTypes.DATE

    }, {
        timestamps: false,
        freezeTableName: true,
        sequelize: db,
        modelName: 'CLI_ENFERMEDADES',
        defaultScope: {
            where: {
                ENF_fecha_eliminacion: null
            }
        },
        omitNull: true
  });

  return enfermedades;
}