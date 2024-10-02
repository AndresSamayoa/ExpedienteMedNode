const { DataTypes, Model } = require('sequelize')

module.exports = (db) => {
    class medicamentos extends Model {}
    medicamentos.init(
      {
        med_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        med_nombre_medicamento: DataTypes.STRING,
        med_descripcion: DataTypes.STRING,
        med_precio: DataTypes.DECIMAL,
        med_fecha_eliminacion: DataTypes.DATE
    }, {
        timestamps: false,
        freezeTableName: true,
        sequelize: db,
        modelName: 'CLI_Medicamentos',
        defaultScope: {
            where: {
                med_fecha_eliminacion: null
            }
        },
        omitNull: true
  });

  return medicamentos;
}