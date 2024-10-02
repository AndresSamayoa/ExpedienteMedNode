const { DataTypes, Model } = require('sequelize')

module.exports = (db) => {
    class catalogoProcedimientosMedicos extends Model {}
    catalogoProcedimientosMedicos.init(
      {
        cpm_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        cpm_nombre: DataTypes.TEXT,
        cpm_precio: DataTypes.DECIMAL,
        cpm_local: DataTypes.TINYINT,
        cpm_examen: DataTypes.TINYINT,
        cpm_fecha_eliminacion: DataTypes.DATE
    }, {
        timestamps: false,
        freezeTableName: true,
        sequelize: db,
        modelName: 'CLI_CATALOGO_PROCEDIMIENTOS_MEDICOS',
        defaultScope: {
            where: {
                cpm_fecha_eliminacion: null
            }
        },
        omitNull: true
  });

  return catalogoProcedimientosMedicos;
}