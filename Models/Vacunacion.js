const { DataTypes, Model } = require('sequelize')

module.exports = (db) => {
    class vacunacion extends Model {}
    vacunacion.init(
      {
        VAC_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        pac_id: DataTypes.INTEGER,
        VAC_fecha_vacunacion: DataTypes.DATE,
        VAC_descripcion: DataTypes.INTEGER,
        VAC_fecha_eliminacion: DataTypes.DATE,

    }, {
        timestamps: false,
        freezeTableName: true,
        sequelize: db,
        modelName: 'CLI_VACUNACION',
        defaultScope: {
            where: {
                VAC_fecha_eliminacion: null
            }
        },
        omitNull: true
  });

  return vacunacion;
}